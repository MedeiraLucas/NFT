# Marco 2 — Carrinho (incremento)

Implementado: adição pelo detalhe, carrinho de visitante local, carrinho autenticado por REST/MSW, edição e remoção, validação de disponibilidade, cotação REST com `decimal.js`, cupons `WELCOME10` e `ETHERS5`, feedback de erro e layout responsivo.

**Ainda não implementado:** mesclagem automática de carrinho de visitante após login, checkout, revalidação por eventos Socket.IO, alteração otimista, recuperação de pedidos, testes Playwright e auditoria Lighthouse. Não utilizar esta versão como entrega final do desafio.

O preço e o total exibidos vêm de `/api/quote`; o endpoint recalcula os valores com precisão decimal. O carrinho do visitante é armazenado localmente e o autenticado é isolado por usuário na simulação MSW.
