# Correções do Marco 7

- Atualizado o seletor de cadastro para o botão **Criar conta**.
- Adicionado preenchimento de **Confirmar senha** nos testes de cadastro, necessário no layout do Marco 6.
- Ajustado o seletor do teste de senha para selecionar somente o campo principal.
- Inicialização explícita do banco MSW nos testes de tempo real, pois a leitura de um NFT não cria automaticamente a chave `kurio-mock-db-v2` no localStorage.

O código da interface e o layout foram preservados. Execute `npm install`, `npm run build` e `npm run test:e2e` no computador para confirmar os resultados. A instalação de dependências não terminou neste ambiente, então **não há alegação de testes aprovados** para esta revisão.
