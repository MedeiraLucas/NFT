# Marco 7 — Qualidade, segurança e validação

Base: Marco 6, com visual Nyxa-inspired preservado. Esta entrega **não** substitui o design existente.

## Adicionado
- `e2e/security-realtime.spec.ts`: testes de autenticação obrigatória para pedidos, eventos duplicados/antigos e validação do relay.
- Correção do rastreamento de versões após reconexão: versões locais são descartadas quando uma conexão é restabelecida e os dados são reconciliados via REST.
- Scripts `test:e2e:report` e `test:e2e:ci` para inspeção e CI.
- Checklist de entrega e medição Lighthouse (`VALIDACAO-FINAL.md`).

## Executar no Windows
```powershell
npm.cmd install
npx.cmd msw init public/ --save
npm.cmd run build
npm.cmd run test:e2e
```

## Limitações conhecidas
- O relay Socket.IO em `vite.config.ts` é **somente para desenvolvimento**, não é backend de produção e não substitui `@mswjs/socket.io-binding`.
- O MSW persiste dados de demonstração em `localStorage`: não é uma solução de autenticação segura para produção.
- Não há prova de métricas Lighthouse, deploy público, regressão visual ou cobertura total dos cenários exigidos.
- O teste de evento antigo garante a versão visível, não mede contagem interna de invalidações de cache.
- Não foi possível concluir `npm ci` neste ambiente; o build e a suíte devem ser executados localmente.
