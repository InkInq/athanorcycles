// Athanor Cycles — standalone desktop wrapper (Electron main process).
// The game itself is the unmodified single-file HTML build, copied to game/index.html by the build scripts.
const {app,BrowserWindow,Menu,ipcMain,shell}=require('electron');
const path=require('path');

app.setName('Athanor Cycles'); // saves (localStorage) live in %APPDATA%\Athanor Cycles

// One running copy only — two windows would share (and overwrite) the same save slots
if(!app.requestSingleInstanceLock()){app.quit();}

let win=null;
const DEV=process.env.ATHANOR_DEV==='1'; // `npm start` sets this: keeps DevTools available

function createWindow(){
  win=new BrowserWindow({
    width:1280,height:800,minWidth:960,minHeight:600,
    title:'Athanor Cycles',
    backgroundColor:'#07070f',
    icon:path.join(__dirname,'build','icon.png'),
    autoHideMenuBar:true,
    show:false,
    webPreferences:{
      preload:path.join(__dirname,'preload.js'),
      contextIsolation:true,nodeIntegration:false,sandbox:true,
      spellcheck:false,devTools:DEV,
    },
  });
  if(!DEV)Menu.setApplicationMenu(null);
  win.once('ready-to-show',()=>win.show());
  win.loadFile(path.join(__dirname,'game','index.html'));

  // The game is fully offline: never navigate the window away; open any web link in the user's browser
  win.webContents.setWindowOpenHandler(({url})=>{if(/^https?:\/\//.test(url))shell.openExternal(url);return{action:'deny'};});
  win.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('file:')){e.preventDefault();if(/^https?:\/\//.test(url))shell.openExternal(url);}});

  // F11 toggles fullscreen (the in-game Settings toggle also works)
  win.webContents.on('before-input-event',(e,input)=>{
    if(input.type==='keyDown'&&input.key==='F11'){win.setFullScreen(!win.isFullScreen());e.preventDefault();}
  });
  win.on('closed',()=>{win=null;});
}

// "Quit Game" button on the title screen (see quitGame() in the game)
ipcMain.on('athanor:quit',()=>app.quit());

app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.focus();}});
app.whenReady().then(createWindow);
app.on('window-all-closed',()=>app.quit());
