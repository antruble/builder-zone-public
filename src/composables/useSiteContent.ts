import { reactive, type InjectionKey, type DeepReadonly } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { site as defaults, type SiteContent } from '@/content/site'

export const siteContentKey: InjectionKey<DeepReadonly<SiteContent>> = Symbol('siteContent')

const siteContent = reactive<SiteContent>(structuredClone(defaults))
let fetched = false

export async function fetchSiteContent(): Promise<boolean> {
  if (fetched) return true
  try {
    const snap = await getDoc(doc(db, 'content', 'site'))
    if (snap.exists()) {
      Object.assign(siteContent, defaults, snap.data())
    }
    fetched = true
    return true
  } catch {
    // keep fetched=false so caller can retry later
    return false
  }
}

export async function saveSiteContent(data: SiteContent): Promise<void> {
  await setDoc(doc(db, 'content', 'site'), JSON.parse(JSON.stringify(data)))
  setSiteContent(data)
}

export function setSiteContent(data: SiteContent): void {
  Object.assign(siteContent, data)
  fetched = true
}

export function useSiteContent(): DeepReadonly<SiteContent> {
  return siteContent
}
