export type NFT = {id:string; name:string; priceEth:string; image:string; category:string; network:string; stock:number; version:number};
export type CatalogParams = {q?:string;category?:string;network?:string;sort?:'recent'|'price-asc'|'price-desc';page?:number};
export type CatalogResponse = {items:NFT[];page:number;total:number;pages:number};
export type PublicUser = {id:string;name:string;email:string};
export type SessionResponse = {user:PublicUser|null};
export type CartItem = {nftId:string;quantity:number};
export type CartResponse = {items:CartItem[]};
export type ApiError = {code:string;message:string};

export type QuoteLine={nftId:string;name:string;image:string;quantity:number;unitPriceEth:string;totalEth:string;available:number};
export type CartQuote={items:QuoteLine[];subtotalEth:string;discountEth:string;networkFeeEth:string;totalEth:string;coupon:string|null;revision:string};

export type Wallet={id:string;label:string;address:string;network:'Ethereum'|'Polygon'|'Arbitrum';primary:boolean};
export type Order={id:string;userId:string;status:'pending'|'confirmed'|'declined';items:QuoteLine[];subtotalEth:string;discountEth:string;networkFeeEth:string;totalEth:string;coupon:string|null;revision:string;transactionRef:string;createdAt:string};
