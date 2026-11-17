# Marco 8 — Auditoria de qualidade e preparação para deploy

Este pacote preserva o código de interface e os testes E2E do Marco 7 corrigido. Não altera componentes, estilos ou fluxos funcionais.

## Auditoria automatizada Lighthouse

Requisitos: Node.js >= 20.19, Chromium instalado pelo Playwright e `public/mockServiceWorker.js` gerado.

No Windows/PowerShell:

```powershell
npm.cmd install
npx.cmd msw init public/ --save
npx.cmd playwright install chromium
npm.cmd run build
npm.cmd run test:e2e
npm.cmd run audit:lighthouse
```

O comando `audit:lighthouse` inicia automaticamente o `vite preview` na porta 4173, avalia `/` e `/market` em mobile e desktop, e grava arquivos HTML/JSON em `reports/lighthouse/`. As metas são: Performance >= 90, Accessibility >= 95, Best Practices >= 95 e SEO >= 90. Se uma meta não for atingida, o comando retorna código 1 e mantém os relatórios para análise. Se o Chrome não iniciar, confira `CHROME_PATH` e a instalação Playwright.

**Os relatórios não foram medidos neste pacote.** As notas precisam ser geradas no computador que executar a auditoria; não declare metas cumpridas antes de verificar `summary.json`.

## Atenção ao deploy

- `vite.config.ts` fornece um relay Socket.IO apenas durante `vite dev`; `vite preview` e hospedagem estática não oferecem esse endpoint. Eventos em tempo real precisam de um serviço de produção ou do mock Socket.IO exigido pelo enunciado.
- O MSW do navegador exige `public/mockServiceWorker.js` no build. O modo mock deve ser explicitamente identificado como demonstração e não como backend real.
- Os dados locais simulados não representam armazenamento durável de um servidor de produção.
- `@mswjs/socket.io-binding` ainda não está integrado. Este é um requisito pendente do desafio.
- Hospedagem SPA deve redirecionar rotas de cliente para `index.html`.
- Não publique como entrega final sem verificar cenários de falha, sessão, acessibilidade e testes em ambiente público.

## Preservação do layout

Não houve mudanças em `src/` neste marco. O visual aprovado do Marco 7 permanece intacto.
