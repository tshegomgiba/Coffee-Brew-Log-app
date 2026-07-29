import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistIndexPath = path.join(__dirname, "frontend", "dist", "index.html");

if (!fs.existsSync(frontendDistIndexPath)) {
  console.log("Frontend build not found. Building it now...");

  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const buildResult = spawnSync(npmCommand, ["run", "build"], {
    cwd: __dirname,
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "development",
      npm_config_production: "false",
    },
  });

  if (buildResult.status !== 0) {
    console.error("Frontend build failed.");
    process.exit(buildResult.status ?? 1);
  }
}

await import("./backend/server.js");
