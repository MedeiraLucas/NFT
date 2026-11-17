import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import {api} from '../../lib/api/client';
import type {CartItem,CartResponse,CartQuote} from '../../contracts';
import {useSession} from '../auth/hooks';
import {getVisitorCart,saveVisitorCart} from '../../lib/session/visitorCart';
export {getVisitorCart,saveVisitorCart} from '../../lib/session/visitorCart';
export function useCart(){const session=useSession();const userId=session.data?.user?.id;return useQuery({queryKey:['cart',userId||'visitor'],enabled:!session.isPending,queryFn:async()=>userId?(await api.get<CartResponse>('/cart')).data:{items:getVisitorCart()},staleTime:0})}
export function useSaveCart(){const qc=useQueryClient();const session=useSession();const userId=session.data?.user?.id;return useMutation({mutationFn:async(items:CartItem[])=>{if(userId)return (await api.put<CartResponse>('/cart',{items})).data;saveVisitorCart(items);return {items}},onSuccess:()=>{qc.invalidateQueries({queryKey:['cart']});qc.invalidateQueries({queryKey:['quote']})}})}
export function useQuote(items:CartItem[],coupon:string){return useQuery({queryKey:['quote',items,coupon],enabled:items.length>0,queryFn:async()=> (await api.post<CartQuote>('/quote',{items,coupon})).data,retry:1})}
export function useAddToCart(){const cart=useCart();const save=useSaveCart();return {isPending:save.isPending,add:async(nftId:string,quantity=1)=>{const items=cart.data?.items||[];const old=items.find(i=>i.nftId===nftId);const next=old?items.map(i=>i.nftId===nftId?{...i,quantity:i.quantity+quantity}:i):[...items,{nftId,quantity}];return save.mutateAsync(next)}}}
