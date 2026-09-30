// `npm run icon` — renders the title-screen athanor logo into the app icon (build/icon.png + build/icon.ico).
// Runs inside Electron (an offscreen window rasterizes the SVG at each size). Replace build/icon.* with
// hand-made art any time; the build only needs build/icon.ico (and icon.png for the window icon).
const {app,BrowserWindow}=require('electron');
const fs=require('fs');
const path=require('path');

const OUT=path.join(__dirname,'..','build');
const SIZES=[16,24,32,48,64,128,256];

// Same geometry as the title logo, on a dark rounded tile; lines get relatively thicker at small sizes
function svg(size){
  const stroke=Math.min(16,Math.max(5.5,260/size*1.1));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}">
    <defs><radialGradient id="g" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#2a1c08"/><stop offset="1" stop-color="#07070f"/></radialGradient></defs>
    <rect x="0" y="0" width="200" height="200" rx="${size<=32?28:40}" fill="url(#g)"/>
    <g fill="none" stroke="#e0bc5a" stroke-width="${stroke}" stroke-linejoin="round" transform="translate(100 100) scale(0.86) translate(-100 -100)">
      <circle cx="100" cy="100" r="94"/>
      <polygon points="100,10 178,155 22,155"/>
      ${size>=24?'<rect x="55" y="88" width="90" height="67"/>':''}
      <circle cx="100" cy="121" r="33"/>
    </g></svg>`;
}

// One offscreen canvas page reused for every size: draw the SVG into a <canvas>, read back PNG bytes
let page=null;
async function render(size){
  if(!page){
    page=new BrowserWindow({width:300,height:300,show:false,webPreferences:{offscreen:true}});
    await page.loadURL('data:text/html;charset=utf-8,'+encodeURIComponent('<html><body></body></html>'));
  }
  const dataUrl=await page.webContents.executeJavaScript(`new Promise((ok,fail)=>{
    const img=new Image();
    img.onload=()=>{const c=document.createElement('canvas');c.width=c.height=${size};
      const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(img,0,0,${size},${size});ok(c.toDataURL('image/png'));};
    img.onerror=()=>fail('svg load failed');
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(${JSON.stringify(svg(size))});
  })`);
  return Buffer.from(dataUrl.split(',')[1],'base64');
}

// ICO container holding PNG images (supported by Windows Vista and later)
function ico(pngs){
  const head=Buffer.alloc(6+16*pngs.length);
  head.writeUInt16LE(0,0);head.writeUInt16LE(1,2);head.writeUInt16LE(pngs.length,4);
  let offset=head.length;
  pngs.forEach(({size,png},i)=>{
    const e=6+16*i;
    head.writeUInt8(size>=256?0:size,e);head.writeUInt8(size>=256?0:size,e+1);
    head.writeUInt8(0,e+2);head.writeUInt8(0,e+3);
    head.writeUInt16LE(1,e+4);head.writeUInt16LE(32,e+6);
    head.writeUInt32LE(png.length,e+8);head.writeUInt32LE(offset,e+12);
    offset+=png.length;
  });
  return Buffer.concat([head,...pngs.map(p=>p.png)]);
}

app.disableHardwareAcceleration();
app.whenReady().then(async()=>{
  fs.mkdirSync(OUT,{recursive:true});
  const pngs=[];
  for(const size of SIZES)pngs.push({size,png:await render(size)});
  fs.writeFileSync(path.join(OUT,'icon.png'),pngs.find(p=>p.size===256).png);
  fs.writeFileSync(path.join(OUT,'icon.ico'),ico(pngs));
  console.log('Wrote build/icon.png and build/icon.ico ('+SIZES.join(', ')+' px)');
  app.quit();
}).catch(e=>{console.error(e);app.exit(1);});
