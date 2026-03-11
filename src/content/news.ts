export interface NewsItem {
  id: string
  title: string
  subtitle?: string
  body: string
  date: string // 'YYYY-MM-DD'
  images?: string[]
  published: boolean
  // Optional English translations
  titleEn?: string
  subtitleEn?: string
  bodyEn?: string
}

export const newsItems: NewsItem[] = []
