import { reactive, type InjectionKey, type DeepReadonly } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { site as defaults, type SiteContent } from '@/content/site'

export const siteContentKey: InjectionKey<DeepReadonly<SiteContent>> = Symbol('siteContent')

const siteContent = reactive<SiteContent>(structuredClone(defaults))
let fetched = false

export async function fetchSiteContent(): Promise<void> {
  if (fetched) return
  try {
    const snap = await getDoc(doc(db, 'content', 'site'))
    if (snap.exists()) {
      Object.assign(siteContent, defaults, snap.data())
    }
  } catch {
    // fallback to defaults silently
  }
  fetched = true
}

export async function saveSiteContent(data: SiteContent): Promise<void> {
  await setDoc(doc(db, 'content', 'site'), JSON.parse(JSON.stringify(data)))
  Object.assign(siteContent, data)
}

export function useSiteContent(): DeepReadonly<SiteContent> {
  return siteContent
}
