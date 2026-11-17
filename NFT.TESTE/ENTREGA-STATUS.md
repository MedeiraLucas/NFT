# KURIO — estado real da entrega

Base: projeto KURIO independente (Marco 3). O projeto Nyxa foi usado apenas como referência de escopo e cobertura, sem incorporar seu código.

## Implementado
- Catálogo, detalhe, busca e filtros, carrinho visitante/autenticado, cupom e cotação decimal.
- Login/cadastro com credenciais simuladas, perfil, carteiras e checkout.
- Pedidos idempotentes e cenários de pagamento aprovado, pendente e recusado (seletor de demonstração no checkout).
- Pedidos pendentes/recusados preservam os itens no carrinho; pedidos aprovados descontam estoque.
- Suite inicial Playwright e configuração desktop/mobile.

## Pendente para conformidade integral com o enunciado
- Socket.IO real conectado a MSW socket binding com deduplicação/versionamento.
- Cenários determinísticos completos de rede, expiração e timeout; autenticação em backend real (o armazenamento local é somente mock).
- Fluxos completos de recuperação de sessão, edição de senha/avatar, galeria/edições e favoritos.
- Testes E2E aprofundados, screenshots de regressão visual e execução de Lighthouse com metas comprovadas.
- Deploy público e verificação em ambiente de produção.

## Execução
`npm install` / `npx msw init public/ --save` / `npm run build` / `npm run dev`.
`npx playwright install chromium` e `npm run test:e2e` para os testes.

**Não declarar a aplicação aprovada ou pronta para submissão integral antes de verificar os itens pendentes.**
