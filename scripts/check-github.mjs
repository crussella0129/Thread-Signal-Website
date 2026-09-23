import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  OWNER,
  rankRepositories,
  fetchRepositories,
  refreshSnapshot,
} from "./refresh-github.mjs";

const repo = (name, stars, extra = {}) => ({
  name,
  stargazers_count: stars,
  owner: { login: OWNER },
  description: name,
  ...extra,
});
const response = (data) => ({ ok: true, json: async () => data });
const source = [
  repo("Z", 2),
  repo("B", 9),
  repo("A", 9),
  repo("C", 7),
  repo("D", 4),
  repo("E", 3),
];

test("ranks original public repositories, excludes forks, and resolves ties consistently", () => {
  const ranked = rankRepositories([
    ...source,
    repo("fork", 900, { fork: true }),
    repo("private", 800, { private: true }),
    repo("other-owner", 700, { owner: { login: "someone-else" } }),
  ]);
  assert.deepEqual(
    ranked.map((r) => r.name),
    ["A", "B", "C", "D", "E"],
  );
  assert.ok(
    ranked.every((r) => r.url === `https://github.com/${OWNER}/${r.name}`),
  );
});

test("paginates the full account before ranking; later pages can contain the winner", async () => {
  const urls = [];
  const all = await fetchRepositories(async (url) => {
    urls.push(url);
    return response(
      urls.length === 1
        ? Array.from({ length: 100 }, (_, i) => repo(`repo-${i}`, 0))
        : [repo("winner", 100)],
    );
  }, "");
  assert.equal(all.length, 101);
  assert.ok(urls[1].endsWith("page=2"));
  assert.equal(rankRepositories(all)[0].name, "winner");
});

test("refresh is atomic and a rate limit or incomplete page keeps the previous snapshot and date", async (t) => {
  const folder = await mkdtemp(join(tmpdir(), "thread-signal-github-"));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const target = pathToFileURL(join(folder, "snapshot.json"));
  const saved = {
    owner: OWNER,
    updatedAt: "2026-09-01T00:00:00.000Z",
    repositories: rankRepositories(source),
  };
  await writeFile(target, JSON.stringify(saved));
  for (const fetcher of [
    async () => ({ ok: false, status: 429 }),
    async () => response([]),
    async () => response({ message: "Bad response" }),
    async () => {
      throw new Error("Offline");
    },
  ]) {
    const result = await refreshSnapshot({ target, fetcher, token: "" });
    assert.equal(result.refreshed, false);
    assert.deepEqual(JSON.parse(await readFile(target, "utf8")), saved);
  }
  const result = await refreshSnapshot({
    target,
    fetcher: async () => response(source),
    token: "",
  });
  assert.equal(result.refreshed, true);
  assert.deepEqual(JSON.parse(await readFile(target, "utf8")), result.snapshot);
  assert.notEqual(result.snapshot.updatedAt, saved.updatedAt);
});

test("a broken refresh fails the build when there is no usable saved copy", async (t) => {
  const folder = await mkdtemp(join(tmpdir(), "thread-signal-empty-"));
  t.after(() => rm(folder, { recursive: true, force: true }));
  await assert.rejects(
    refreshSnapshot({
      target: pathToFileURL(join(folder, "missing.json")),
      fetcher: async () => ({ ok: false, status: 500 }),
      token: "",
    }),
    /no valid snapshot/,
  );
});
