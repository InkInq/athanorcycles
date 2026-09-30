// Builds the itch.io browser (HTML5) upload: a zip whose root holds index.html.
const os=require('os');
const {fs,path,GAME_SRC,gameVersion,releaseDir,zipFolderContents}=require('./common');

const v=gameVersion();
const stage=fs.mkdtempSync(path.join(os.tmpdir(),'athanor-html5-'));
fs.copyFileSync(GAME_SRC,path.join(stage,'index.html'));
const zip=path.join(releaseDir(v),`athanor-cycles-v${v}-html5.zip`);
zipFolderContents(stage,zip);
fs.rmSync(stage,{recursive:true,force:true});
console.log(`HTML5 build: ${path.relative(process.cwd(),zip)} (${(fs.statSync(zip).size/1024).toFixed(0)} KB)`);
