import {seedRealtimeDatabase} from './helpers';
import {test,expect} from '@playwright/test';

test('atualização de NFT via Socket.IO reconcilia detalhes com REST',async({page,request})=>{
  await page.goto('/nft/042');
  await seedRealtimeDatabase(page);
  await expect(page.getByText(/Versão do recurso:/)).toBeVisible();
  const before=await page.getByText(/Versão do recurso:/).textContent();
  const next=Number(before?.match(/\d+/)?.[0]||0)+1;
  await page.evaluate(version=>{
    const key='kurio-mock-db-v2';const db=JSON.parse(localStorage.getItem(key)!);
    const nft=db.nfts.find((n:{id:string})=>n.id==='042');nft.version=version;
    localStorage.setItem(key,JSON.stringify(db));
  },next);
  const result=await request.post('/__kurio/publish',{data:{type:'nft.updated',id:'042',version:next}});
  expect(result.ok()).toBeTruthy();
  await expect(page.getByText(`Versão do recurso: ${next}`)).toBeVisible({timeout:10000});
});
