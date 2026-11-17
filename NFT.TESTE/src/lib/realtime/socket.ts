import {io, type Socket} from 'socket.io-client';
import {queryClient} from '../query/client';

type Change={id:string;version:number};
let socket:Socket|undefined;
const versions=new Map<string,number>();
function onChange(kind:'nft'|'order',payload:Change){
  if(!payload||typeof payload.id!=='string'||!Number.isSafeInteger(payload.version))return;
  const key=`${kind}:${payload.id}`;
  if(payload.version<=(versions.get(key)??-1))return;
  versions.set(key,payload.version);
  if(kind==='nft'){
    void queryClient.invalidateQueries({queryKey:['nft',payload.id]});
    void queryClient.invalidateQueries({queryKey:['catalog']});
    void queryClient.invalidateQueries({queryKey:['quote']});
  }else{
    void queryClient.invalidateQueries({queryKey:['order',payload.id]});
    void queryClient.invalidateQueries({queryKey:['orders']});
  }
}
export function startRealtime(){
  if(socket||import.meta.env.VITE_ENABLE_MOCKS==='false')return;
  socket=io({path:'/__kurio/socket.io',transports:['websocket'],reconnection:true});
  socket.on('nft.updated',(event:Change)=>onChange('nft',event));
  socket.on('order.updated',(event:Change)=>onChange('order',event));
  socket.on('connect',()=>{
    // A fresh REST reconciliation is authoritative after reconnect.
    // Reset per-event version watermarks so a restarted server can use lower versions.
    versions.clear();
    // Reconcile after disconnect, including missed events.
    void queryClient.invalidateQueries({queryKey:['catalog']});
    void queryClient.invalidateQueries({queryKey:['orders']});
    void queryClient.invalidateQueries({queryKey:['nft']});
  });
}
export function stopRealtime(){socket?.disconnect();socket=undefined;versions.clear()}
