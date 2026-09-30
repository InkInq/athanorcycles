// Builds the standalone Windows app (Electron) and zips it for itch.io.
const {fs,path,DESKTOP,gameVersion,numericVersion,releaseDir,zipFolderContents}=require('./common');

(async()=>{
  const {packager}=await import('@electron/packager'); // ES-module-only package
  require('./prepare-game');
  const icon=path.join(DESKTOP,'build','icon.ico');
  if(!fs.existsSync(icon))throw new Error('desktop/build/icon.ico missing — run `npm run icon` first');

  const v=gameVersion(),nv=numericVersion(v);
  const [appDir]=await packager({
    dir:DESKTOP,
    out:path.join(DESKTOP,'dist'),
    overwrite:true,
    platform:'win32',arch:'x64',
    name:'Athanor Cycles',
    executableName:'AthanorCycles',
    appVersion:nv,buildVersion:nv,
    icon,
    asar:true,
    appCopyright:'© InkInq',
    win32metadata:{CompanyName:'InkInq',FileDescription:'Athanor Cycles',ProductName:'Athanor Cycles',InternalName:'AthanorCycles',OriginalFilename:'AthanorCycles.exe'},
    // Ship only what the app needs at runtime
    ignore:[/^\/dist($|\/)/,/^\/scripts($|\/)/,/^\/README\.md$/,/^\/\.gitignore$/,/^\/build\/(?!icon\.png$)/],
  });
  // The game is English-only with no native menus: keep only Chromium's en-US language pack (~48 MB saved)
  const loc=path.join(appDir,'locales');
  for(const f of fs.readdirSync(loc))if(f!=='en-US.pak')fs.rmSync(path.join(loc,f));
  const zip=path.join(releaseDir(v),`athanor-cycles-v${v}-windows.zip`);
  zipFolderContents(appDir,zip);
  console.log(`Windows build: ${path.relative(process.cwd(),zip)} (${(fs.statSync(zip).size/1048576).toFixed(1)} MB)`);
  console.log(`Test it by running: ${path.join(appDir,'AthanorCycles.exe')}`);
})().catch(e=>{console.error(e);process.exit(1);});
