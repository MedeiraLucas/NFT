import {test,expect,type Page} from '@playwright/test';

const account = () => ({name:'Colecionador E2E',email:`e2e-${crypto.randomUUID()}@kurio.test`,password:'Kurio@123456'});
async function register(page:Page){
 const user=account();
 await page.goto('/signup');
 await page.getByRole('textbox',{name:'Nome'}).fill(user.name);
 await page.getByRole('textbox',{name:'E-mail'}).fill(user.email);
 await page.locator('input[name="password"]').fill(user.password);
 await page.getByPlaceholder('Confirmar senha').fill(user.password);
 await page.getByRole('button',{name:'Criar conta',exact:true}).click();
 await expect(page).toHaveURL(/\/market/);
 return user;
}
async function addNft(page:Page){
 await page.goto('/nft/042');
 await page.getByRole('button',{name:'Adicionar ao carrinho'}).click();
 await expect(page.getByRole('status')).toContainText('adicionado');
}

test('cadastro, sessão e retorno após recarregar',async({page})=>{
 const user=await register(page);
 await page.reload();
 await page.goto('/profile');
 await expect(page.locator('body')).toContainText(user.name);
});

test('credenciais incorretas exibem erro sem autenticar',async({page})=>{
 await page.goto('/login');
 await page.locator('input[name="email"]').fill('inexistente@kurio.test');
 await page.locator('input[name="password"]').fill('SenhaErrada123');
 await page.getByRole('button',{name:'Entrar',exact:true}).click();
 await expect(page.getByRole('alert')).toBeVisible();
 await expect(page).toHaveURL(/\/login/);
});

test('carrinho de visitante persiste e é mesclado ao cadastro',async({page})=>{
 await addNft(page);
 await page.goto('/cart');
 await expect(page.locator('.cart-line')).toHaveCount(1);
 await page.reload();
 await expect(page.locator('.cart-line')).toHaveCount(1);
 await register(page);
 await page.goto('/cart');
 await expect(page.locator('.cart-line')).toHaveCount(1);
 await page.getByRole('button',{name:/Aumentar quantidade/}).click();
 await expect(page.locator('.cart-line output')).toHaveText('2');
 await page.getByRole('button',{name:/Remover /}).click();
 await expect(page.getByText('Seu carrinho está vazio.')).toBeVisible();
});

test('cupom inválido é rejeitado pela cotação',async({page})=>{
 await addNft(page);
 await page.goto('/cart');
 await page.getByLabel('Código promocional').fill('INVALIDO999');
 await page.getByRole('button',{name:'Aplicar'}).click();
 await expect(page.getByRole('alert')).toContainText('Cupom inválido');
});

test('checkout exige carteira e preserva carrinho em pagamento recusado',async({page})=>{
 await register(page);
 await addNft(page);
 await page.goto('/wallets');
 await page.locator('input[name="label"]').fill('Carteira E2E');
 await page.locator('input[name="address"]').fill('0x'+'a'.repeat(40));
 await page.getByRole('button',{name:'Salvar carteira'}).click();
 await expect(page.getByText('Carteira E2E',{exact:false}).first()).toBeVisible();
 await page.goto('/checkout');
 await page.getByRole('radio',{name:/Carteira E2E/}).check();
 await page.getByLabel('Cenário do pagamento').selectOption('declined');
 await page.getByRole('button',{name:'Revisar compra'}).click();
 await page.getByRole('button',{name:'Confirmar compra'}).click();
 await expect(page).toHaveURL(/\/orders\//);
 await page.goto('/cart');
 await expect(page.locator('.cart-line')).toHaveCount(1);
});
