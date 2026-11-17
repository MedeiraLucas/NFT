# KURIO — arquitetura da demonstração (Marco 9)

## Camadas
React/TypeScript e TanStack Router compõem a interface; TanStack Query gerencia consultas e invalidação; Axios consome `/api/*`, interceptado pelo MSW no navegador. `src/contracts` mantém tipos compartilhados. Dados de demonstração e sessões ficam no armazenamento local do navegador, **não** em um backend confiável.

## Deploy e tempo real
O servidor `server/index.mjs` serve `dist`, oferece fallback de SPA e hospeda Socket.IO em `/__kurio/socket.io`. Os handlers MSW publicam metadados de atualização (`type`, `id`, `version`) em `/__kurio/publish`; o cliente `socket.io-client` recebe eventos e invalida consultas TanStack Query para reconciliar via REST. O relay não transmite detalhes de pedidos. O plugin do Vite oferece o mesmo contrato em desenvolvimento. O relay público **não autentica a publicação**, portanto serve exclusivamente à demonstração e não deve ser reutilizado em produção real.

**Limitação importante:** o MSW usa estado por navegador. Eventos entre dois navegadores distintos podem disparar reconsultas, mas **não sincronizam o catálogo nem os pedidos entre navegadores**; cada navegador mantém seus próprios dados locais. Para consistência global seria necessário backend persistente. Não há blockchain, carteiras reais nem gateway.

## Sessões e isolamento
Os handlers MSW validam o token simulado, e consultas privadas devem ser invalidadas ao trocar usuário ou fazer logout. Nunca use credenciais reais. A implementação local de hashing é apenas para mock, não equivalente a autenticação segura em servidor.

## Cache e recuperação
O cache remoto usa TanStack Query, com invalidação após mutations e eventos. O checkout compara a revisão da cotação; a chave de idempotência recupera o mesmo pedido quando o corpo é igual e rejeita corpo diferente. O recibo é snapshot do pedido. Os eventos contêm versões; versões antigas e duplicadas são descartadas e, após reconexão, as consultas são invalidadas.

## UX e fidelidade
Identidade visual Nyxa-inspirada preservada. Recursos auxiliares fora do escopo não devem prometer ações reais. Skeletons e feedbacks são implementados nos fluxos cobertos; o uso de shadcn/ui e os cenários de falha previstos no enunciado precisam ser conferidos na validação final, assim como fidelidade pixel a pixel ao Figma.

## Auditoria e testes
Playwright e Lighthouse permanecem no projeto. A execução e as notas finais ainda precisam ser confirmadas na versão publicada. Não presumir aprovação de testes antigos para alterações posteriores.
