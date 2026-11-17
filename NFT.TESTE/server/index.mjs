import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=resolve('dist');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{
 const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);
 if(url.pathname==='/healthz'){res.writeHead(200,{'Content-Type':'application/json'});res.end('{"status":"ok"}');return}
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return}
 let path;try{path=decodeURIComponent(url.pathname)}catch{res.writeHead(400);res.end();return}
 const candidate=resolve(root,'.'+path);
 if(candidate!==root&&!candidate.startsWith(root+sep)){res.writeHead(403);res.end();return}
 let file=candidate;
 try{if(!(await stat(file)).isFile())file=resolve(root,'index.html')}catch{file=resolve(root,'index.html')}
 if(file.endsWith('index.html')&&extname(path)&&path!=='/index.html'){res.writeHead(404);res.end();return}
 try{const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':file.endsWith('index.html')?'no-cache':'public,max-age=3600'});res.end(req.method==='HEAD'?undefined:data)}catch{res.writeHead(404);res.end()}
}).listen(port,'0.0.0.0',()=>console.log(`KURIO visual demo listening on ${port}`));
