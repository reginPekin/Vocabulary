const { app, BrowserWindow } = require("electron");
const createWindow = () => {
  const win = new BrowserWindow({ width: 900, height: 700 });
  win.loadURL("http://localhost:3000/");
};

app.on("ready", createWindow);
