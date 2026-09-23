export const OWNER = "crussella0129";
const validName = (name) =>
  typeof name === "string" &&
  /^[\w.-]{1,100}$/.test(name) &&
  name !== "." &&
  name !== "..";

export function validSnapshot(snapshot) {
  return (
    snapshot?.owner === OWNER &&
    typeof snapshot.updatedAt === "string" &&
    Number.isFinite(Date.parse(snapshot.updatedAt)) &&
    Array.isArray(snapshot.repositories) &&
    snapshot.repositories.length === 5 &&
    new Set(snapshot.repositories.map((repo) => repo?.name)).size === 5 &&
    snapshot.repositories.every(
      (repo) =>
        repo &&
        validName(repo.name) &&
        repo.url === `https://github.com/${OWNER}/${repo.name}` &&
        typeof repo.description === "string" &&
        repo.description.length <= 2000 &&
        typeof repo.archived === "boolean" &&
        Number.isSafeInteger(repo.stars) &&
        repo.stars >= 0,
    )
  );
}

export { validName };
