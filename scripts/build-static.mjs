// Builds a plain-HTML copy of the site in /out for previewing with VS Code Live Server.
// The site needs no server (forms use mailto), so the result in /out can be uploaded to any web host.
// The project/article detail routes are set aside during the build only while there are no projects/articles yet.
import { renameSync, existsSync, rmSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const isEmpty = (file, name) => new RegExp(`export const ${name}[^=]*=\\s*\\[\\s*\\];`).test(readFileSync(file, "utf8"));

// Folders starting with _ are ignored by Next.js routing, so renaming hides them.
const moves = [];
if (isEmpty("src/content/projects.ts", "projects")) moves.push(["src/app/work/[slug]", "src/app/work/_slug_disabled"]);
if (isEmpty("src/content/posts.ts", "posts")) moves.push(["src/app/insights/[slug]", "src/app/insights/_slug_disabled"]);

for (const [from, to] of moves) if (existsSync(to)) renameSync(to, from); // recover from an interrupted run
rmSync("out", { recursive: true, force: true });
for (const [from, to] of moves) renameSync(from, to);

let status = 1;
try {
  const r = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  status = r.status ?? 1;
} finally {
  for (const [from, to] of moves) renameSync(to, from);
}
if (status === 0) spawnSync("node", ["scripts/relativize.mjs"], { stdio: "inherit" });
if (status === 0) console.log("\nDone. Open the 'out' folder in VS Code and use Live Server on index.html (or just double-click index.html).");
process.exit(status);
