import { ref, type InjectionKey, type Ref } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { newsItems as defaults, type NewsItem } from '@/content/news'

export const newsKey: InjectionKey<Ref<NewsItem[]>> = Symbol('news')

const newsContent = ref<NewsItem[]>([...defaults])
let fetched = false

export async function fetchNews(): Promise<boolean> {
  if (fetched) return true
  try {
    const snap = await getDoc(doc(db, 'news', 'items'))
    if (snap.exists()) {
      const data = snap.data()
      if (Array.isArray(data.items)) {
        newsContent.value = data.items as NewsItem[]
      }
    }
    fetched = true
    return true
  } catch {
    return false
  }
}

export async function saveNews(items: NewsItem[]): Promise<void> {
  await setDoc(doc(db, 'news', 'items'), { items: JSON.parse(JSON.stringify(items)) })
  setNews(items)
}

export function setNews(items: NewsItem[]): void {
  newsContent.value = [...items]
  fetched = true
}

export function useNews(): Ref<NewsItem[]> {
  return newsContent
}
