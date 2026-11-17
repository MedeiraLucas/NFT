# Checklist de entrega — Jungle Gaming

## Verificações locais
1. `npm.cmd install` e `npx.cmd msw init public/ --save`
2. `npm.cmd run typecheck` e `npm.cmd run build`
3. `npx.cmd playwright install chromium` e `npm.cmd run test:e2e`
4. Inspecionar Playwright em 390 px, 768 px e 1440 px; comparar com o Figma.
5. Validar fluxo real de login, logout, carrinho, estoque, cotação, checkout e pedidos.
6. Verificar mensagens de erro e navegação por teclado.

## Lighthouse
Execute em uma build de produção: `npm.cmd run build` e `npm.cmd run preview`.
Abra o Chrome DevTools > Lighthouse e rode para mobile e desktop, salvando os relatórios. Metas do desafio: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 90. **Não há resultados medidos incluídos.**

## Atenção ao deploy
O mock do navegador pode funcionar em hospedagem estática, mas o relay Socket.IO definido no plugin Vite não acompanha a build. Antes de publicar, implemente a solução de tempo real apropriada ao ambiente e teste os eventos em uma URL pública. Não anuncie suporte de tempo real em produção antes disso.

## Licenças
Se reutilizar arquivos, imagens ou código de terceiros, verifique a licença aplicável e preserve avisos obrigatórios. O visual de referência não autoriza automaticamente copiar código sem atribuição.
