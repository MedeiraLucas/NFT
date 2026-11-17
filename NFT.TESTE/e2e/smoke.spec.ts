import {test,expect} from '@playwright/test';

test('catálogo e navegação inicial',async({page})=>{
 await page.goto('/');
 await expect(page.locator('body')).toContainText('KURIO');
 await expect(page.locator('body')).not.toContainText('Falha ao iniciar o ambiente de demonstração');
});

test('página de login e cadastro acessíveis',async({page})=>{
 await page.goto('/login');
 await expect(page.locator('input[type="email"]')).toBeVisible();
 await page.goto('/signup');
 await expect(page.locator('input[name="password"]')).toBeVisible();
});

test('sem rolagem horizontal em mobile',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const path of ['/','/market','/login','/cart']){
  await page.goto(path);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(overflow,`overflow horizontal em ${path}`).toBe(false);
 }
});
