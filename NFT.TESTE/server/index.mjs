/** Public demo server: SPA assets + Socket.IO mock-event relay. No real payments or blockchain. */
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {Server as SocketServer} from 'socket.io';
const root=resolve('dist');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);
  if(url.pathname==='/__kurio/publish'){
    if(req.method!=='POST'){res.writeHead(405);res.end();return}
    let body='';try{
      for await(const chunk of req){body+=chunk;if(body.length>8192)throw Error('Payload too large')}
      const event=JSON.parse(body);
      if(!['nft.updated','order.updated'].includes(event.type)||typeof event.id!=='string'||event.id.length>128||!Number.isSafeInteger(event.version)||event.version<0)throw Error('Invalid event');
      // Only resource IDs and versions are broadcast. All sensitive state comes from MSW REST.
      io.emit(event.type,{id:event.id,version:event.version});
      res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end('{"ok":true}');
    }catch{res.writeHead(422);res.end('{"error":"Invalid event"}')}
    return;
  }
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return}
  const requested=decodeURIComponent(url.pathname);
  const candidate=resolve(root,'.'+requested);
  if(candidate!==root&&!candidate.startsWith(root+sep)){res.writeHead(403);res.end();return}
  let file=candidate;
  try{if(!(await stat(file)).isFile())file=resolve(root,'index.html')}catch{file=resolve(root,'index.html')}
  // Missing static resources should return 404, not HTML.
  if(file.endsWith('index.html')&&extname(requested)&&requested!=='/index.html'){res.writeHead(404);res.end();return}
  try{const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':file.endsWith('index.html')?'no-cache':'public, max-age=3600'});if(req.method==='HEAD')res.end();else res.end(data)}catch{res.writeHead(404);res.end()}
});
const io=new SocketServer(server,{path:'/__kurio/socket.io',cors:{origin:false}});
server.listen(port,'0.0.0.0',()=>console.log(`KURIO demo listening on ${port}`));
