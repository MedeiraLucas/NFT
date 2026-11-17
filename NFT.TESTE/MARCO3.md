# Marco 3 — Implementação incremental

Incluído: login com tentativa de mesclagem de carrinho visitante, perfil básico, cadastro de carteiras simuladas, checkout com cotação e revisão, criação idempotente de pedidos confirmados, recibo imutável e rotas.

**Não é a entrega final do desafio.** Ainda faltam estados de pedidos pendentes/recusados, timeout pós-criação, expiração e retomada de sessão, edição de senha/avatar/carteiras, Socket.IO, testes E2E e Lighthouse. A carteira é uma simulação e não se conecta a serviços reais.

A mesclagem do carrinho mantém os itens visitantes se a API rejeitar a operação.
