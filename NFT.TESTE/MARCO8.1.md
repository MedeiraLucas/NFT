# KURIO — Marco 8.1 (otimizações de auditoria)

Correções: SEO (meta description, robots.txt), favicon local, preload da arte principal, preconnect para fontes, carregamento lazy de imagens do catálogo, hierarquia de headings e supressão da conexão Socket.IO apenas no preview/build estático (o relay Socket.IO local permanece ativo em `npm run dev` para os testes E2E).

O script `npm run audit:lighthouse` agora consulta o campo `bin` da instalação do Lighthouse para localizar o CLI, sem presumir `index.js`/`index.cjs`, e remove `shell: true` do processo preview.

## Verificação

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run test:e2e
npm.cmd run audit:lighthouse
```

Os relatórios de quatro cenários ficam em `reports/lighthouse/`. Os resultados variam com o ambiente e devem ser medidos novamente.

**Limitação de arquitetura:** a versão estática usa MSW no navegador; o relay de Socket.IO só existe no Vite dev. Para tempo real no deploy público, é necessário um backend Socket.IO real.
