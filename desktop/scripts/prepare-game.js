// Copies the canonical game file into the desktop app as game/index.html.
const {fs,path,DESKTOP,GAME_SRC,gameVersion}=require('./common');

const dir=path.join(DESKTOP,'game');
fs.mkdirSync(dir,{recursive:true});
fs.copyFileSync(GAME_SRC,path.join(dir,'index.html'));
console.log(`Game v${gameVersion()} copied to desktop/game/index.html`);
