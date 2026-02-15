export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date?: string
  tag?: 'Hamarosan' | 'Általános'
}

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'Nyitás előtti információk',
    excerpt: 'Hamarosan megosztjuk a pontos nyitási részleteket és a terem bemutatását.',
    tag: 'Hamarosan',
  },
  {
    id: '2',
    title: 'Edzések és események',
    excerpt: 'Tervezzük a rendszeres edzéseket és közösségi programokat — részletek érkeznek.',
    tag: 'Hamarosan',
  },
  {
    id: '3',
    title: 'Útépítési napok',
    excerpt: 'Az új utak rendszeres frissítése a tervek között szerepel. Kövess minket a részletekért.',
    tag: 'Hamarosan',
  },
  {
    id: '4',
    title: 'Közösség és versenyek',
    excerpt: 'Szeretnénk helyi versenyeket és közösségi eseményeket szervezni — hamarosan többet mesélünk.',
    tag: 'Általános',
  },
]
