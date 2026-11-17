import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {Server as SocketServer} from 'socket.io';

// Transport used only by the local MSW demo. Never expose this relay in production.
function demoRealtime():Plugin {
  return {name:'kurio-demo-socket-relay',configureServer(server){
    const httpServer=server.httpServer;
    if(!httpServer)return;
    const io=new SocketServer(httpServer,{path:'/__kurio/socket.io',cors:{origin:true}});
    server.middlewares.use('/__kurio/publish',(req,res)=>{
      if(req.method!=='POST'){res.statusCode=405;res.end();return}
      let body='';req.on('data',part=>{body+=part;if(body.length>8192)req.destroy()});
      req.on('end',()=>{try{
        const event=JSON.parse(body) as {type:string;id:string;version:number};
        if(!['nft.updated','order.updated'].includes(event.type)||typeof event.id!=='string'||!Number.isSafeInteger(event.version))throw Error('Invalid event');
        // No order payload or user data is broadcast; clients refetch via authenticated REST.
        io.emit(event.type,{id:event.id,version:event.version});
        res.setHeader('Content-Type','application/json');res.end('{"ok":true}');
      }catch{res.statusCode=422;res.end('{"error":"Invalid event"}')}});
    });
    httpServer.on('close',()=>io.close());
  }};
}
export default defineConfig({plugins:[react(),tailwindcss(),demoRealtime()]});
