import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useCatalog } from '../features/catalog/hooks';
import type { CatalogParams } from '../contracts';

export function Home() {
  const navigate = useNavigate();
  const raw = useSearch({ strict: false }) as CatalogParams;
  const params: CatalogParams & { page: number } = {
    q: raw.q || '',
    category: raw.category || '',
    network: raw.network || '',
    sort: raw.sort || 'recent',
    page: Math.max(1, Number(raw.page) || 1),
  };
  const query = useCatalog(params);

  const change = (values: Partial<CatalogParams>) =>
    navigate({
      to: '/market',
      search: { ...params, ...values, page: values.page ?? 1 } as never,
    });

  return (
    <main className="page">
      <section className="hero">
        <div>
          <small>Bem-vindo à Kurio</small>
          <h1>SEJA DONO DO FUTURO<br /> DA ARTE DIGITAL</h1>
          <p>Descubra NFTs selecionados de criadores emergentes e consagrados.</p>
          <button className="btn" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>
            EXPLORAR
          </button>
        </div>
        <img src="/images/emerald.webp" alt="NFT Emerald Ape" fetchPriority="high" decoding="async" width={600} height={600} />
      </section>

      <div id="catalogo" className="market-layout">
        <aside className="filters">
          <label htmlFor="search-nft">Buscar NFTs</label>
          <input id="search-nft" value={params.q} onChange={e => change({ q: e.target.value })} placeholder="Buscar NFTs..." />
          <h2>Coleções</h2>
          {['', 'Arte digital', 'Fotografia', 'Música', 'Arte 3D', 'Colecionáveis', 'Generativa'].map(c => (
            <button key={c} className={params.category === c ? 'selected' : ''} onClick={() => change({ category: c })}>
              {c || 'Todas as coleções'}
            </button>
          ))}
          <h2>Rede</h2>
          {['', 'Ethereum', 'Polygon', 'Arbitrum'].map(n => (
            <button key={n} className={params.network === n ? 'selected' : ''} onClick={() => change({ network: n })}>
              {n || 'Todas as redes'}
            </button>
          ))}
        </aside>

        <section>
          <div className="market-heading">
            <h2>Todos os NFTs</h2>
            <label>
              Ordenar por:{' '}
              <select aria-label="Ordenar NFTs" value={params.sort} onChange={e => change({ sort: e.target.value as CatalogParams['sort'] })}>
                <option value="recent">Recentes</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </label>
          </div>

          {query.isPending ? (
            <div className="catalog-grid">
              {Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton" aria-label="Carregando NFT" />)}
            </div>
          ) : query.isError ? (
            <div role="alert">
              Falha ao carregar catálogo.{' '}
              <button className="btn" onClick={() => query.refetch()}>Tentar novamente</button>
            </div>
          ) : (
            <>
              <div className="catalog-grid">
                {query.data.items.map(n => (
                  <article className="nft-card" key={n.id}>
                    <Link to="/nft/$id" params={{ id: n.id }}>
                      <div className="nft-photo">
                        <img src={'/images/' + n.image} alt={'Arte digital ' + n.name} loading="lazy" decoding="async" width={400} height={400} />
                      </div>
                      <strong>{n.name} #{n.id}</strong>
                      <p>{n.priceEth} ETH</p>
                    </Link>
                  </article>
                ))}
              </div>
              {query.data.items.length === 0 && <p>Nenhum NFT encontrado.</p>}
              <div className="pagination">
                <button disabled={params.page === 1} onClick={() => change({ page: params.page - 1 })}>Anterior</button>
                <span>Página {params.page} de {query.data.pages || 1}</span>
                <button disabled={params.page >= query.data.pages} onClick={() => change({ page: params.page + 1 })}>Próxima</button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
