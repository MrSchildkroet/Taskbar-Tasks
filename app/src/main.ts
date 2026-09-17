import { app, BrowserWindow } from "electron";
import { join } from "node:path";
import { createTray } from "./tray";
import { initDb } from "./db/db.client";
import { registerIpcHandlers } from "./ipc/handler";

let win: BrowserWindow | null = null;
let tray: ReturnType<typeof createTray> | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.on("blur", () => {
    if (!win?.isVisible()) win?.hide();
  });

  if (!app.isPackaged) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(join(__dirname, "../../renderer/dist/index.html"));
  }
}

app.whenReady().then(() => {
  initDb();
  registerIpcHandlers();
  createWindow();
  tray = createTray(win!);
});

app.on("window-all-closed", () => {});

app.on("browser-window-blur", () => {
  if (!app.isPackaged) return;
  win?.hide();
});
