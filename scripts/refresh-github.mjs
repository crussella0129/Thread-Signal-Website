import { readFile, writeFile, rename } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import { OWNER, validName, validSnapshot } from "../src/data/github-schema.mjs";
export { OWNER, validSnapshot };
export const SNAPSHOT = new URL("../src/data/github.json", import.meta.url);

export function rankRepositories(repositories) {
  return repositories
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.private &&
        repo.owner?.login?.toLowerCase() === OWNER,
    )
    .map((repo) => {
      if (
        !validName(repo.name) ||
        !Number.isSafeInteger(repo.stargazers_count) ||
        repo.stargazers_count < 0
      ) {
        throw new Error("Invalid GitHub repository data");
      }
      return {
        name: repo.name,
        url: `https://github.com/${OWNER}/${repo.name}`,
        description:
          typeof repo.description === "string" ? repo.description : "",
        stars: repo.stargazers_count,
        archived: Boolean(repo.archived),
        language: repo.language || null,
      };
    })
    .sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name, "en"))
    .slice(0, 5);
}

export async function fetchRepositories(
  fetcher = fetch,
  token = process.env.GITHUB_TOKEN,
) {
  const repositories = [];
  for (let page = 1; page <= 100; page++) {
    const response = await fetcher(
      `https://api.github.com/users/${OWNER}/repos?type=owner&per_page=100&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "thread-and-signal-website",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal: AbortSignal.timeout(15000),
      },
    );
    if (!response.ok)
      throw new Error(`GitHub returned HTTP ${response.status}`);
    const batch = await response.json();
    if (!Array.isArray(batch))
      throw new Error("GitHub returned an unexpected response");
    repositories.push(...batch);
    if (batch.length < 100) return repositories;
  }
  throw new Error("GitHub pagination exceeded its safety limit");
}

export async function refreshSnapshot({
  fetcher = fetch,
  target = SNAPSHOT,
  token = process.env.GITHUB_TOKEN,
} = {}) {
  try {
    const repositories = rankRepositories(
      await fetchRepositories(fetcher, token),
    );
    const snapshot = {
      owner: OWNER,
      updatedAt: new Date().toISOString(),
      repositories,
    };
    if (!validSnapshot(snapshot)) throw new Error("Incomplete GitHub ranking");
    const temporary = new URL(`${target.href}.tmp`);
    await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`);
    await rename(temporary, target);
    return { snapshot, refreshed: true };
  } catch (error) {
    const saved = JSON.parse(
      await readFile(target, "utf8").catch(() => "null"),
    );
    if (!validSnapshot(saved))
      throw new Error(
        `GitHub refresh failed and no valid snapshot exists: ${error.message}`,
      );
    console.warn(
      `GitHub refresh unavailable; keeping snapshot from ${saved.updatedAt}. ${error.message}`,
    );
    return { snapshot: saved, refreshed: false };
  }
}

if (
  process.argv[1] &&
  pathToFileURL(process.argv[1]).href === import.meta.url
) {
  const result = await refreshSnapshot();
  console.log(
    `${result.refreshed ? "Refreshed" : "Retained"} ${result.snapshot.repositories.length} projects (${result.snapshot.updatedAt}).`,
  );
}
