# KURIO — NFT Marketplace | Jungle Gaming

Demonstração React + TypeScript, com API simulada via MSW e Socket.IO para notificações. Não utiliza blockchain, dinheiro ou carteiras reais.

## Pré-requisitos
Node.js 22 (ou >=20.19), npm e Chromium do Playwright para os testes. No PowerShell do Windows, substitua `npm` por `npm.cmd` e `npx` por `npx.cmd`.

## Instalação local
```bash
npm ci
npm run dev
```
O service worker MSW está versionado em `public/mockServiceWorker.js`. Se for necessário regenerá-lo: `npx msw init public/ --save`.

## Simular a versão publicada localmente
```bash
npm run build
npm start
```
Abra `http://localhost:4173`. Diferentemente de `vite preview`, `npm start` executa o servidor Socket.IO usado no deploy. Acesso direto a `/nft/:id`, `/cart`, `/checkout` etc. usa fallback SPA.

## Deploy público — Render
1. Publique **este código** em um repositório GitHub.
2. No Render, selecione **New > Blueprint** e o repositório que contém `render.yaml`.
3. Confirme `npm ci && npm run build` e `npm start`; aguarde o serviço ficar disponível.
4. Teste acesso direto e refresh de rotas, login, checkout e WebSocket na URL pública.

O plano gratuito pode suspender a instância quando inativa. Mocks e sessões são armazenados no navegador; não compartilham um banco de dados global. O endpoint de publicação de eventos não tem autenticação e é apenas para a demonstração.

## Mocks e cenários
`VITE_ENABLE_MOCKS=true` é o padrão; `false` exige API externa não incluída. Para restaurar os dados locais, limpe a chave `kurio-mock-db-v2` no Local Storage e recarregue. Crie uma conta fictícia pelo cadastro; não há credenciais fixas exigidas. Cupons demonstrativos: `WELCOME10` e `ETHERS5`. Estados de pagamento simulados e fixtures ficam em `src/mocks/`.

## Comandos
```bash
npm run dev
npm run build
npm run typecheck
npm run lint
npm run test:e2e
npm run test:e2e:report
npm run audit:lighthouse
```
`npm run audit:lighthouse` usa `vite preview` para medir páginas estáticas; para testar o Socket.IO na versão de produção use `npm start`. Consulte `ARCHITECTURE.md` para limitações, sessão, cache, REST e eventos.

## Estado da entrega
O código contém os fluxos e testes acumulados nos marcos anteriores. **Não foi feita uma nova execução de testes ou auditoria para este pacote**, a pedido do usuário; a validação final deve ocorrer antes da submissão. É necessário informar a URL real do deploy e do repositório depois de publicá-los.
