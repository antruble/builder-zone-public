import { ref, type InjectionKey, type Ref } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { galleryItems as defaults, type GalleryItem } from '@/content/gallery'

export const galleryKey: InjectionKey<Ref<GalleryItem[]>> = Symbol('gallery')

const galleryContent = ref<GalleryItem[]>([...defaults])
let fetched = false

export async function fetchGallery(): Promise<boolean> {
  if (fetched) return true
  try {
    const snap = await getDoc(doc(db, 'gallery', 'items'))
    if (snap.exists()) {
      const data = snap.data()
      if (Array.isArray(data.items) && data.items.length > 0) {
        galleryContent.value = data.items as GalleryItem[]
      }
    }
    fetched = true
    return true
  } catch {
    // keep fetched=false so caller can retry later
    return false
  }
}

export async function saveGallery(items: GalleryItem[]): Promise<void> {
  await setDoc(doc(db, 'gallery', 'items'), { items: JSON.parse(JSON.stringify(items)) })
  setGallery(items)
}

export function setGallery(items: GalleryItem[]): void {
  galleryContent.value = [...items]
  fetched = true
}

export function useGallery(): Ref<GalleryItem[]> {
  return galleryContent
}
