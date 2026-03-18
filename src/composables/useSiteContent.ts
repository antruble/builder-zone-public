import { reactive, ref, watchEffect, type InjectionKey, type DeepReadonly } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { site as defaults, siteEn as defaultsEn, type SiteContent } from '@/content/site'

export const siteContentKey: InjectionKey<DeepReadonly<SiteContent>> = Symbol('siteContent')

// Per-locale content stores
const siteHu = reactive<SiteContent>(structuredClone(defaults))
const siteEn = reactive<SiteContent>(structuredClone(defaultsEn))

// The "live" reactive object provided to all components
const siteContent = reactive<SiteContent>(structuredClone(defaults))

// Module-level locale singleton (persisted to localStorage)
export const locale = ref<'hu' | 'en'>(
  (localStorage.getItem('bz-locale') as 'hu' | 'en') ?? 'hu',
)

// Keep siteContent in sync with the active locale
watchEffect(() => {
  const src = locale.value === 'hu' ? siteHu : siteEn
  Object.assign(siteContent, src)
  localStorage.setItem('bz-locale', locale.value)
})

let fetched = false

export async function fetchSiteContent(): Promise<boolean> {
  if (fetched) return true
  try {
    const snap = await getDoc(doc(db, 'content', 'site'))
    if (snap.exists()) {
      const data = snap.data()

      if (data.hu) {
        // New format: { hu: SiteContent, en: SiteContent }
        const hu = data.hu as Partial<SiteContent>
        const en = data.en as Partial<SiteContent> | undefined
        Object.assign(siteHu, defaults, hu, {
          contact: { ...defaults.contact, ...(hu.contact ?? {}) },
          pricing: { ...defaults.pricing, ...(hu.pricing ?? {}) },
          ui: { ...defaults.ui, ...(hu.ui ?? {}) },
        })
        if (en) {
          Object.assign(siteEn, defaultsEn, en, {
            contact: { ...defaultsEn.contact, ...(en.contact ?? {}) },
            pricing: { ...defaultsEn.pricing, ...(en.pricing ?? {}) },
            ui: { ...defaultsEn.ui, ...(en.ui ?? {}) },
          })
        }
        // Sync missing EN pricing items from HU (prices are HUF, language-independent)
        while (siteEn.pricing.items.length < siteHu.pricing.items.length) {
          const i = siteEn.pricing.items.length
          const huItem = siteHu.pricing.items[i]!
          const enPrices: Record<string, number> = {}
          siteEn.pricing.categories.forEach((enCat, ci) => {
            const huCat = siteHu.pricing.categories[ci]
            enPrices[enCat] = (huCat ? (huItem.prices[huCat] ?? 0) : 0)
          })
          siteEn.pricing.items.push({ name: huItem.name, prices: enPrices, highlight: huItem.highlight })
        }
        while (siteEn.pricing.addons.length < siteHu.pricing.addons.length) {
          const i = siteEn.pricing.addons.length
          const huAddon = siteHu.pricing.addons[i]!
          siteEn.pricing.addons.push({ name: huAddon.name, price: huAddon.price })
        }
      } else {
        // Old format: flat SiteContent (HU only) — migrate gracefully
        const hu = data as Partial<SiteContent>
        Object.assign(siteHu, defaults, hu, {
          contact: { ...defaults.contact, ...(hu.contact ?? {}) },
          pricing: { ...defaults.pricing, ...(hu.pricing ?? {}) },
        })
        // siteEn stays as defaultsEn (already set)
      }
    }
    fetched = true
    return true
  } catch {
    return false
  }
}

export function setSiteContent(hu: SiteContent, en: SiteContent): void {
  Object.assign(siteHu, hu)
  Object.assign(siteEn, en)
  fetched = true
}

export function useSiteContent(): DeepReadonly<SiteContent> {
  return siteContent
}

export function useSiteRaw(): { hu: SiteContent; en: SiteContent } {
  return { hu: siteHu, en: siteEn }
}
