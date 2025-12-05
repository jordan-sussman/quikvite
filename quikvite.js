#!/usr/bin/env node
/**
 * QuikVite CLI: Quickly create a Vite React+TypeScript project, auto-install, and start dev server.
 */

import { execSync } from "child_process";

const createTasks = (projectName) => [
  {
    description: `Creating project "${projectName}"...`,
    command: `npm create vite@latest ${projectName} -- --template react-ts`,
  },
  {
    description: `Installing dependencies...`,
    command: `cd ${projectName} && npm install`,
  },
];

const runTask = (task) => {
  console.log(task.description);
  execSync(task.command, { stdio: "pipe" });
};

const projectName = process.argv[2];

if (!projectName) {
  console.error("Error: Project name required");
  process.exit(1);
}

try {
  createTasks(projectName).forEach(runTask);
  console.log(`\n${projectName} is ready! Starting dev server...`);
  execSync(`cd ${projectName} && npm run dev`, { stdio: "inherit" });
} catch (err) {
  console.error("Error:", err);
  process.exit(1);
}
