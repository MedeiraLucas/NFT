# Marco 4 — ampliação de testes E2E

Esta entrega preserva o código do pacote integrado anterior e adiciona `e2e/flows.spec.ts`, com cenários de cadastro, persistência da sessão, login inválido, carrinho visitante, mesclagem no cadastro, quantidades, remoção, cupom inválido e pagamento recusado.

## Rodar

```powershell
npm.cmd install
npx.cmd msw init public/ --save
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

## Estado de validação

O usuário já confirmou o build e seis testes smoke do pacote anterior. Os **novos testes deste Marco 4 ainda precisam ser executados**. Se um teste falhar, envie a saída e o trace, para distinguir falha no teste de defeito na aplicação.

## Ainda pendente para o desafio completo

Socket.IO com binding de mock WebSocket, cenários determinísticos de eventos, suite visual regression, expiração de sessão, testes abrangentes de isolamento, Lighthouse e deploy público. Não declarar entrega final ou cobertura completa antes dessas verificações.
