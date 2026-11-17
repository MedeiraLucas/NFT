import type {CartItem} from '../../contracts';
const KEY='kurio-visitor-cart-v1';
export function getVisitorCart():CartItem[]{try{return JSON.parse(localStorage.getItem(KEY)||'[]') as CartItem[]}catch{return []}}
export function saveVisitorCart(items:CartItem[]){localStorage.setItem(KEY,JSON.stringify(items));window.dispatchEvent(new Event('kurio-visitor-cart'))}
