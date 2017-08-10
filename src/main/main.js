import { app, BrowserWindow, ipcMain } from 'electron';

let mainWin;
const winURL = 'http://localhost:4040'
function createWindow() {
  mainWin = new BrowserWindow({
    height: 500,
    width: 1000,
    userContentSize: true
  });
  mainWin.loadURL(winURL);
  mainWin.show();
  mainWin.webContents.openDevTools();
  console.log(111);
  mainWin.on('close', () => {
    mainWin = null;
  })
}
console.log(111);
app.on('ready', () => {
  createWindow();
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
