const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain, ipcRenderer } = electron;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  ipcMain.on("videoSubmitting", (event, path) => {
    ffmpeg.ffprobe(path, (error, metadata) => {
      console.log(metadata.format.duration);
    });
  });
});
