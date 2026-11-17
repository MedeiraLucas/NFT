import {nfts} from '../src/mocks/fixtures';

// The MSW database is lazily created: reading a fresh NFT does not write it to
// localStorage. Seed it explicitly before mutating it in realtime tests.
export async function seedRealtimeDatabase(page: import('@playwright/test').Page) {
  await page.evaluate((fixtures) => {
    const key = 'kurio-mock-db-v2';
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, JSON.stringify({
      users: [], sessions: {}, cart: {}, nfts: fixtures,
      wallets: {}, orders: [], idempotency: {}
    }));
  }, nfts);
}
