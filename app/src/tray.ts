import {
  Tray,
  Menu,
  BrowserWindow,
  app,
  nativeImage,
  Rectangle,
  screen,
} from "electron";
import { join } from "node:path";

export function createTray(win: BrowserWindow): Tray {
  const icon = nativeImage.createFromPath(join(__dirname, "../../logo.ico"));
  const tray = new Tray(icon);

  tray.setToolTip("Tasks");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Öffnen", click: () => win.show() },
      { label: "Verstecken", click: () => win.hide() },
      { type: "separator" },
      { label: "Beenden", click: () => app.quit() },
    ]),
  );

  const toggle = (bounds: Rectangle) => {
    if (win.isVisible()) {
      win.hide();
      return;
    }
    positionWindow(win, bounds);
    win.show();
    win.focus();
  };

  tray.on("click", (_e, bounds) => {
    toggle(bounds);
  });

  return tray;
}

function positionWindow(win: BrowserWindow, trayBounds: Rectangle) {
  const { width, height } = win.getBounds();
  const display = screen.getPrimaryDisplay();
  const workArea = display.workArea;

  let x = Math.round(trayBounds.x + trayBounds.width / 2 - width / 2);
  let y = Math.round(trayBounds.y + trayBounds.height - height);

  x = Math.min(x, workArea.x + workArea.width - width);
  x = Math.max(x, workArea.x);

  win.setBounds({ x, y, width, height });
}
