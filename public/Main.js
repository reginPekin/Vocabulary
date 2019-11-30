const { app, BrowserWindow } = require("electron");
const createWindow = () => {
  const win = new BrowserWindow({ width: 1000, height: 600 });
  win.loadURL("http://localhost:3000/");
};

app.on("ready", createWindow);
