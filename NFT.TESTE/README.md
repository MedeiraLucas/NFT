<div align="center">

# KURIO

### Marketplace de NFTs e colecionáveis digitais

Uma experiência de descoberta, coleção e compra de NFTs, desenvolvida com **React, TypeScript e uma arquitetura frontend orientada a dados**.

[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**[🌐 Acessar demonstração](https://kurio-nft-marketplace-x1ok.onrender.com)** · **[💻 Repositório](https://github.com/MedeiraLucas/NFT)**

</div>

---

## Sobre o projeto

O **KURIO** é um marketplace de NFTs desenvolvido como projeto frontend para explorar a construção de interfaces responsivas, navegação entre páginas, gerenciamento de estado, consumo de APIs e experiências de compra.

O projeto reúne uma interface visual inspirada em um protótipo do Figma e fluxos funcionais de catálogo, autenticação, carrinho, checkout e área do usuário. Para permitir a navegação e os testes sem depender de uma infraestrutura externa, as APIs e os cenários de negócio são **simulados com MSW**.

> **Nota:** esta é uma aplicação de demonstração. As carteiras, transações e compras são simuladas; não há negociação real de criptoativos.

## Prévia

![Prévia da interface do KURIO](docs/img/preview.png)

> Caso a imagem não apareça, confira se `docs/img/preview.png` está presente no repositório.

## Funcionalidades

- **Exploração de NFTs:** catálogo com busca, filtros e ordenação.
- **Detalhes dos itens:** informações, imagens e disponibilidade dos colecionáveis.
- **Conta do usuário:** cadastro, login, logout e perfil.
- **Favoritos:** interação com os itens do catálogo.
- **Carrinho:** adição e remoção de itens, ajuste de quantidades e cupons.
- **Checkout:** revisão do pedido e simulação de pagamentos aprovados, pendentes ou recusados.
- **Carteiras:** cadastro e gerenciamento de carteiras no ambiente simulado.
- **Atualizações em tempo real:** integração com Socket.IO e cenários de eventos simulados.
- **Tratamento de estados:** carregamento, erros, falhas de rede e respostas de API.
- **Layout responsivo:** experiência adaptada a desktop e dispositivos móveis.

## Tecnologias

| Categoria | Tecnologias |
| --- | --- |
| Interface | React 19, TypeScript, Vite |
| Estilização | Tailwind CSS 4, componentes no padrão shadcn/ui, Lucide React |
| Navegação e dados | TanStack Router, TanStack Query, Axios |
| Simulação de serviços | Mock Service Worker (MSW) |
| Eventos | Socket.IO Client e integração de mocks |
| Validação e valores | Zod, Decimal.js |
| Qualidade | Playwright, ESLint, Lighthouse |
| Publicação | Render |

## Como executar localmente

**Pré-requisitos:** Node.js 20 ou superior e npm.

```bash
git clone https://github.com/MedeiraLucas/NFT.git
cd NFT/NFT.TESTE
npm ci
npm run dev
```

Acesse **http://localhost:5173** no navegador.

> No Windows PowerShell, se o comando `npm` estiver bloqueado pela política de execução, use `npm.cmd` nos exemplos acima.

### Build de produção

```bash
npm run build
npm run preview
```

O build executa a checagem do TypeScript e gera os arquivos de produção em `dist/`.

### Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Valida os tipos e gera o build de produção |
| `npm run preview` | Executa uma prévia do build |
| `npm run typecheck` | Verifica os tipos TypeScript |
| `npm run lint` | Executa o ESLint |
| `npm run test:e2e` | Executa os testes E2E com Playwright |
| `npm run test:e2e:report` | Abre o relatório dos testes |
| `npm run lighthouse` | Executa auditorias de qualidade e desempenho |

Para instalar o navegador usado pelo Playwright:

```bash
npx playwright install chromium
```

## Testes e qualidade

O projeto inclui testes automatizados com **Playwright**, cobrindo fluxos como navegação, autenticação, catálogo, carrinho, compra e comportamento da interface. Também inclui configuração para auditorias com **Lighthouse**.

O comando de build foi executado com sucesso na versão atual, incluindo a verificação de tipos e a compilação de produção. **Resultados de testes E2E e pontuações de Lighthouse devem ser conferidos em uma execução atual**, antes de serem apresentados como métricas finais.

## Arquitetura

A aplicação separa responsabilidades entre páginas, componentes, funcionalidades de negócio, serviços, contratos e mocks. O uso do **TanStack Query** centraliza o estado de dados remotos, enquanto o **TanStack Router** organiza a navegação e o **MSW** permite simular diferentes respostas da API.

Para informações mais detalhadas sobre contratos, eventos e decisões técnicas, consulte [ARCHITECTURE.md](./ARCHITECTURE.md).

## Deploy

A demonstração está hospedada no **Render**:

**https://kurio-nft-marketplace-x1ok.onrender.com**

Configuração utilizada no serviço:

```text
Root Directory: NFT.TESTE
Build Command: npm ci && npm run build
Start Command: npm run start
```

## Autor

Desenvolvido por **Lucas Medeira**.

[GitHub](https://github.com/MedeiraLucas) · [Repositório KURIO](https://github.com/MedeiraLucas/NFT)

---

<div align="center">

**KURIO — Explore, descubra e colecione.**

</div>
