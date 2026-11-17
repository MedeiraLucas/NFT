import type {CartItem,PublicUser,Wallet,Order} from '../contracts';
import {nfts} from './fixtures';
export type RecordUser = PublicUser & {passwordHash:string; salt:string};
export type DB = {users:RecordUser[];sessions:Record<string,string>;cart:Record<string,CartItem[]>;nfts:typeof nfts;wallets:Record<string,Wallet[]>;orders:Order[];idempotency:Record<string,{fingerprint:string;orderId:string}>};
const KEY='kurio-mock-db-v2';
const fresh=():DB=>({users:[],sessions:{},cart:{},nfts:structuredClone(nfts),wallets:{},orders:[],idempotency:{}});
export function load():DB {try{const raw=localStorage.getItem(KEY);return raw?{...fresh(),...JSON.parse(raw)} as DB:fresh()}catch{return fresh()}}
export function save(db:DB){localStorage.setItem(KEY,JSON.stringify(db))}
export function reset(){localStorage.removeItem(KEY);sessionStorage.removeItem('kurio-token')}
