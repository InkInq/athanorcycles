// Shared paths + helpers for the release scripts.
const fs=require('fs');
const path=require('path');
const {execFileSync}=require('child_process');

const DESKTOP=path.resolve(__dirname,'..');
const REPO=path.resolve(DESKTOP,'..');
const GAME_SRC=path.join(REPO,'athanor_cycles_va1.html'); // the file you edit — single source of truth

// Version comes from the title-screen label (e.g. "Demo v0.1.b") so there is only one place to bump it.
function gameVersion(){
  const html=fs.readFileSync(GAME_SRC,'utf8');
  const m=html.match(/<div class="t-ver">Demo v([0-9]+\.[0-9]+\.[0-9a-z]+)<\/div>/);
  if(!m)throw new Error('Could not find the "Demo vX.Y.Z" label in athanor_cycles_va1.html');
  return m[1]; // e.g. "0.1.b"
}
// Windows file versions must be numeric: letter patches map a→1, b→2, … (0.1.b → 0.1.2)
function numericVersion(v){
  return v.split('.').map(p=>/^[a-z]$/.test(p)?String(p.charCodeAt(0)-96):p).join('.');
}
function releaseDir(v){
  const d=path.join(REPO,'release','v'+v);
  fs.mkdirSync(d,{recursive:true});
  return d;
}
// Zip a folder's CONTENTS (not the folder itself) with Windows' built-in PowerShell.
function zipFolderContents(folder,zipPath){
  if(fs.existsSync(zipPath))fs.rmSync(zipPath);
  execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',
    `Compress-Archive -Path '${path.join(folder,'*').replace(/'/g,"''")}' -DestinationPath '${zipPath.replace(/'/g,"''")}' -CompressionLevel Optimal`],
    {stdio:'inherit'});
}
module.exports={fs,path,DESKTOP,REPO,GAME_SRC,gameVersion,numericVersion,releaseDir,zipFolderContents};
