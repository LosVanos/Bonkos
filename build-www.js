// Gera a pasta www/ a partir de src/game.html (o mesmo ficheiro do jogo publicado no Claude)
const fs=require('fs'),path=require('path');
const R=p=>path.join(__dirname,p);
fs.rmSync(R('www'),{recursive:true,force:true});fs.mkdirSync(R('www/fonts'),{recursive:true});fs.mkdirSync(R('www/vendor/firebase'),{recursive:true});
// tipos de letra locais (funcionam sem internet)
const fonts=[['fredoka',[500,600,700]],['nunito',[600,700,800,900]]];let css='';
for(const[f,ws]of fonts)for(const w of ws)for(const sub of['latin','latin-ext']){const fn=`${f}-${sub}-${w}-normal.woff2`;
  fs.copyFileSync(R(`node_modules/@fontsource/${f}/files/${fn}`),R('www/fonts/'+fn));
  css+=`@font-face{font-family:'${f[0].toUpperCase()+f.slice(1)}';font-style:normal;font-display:swap;font-weight:${w};src:url(fonts/${fn}) format('woff2');${sub==='latin'?'unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;':''}}\n`;}
fs.writeFileSync(R('www/fonts.css'),css);
for(const f of['firebase-app-compat.js','firebase-auth-compat.js','firebase-firestore-compat.js','firebase-analytics-compat.js'])fs.copyFileSync(R('node_modules/firebase/'+f),R('www/vendor/firebase/'+f));
if(!fs.existsSync(R('www-config.js')))fs.copyFileSync(R('www-config.example.js'),R('www-config.js'));
fs.copyFileSync(R('www-config.js'),R('www/config.js'));
let g=fs.readFileSync(R('src/game.html'),'utf8');
g=g.replace(/<link rel="preconnect"[^>]*>\s*/g,'').replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/,'<link rel="stylesheet" href="fonts.css">');
const head=`<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"><meta name="theme-color" content="#1b2a78"><style>html,body{margin:0;height:100%;background:#1a3796;overscroll-behavior:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none}[hidden]{display:none!important}</style><script src="config.js"></script></head><body>`;
fs.writeFileSync(R('www/index.html'),head+g+'</body></html>');
console.log('www pronto:',(fs.statSync(R('www/index.html')).size/1024).toFixed(0)+' KB');
