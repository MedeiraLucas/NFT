import {useMutation,useQuery} from '@tanstack/react-query';
import {api} from '../../lib/api/client';
import {queryClient} from '../../lib/query/client';
import type {PublicUser,SessionResponse,CartItem,CartResponse} from '../../contracts';
import {getVisitorCart,saveVisitorCart} from '../../lib/session/visitorCart';
type Credentials={email:string;password:string};
export function useSession(){return useQuery({queryKey:['session',sessionStorage.getItem('kurio-token')],queryFn:async()=> (await api.get<SessionResponse>('/session')).data})}
async function acceptSession(token:string){sessionStorage.setItem('kurio-token',token);queryClient.clear();const visitor=getVisitorCart();if(visitor.length){try{const existing=(await api.get<CartResponse>('/cart')).data.items;const merged=[...existing];for(const item of visitor){const found=merged.find(i=>i.nftId===item.nftId);if(found)found.quantity=Math.min(10,found.quantity+item.quantity);else merged.push({...item});}await api.put('/cart',{items:merged});saveVisitorCart([])}catch(e){console.warn('Carrinho visitante preservado para nova tentativa',e)}}await queryClient.invalidateQueries()}
export function useLogin(){return useMutation({mutationFn:async(data:Credentials)=>(await api.post<{token:string;user:PublicUser}>('/auth/login',data)).data,onSuccess:async ({token})=>acceptSession(token)})}
export function useSignup(){return useMutation({mutationFn:async(data:Credentials&{name:string})=>(await api.post<{token:string;user:PublicUser}>('/auth/signup',data)).data,onSuccess:async ({token})=>acceptSession(token)})}
export function useLogout(){return useMutation({mutationFn:async()=>{await api.post('/auth/logout')},onSettled:()=>{sessionStorage.removeItem('kurio-token');queryClient.clear()}})}
