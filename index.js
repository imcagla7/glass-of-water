try {
  require("electron-reloader")(module);
} catch (_) {}

const { app, BrowserWindow } = require("electron/main");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 350,
    height: 400,
    titleBarStyle: "hidden",
    frame: false,
    resizable: false,
    icon: path.join(__dirname, "assets", "appIcon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // ✅ Preload dosyasını ekle
      contextIsolation: true, // Güvenlik için önerilir
      enableRemoteModule: false,
      nodeIntegration: false, // Preload kullanıyorsan "false" olmalı
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
