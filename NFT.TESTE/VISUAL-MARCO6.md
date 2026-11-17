# Marco 6 — Alinhamento visual com a referência projeto de referência

A partir da versão KURIO Marco 5, foram recriados **com código próprio**: cabeçalho, navegação mobile, composição da autenticação (modal desktop / tela cheia mobile), cores, tipografia, espaçamentos e tratamento visual das páginas de catálogo, detalhe, carrinho e checkout.

## O que permanece
- React, TypeScript, TanStack Router e Query, Axios, MSW, Socket.IO e testes Playwright do Marco 5.
- Contratos, endpoints e lógica de login, cadastro, carrinho e checkout não foram substituídos pelo projeto de referência.

## Limitações
- Este é um alinhamento visual, não uma comprovação de correspondência pixel a pixel. É necessário comparar capturas em 390/768/1440 px e ajustar diferenças remanescentes.
- Os botões de autenticação por Google/Facebook são explicitamente desativados porque não existe integração OAuth.
- O build e os testes E2E precisam ser executados no ambiente local: a instalação de dependências não terminou no ambiente de preparação.

## Comandos
```
npm.cmd install
npx.cmd msw init public/ --save
npm.cmd run build
npm.cmd run test:e2e
npm.cmd run dev
```

## Referência
projeto de referência de João Batista Neto, fornecido pelo usuário, licenciado sob MIT. A referência foi estudada para o layout; a implementação neste pacote foi escrita independentemente, sem transferir os arquivos de código projeto de referência.
