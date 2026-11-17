# Marco 5 — Socket.IO (ambiente local)

Este marco adiciona um relay Socket.IO real ao servidor de desenvolvimento Vite e um cliente Socket.IO no navegador. As mutações MSW de pedidos publicam eventos `nft.updated` e `order.updated` sem divulgar dados do pedido; o cliente invalida queries TanStack Query e consulta novamente a API REST. Eventos repetidos ou com versão antiga são ignorados, e reconexões invalidam queries para recuperar eventos perdidos.

**Limites:** o relay é exclusivamente de desenvolvimento, não é um servidor de produção, e a publicação HTTP não possui autenticação. Não exponha o endpoint `/__kurio/publish` na internet. A exigência específica de `@mswjs/socket.io-binding` do enunciado ainda não está cumprida; esta implementação usa Socket.IO real acoplado ao Vite como alternativa provisória. Não há garantia de entrega em ambiente `vite preview` ou em hospedagem estática. O teste E2E de realtime foi acrescentado, mas ainda precisa ser executado e validado.

## Instalação

`npm install` (atualiza package-lock com a nova dependência `socket.io`), `npm run build`, `npm run test:e2e`.
