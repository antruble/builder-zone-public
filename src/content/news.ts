export interface NewsItem {
  id: string
  title: string
  subtitle?: string
  body: string
  date: string // 'YYYY-MM-DD'
  images?: string[]
  published: boolean
}

export const newsItems: NewsItem[] = []
