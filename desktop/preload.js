// Exposes the tiny desktop-only API the game checks for (window.athanorDesktop).
// Nothing else from Electron/Node is reachable from the game page.
const {contextBridge,ipcRenderer}=require('electron');

contextBridge.exposeInMainWorld('athanorDesktop',{
  quit:()=>ipcRenderer.send('athanor:quit'),
  platform:process.platform,
});
