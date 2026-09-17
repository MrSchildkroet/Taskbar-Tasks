import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const tasksRootPath = join(homedir(), "Documents", "Tasks");

export const PATHS = {
  tasksRootPath,
  metaPath: join(tasksRootPath, ".meta"),
  dbPath: join(tasksRootPath, ".meta", "app.db"),
} as const;

const DIRS = {
  tasksRootPath,
  metaPath: PATHS.metaPath,
} as const;

const FILES = {
  dbPath: PATHS.dbPath,
} as const;

export function ensurePaths(): void {
  for (const dir of Object.values(DIRS)) {
    mkdirSync(dir, { recursive: true });
  }
}
