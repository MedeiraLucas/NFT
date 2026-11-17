import {seedRealtimeDatabase} from './helpers';
import {test,expect} from '@playwright/test';

test('pedidos privados exigem autenticação',async({page})=>{
  await page.goto('/market');
  // Aguarda o Service Worker do MSW assumir o controle antes de chamar a API.
  await page.waitForFunction(() =>
    navigator.serviceWorker.controller?.scriptURL.includes('mockServiceWorker.js') === true
  );
  const response=await page.evaluate(async()=>{
    const r=await fetch('/api/orders');
    const contentType=r.headers.get('content-type')||'';
    if(!contentType.includes('application/json'))throw new Error(`Resposta inesperada da API: ${r.status} ${contentType}`);
    return {status:r.status,body:await r.json()};
  });
  expect(response.status).toBe(401);
  expect(response.body.code).toBe('UNAUTHORIZED');
});

test('eventos Socket.IO repetidos e antigos não substituem a versão mais recente',async({page,request})=>{
  await page.goto('/nft/042');
  await seedRealtimeDatabase(page);
  const label=page.getByText(/Versão do recurso:/);
  await expect(label).toBeVisible();
  const oldVersion=Number((await label.textContent())?.match(/\d+/)?.[0]);
  expect(Number.isInteger(oldVersion)).toBeTruthy();
  const updated=oldVersion+2;
  await page.evaluate(version=>{
    const key='kurio-mock-db-v2';
    const db=JSON.parse(localStorage.getItem(key)!);
    const nft=db.nfts.find((item:{id:string})=>item.id==='042');
    nft.version=version;
    localStorage.setItem(key,JSON.stringify(db));
  },updated);
  const send=(version:number)=>request.post('/__kurio/publish',{data:{type:'nft.updated',id:'042',version}});
  expect((await send(updated)).ok()).toBeTruthy();
  await expect(label).toHaveText(`Versão do recurso: ${updated}`);
  expect((await send(updated)).ok()).toBeTruthy();
  expect((await send(oldVersion+1)).ok()).toBeTruthy();
  await expect(label).toHaveText(`Versão do recurso: ${updated}`);
});

test('relay de demonstração rejeita eventos desconhecidos',async({request})=>{
  const result=await request.post('/__kurio/publish',{data:{type:'unknown',id:'042',version:1}});
  expect(result.status()).toBe(422);
});
