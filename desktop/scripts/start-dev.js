// `npm start`: run the desktop app straight from source, with DevTools available (Ctrl+Shift+I).
const {spawn}=require('child_process');
const electron=require('electron'); // resolves to the Electron executable path
const {DESKTOP}=require('./common');

spawn(electron,['.'],{cwd:DESKTOP,stdio:'inherit',env:{...process.env,ATHANOR_DEV:'1'}})
  .on('exit',code=>process.exit(code||0));
