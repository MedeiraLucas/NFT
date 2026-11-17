import type {NFT} from '../contracts';
export const nfts:NFT[] = [
['042','Emerald Ape','1.19','emerald.webp','Arte digital','Ethereum',397],
['009','Sage Nomad','1.69','nomad.webp','Fotografia','Polygon',230],
['552','Neon Vessel','1.99','baron.webp','Música','Arbitrum',84],
['118','Cosmic Bloom','1.29','nomad-2.webp','Arte 3D','Ethereum',21],
['314','Violet Nomad','1.39','nomad-3.webp','Colecionáveis','Polygon',50],
['088','Ivory Baron','1.79','baron-2.webp','Arte digital','Ethereum',38],
['207','Golden Beat','0.99','golden.webp','Música','Arbitrum',98],
['871','Golden Frequency','0.59','golden-2.webp','Generativa','Polygon',105],
['160','Golden Signal','0.39','golden-3.webp','Jogos','Ethereum',71],
['645','Onyx Frequency','0.23','golden.webp','Utilidade','Arbitrum',120],
['096','Copper Bloom','2.22','nomad.webp','Arte 3D','Polygon',33],
['892','Velvet Baron','1.09','baron-3.webp','Colecionáveis','Ethereum',55]
].map(([id,name,priceEth,image,category,network,stock])=>({id:String(id),name:String(name),priceEth:String(priceEth),image:String(image),category:String(category),network:String(network),stock:Number(stock),version:1}));
