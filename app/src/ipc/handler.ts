import { ipcMain } from "electron";
import { createProject, getProjects } from "../core/project";

export function registerProjectHandlers() {
  ipcMain.handle("project:create", (event, name: string, color: string) => {
    return createProject(name, color);
  });

  ipcMain.handle("projects:get", (event) => {
    return getProjects();
  });
}
