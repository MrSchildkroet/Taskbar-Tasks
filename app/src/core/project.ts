import fs from "node:fs";
import { PATHS } from "../paths";
import path from "node:path";
import { buildFrontmatter } from "./utils";

export function createProject(name: string, color: string) {
  const project = fs.writeFileSync(
    path.join(PATHS.tasksRootPath, `${name}.project.md`),
    buildFrontmatter(name, color),
    "utf-8",
  );

  return project;
}

export function getProjects(): string[] {
  return fs.readdirSync(PATHS.tasksRootPath).filter((f) => f.endsWith(".md"));
}
