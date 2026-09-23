import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { validSnapshot, OWNER } from "../src/data/github-schema.mjs";
import { rankRepositories } from "./refresh-github.mjs";

const saved = JSON.parse(
  readFileSync(new URL("../src/data/github.json", import.meta.url), "utf8"),
);

test("a poisoned saved snapshot cannot introduce script URLs or links outside the owner's repository", () => {
  for (const url of [
    "javascript:alert(1)",
    "//evil.example/",
    "https://github.com.evil.example/repo",
    "https://github.com/attacker/repo",
    "https://github.com/crussella0129/../attacker",
    "data:text/html,<script>alert(1)</script>",
  ]) {
    const attack = structuredClone(saved);
    attack.repositories[0].url = url;
    assert.equal(validSnapshot(attack), false, url);
  }
});

test("hostile names, malformed objects, duplicate entries and invalid counts are rejected", () => {
  for (const name of [
    ".",
    "..",
    "../evil",
    "%2e%2e",
    'x" onmouseover="alert(1)',
    "x?redirect=evil",
    "x#fragment",
  ]) {
    const attack = structuredClone(saved);
    attack.repositories[0].name = name;
    attack.repositories[0].url = `https://github.com/${OWNER}/${name}`;
    assert.equal(validSnapshot(attack), false, name);
  }
  for (const value of [
    null,
    false,
    {},
    [],
    { ...saved, repositories: [null, null, null, null, null] },
  ])
    assert.equal(validSnapshot(value), false);
  const duplicate = structuredClone(saved);
  duplicate.repositories[1] = duplicate.repositories[0];
  assert.equal(validSnapshot(duplicate), false);
  for (const stars of [-1, Infinity, Number.MAX_SAFE_INTEGER + 1, "54"]) {
    const attack = structuredClone(saved);
    attack.repositories[0].stars = stars;
    assert.equal(validSnapshot(attack), false);
  }
});

test("an API-supplied destination is ignored; links are constructed from validated identity", () => {
  const [result] = rankRepositories([
    {
      name: "safe-repo",
      owner: { login: OWNER },
      stargazers_count: 1,
      html_url: "https://evil.example/",
      url: "javascript:alert(1)",
      description: "A public project",
    },
  ]);
  assert.equal(result.url, `https://github.com/${OWNER}/safe-repo`);
});
