import {useQuery} from '@tanstack/react-query';
import {api} from '../../lib/api/client';
import type {CatalogParams,CatalogResponse,NFT} from '../../contracts';
export function useCatalog(params:CatalogParams){return useQuery({queryKey:['catalog',params],queryFn:async({signal})=>(await api.get<CatalogResponse>('/nfts',{params,signal})).data})}
export function useNft(id:string){return useQuery({queryKey:['nft',id],queryFn:async({signal})=>(await api.get<NFT>(`/nfts/${id}`,{signal})).data,retry:false})}
