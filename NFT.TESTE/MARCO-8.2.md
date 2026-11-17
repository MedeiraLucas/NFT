# KURIO — Marco 8.2

Base: NFT(2).zip enviada pelo usuário.

## Alterações
- CSS do Google Fonts carregado sem bloquear o primeiro paint (preload com troca para stylesheet e fallback noscript). A fonte visual continua Roboto Mono quando disponível.
- Títulos da barra lateral do catálogo de h3 para h2, preservando estilo visual.
- Áreas de clique dos filtros ampliadas para no mínimo 28 px e largura total da barra lateral.
- Mantidos os componentes, fluxos de compra, mocks e testes E2E existentes.

## Verificações locais
Execute `npm.cmd install`, `npm.cmd run build`, `npm.cmd run test:e2e` e `npm.cmd run audit:lighthouse`. As notas Lighthouse variam por ambiente e não foram verificadas nesta entrega.

## Observação
O relatório também apontou JavaScript não utilizado, sobretudo o bundle do MSW; mudanças nessa inicialização exigem testes adicionais para não comprometer a API simulada e os 24 testes.
