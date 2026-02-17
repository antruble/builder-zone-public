<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, writeBatch } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { site as defaults, type SiteContent } from '@/content/site'
import { galleryItems as galleryDefaults, type GalleryItem } from '@/content/gallery'
import { fetchSiteContent, setSiteContent, useSiteContent } from '@/composables/useSiteContent'
import { fetchGallery, setGallery, useGallery } from '@/composables/useGallery'

const loggedIn = ref(false)
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')
const saving = ref(false)
const saveMessage = ref('')
const loading = ref(false)
const loadError = ref('')

const form = reactive<SiteContent>(JSON.parse(JSON.stringify(defaults)))
const gallery = reactive<{ items: GalleryItem[] }>({ items: JSON.parse(JSON.stringify(galleryDefaults)) })

let unsubscribeAuth: (() => void) | undefined

onMounted(() => {
  unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    loggedIn.value = !!user
    if (user) {
      await loadData()
    } else {
      loadError.value = ''
      saveMessage.value = ''
    }
  })
})

onUnmounted(() => {
  unsubscribeAuth?.()
})

async function login() {
  loginError.value = ''
  try {
    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  } catch {
    loginError.value = 'Hibás email vagy jelszó.'
  }
}

async function logout() {
  await signOut(auth)
  loggedIn.value = false
}

async function loadData() {
  loading.value = true
  loadError.value = ''
  try {
    const [siteLoaded, galleryLoaded] = await Promise.all([fetchSiteContent(), fetchGallery()])
    if (!siteLoaded || !galleryLoaded) {
      loadError.value = 'Nem sikerult betolteni az adatokat. Probald ujra.'
      return
    }

    const currentSite = useSiteContent()
    Object.assign(form, JSON.parse(JSON.stringify(currentSite)))

    const currentGallery = useGallery()
    gallery.items = JSON.parse(JSON.stringify(currentGallery.value))
  } finally {
    loading.value = false
  }
}

async function handleSave() {
  if (loading.value || !!loadError.value) return

  saving.value = true
  saveMessage.value = ''
  try {
    const sitePayload = JSON.parse(JSON.stringify(form)) as SiteContent
    const galleryPayload = JSON.parse(JSON.stringify(gallery.items)) as GalleryItem[]

    const batch = writeBatch(db)
    batch.set(doc(db, 'content', 'site'), sitePayload)
    batch.set(doc(db, 'gallery', 'items'), { items: galleryPayload })
    await batch.commit()

    setSiteContent(sitePayload)
    setGallery(galleryPayload)

    saveMessage.value = 'Mentve!'
    setTimeout(() => { saveMessage.value = '' }, 3000)
  } catch (e) {
    saveMessage.value = 'Hiba a mentés során.'
    console.error(e)
  }
  saving.value = false
}

function addPricingRow() {
  const prices: Record<string, number> = {}
  form.pricing.categories.forEach(c => { prices[c] = 0 })
  form.pricing.items.push({ name: '', prices })
}

function removePricingRow(index: number) {
  form.pricing.items.splice(index, 1)
}

function addAddon() {
  form.pricing.addons.push({ name: '', price: 0 })
}

function removeAddon(index: number) {
  form.pricing.addons.splice(index, 1)
}

function addPhone() {
  form.contact.phones.push('')
}

function removePhone(index: number) {
  form.contact.phones.splice(index, 1)
}

function addGalleryItem() {
  gallery.items.push({ id: String(Date.now()), alt: '', src: '' })
}

function removeGalleryItem(index: number) {
  gallery.items.splice(index, 1)
}

</script>

<template>
  <div class="admin-page">
    <!-- Login -->
    <div v-if="!loggedIn" class="admin-login">
      <div class="admin-login-card">
        <h1 class="admin-login-title">Boulder Zóna Admin</h1>
        <form class="admin-login-form" @submit.prevent="login">
          <input
            v-model="loginEmail"
            type="email"
            placeholder="Email"
            class="admin-input"
            required
          />
          <input
            v-model="loginPassword"
            type="password"
            placeholder="Jelszó"
            class="admin-input"
            required
          />
          <p v-if="loginError" class="admin-error">{{ loginError }}</p>
          <button type="submit" class="admin-btn admin-btn--primary">Bejelentkezés</button>
        </form>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-else class="admin-panel">
      <header class="admin-header">
        <h1 class="admin-header-title">Boulder Zóna Admin</h1>
        <div class="admin-header-actions">
          <span v-if="saveMessage" class="admin-save-msg">{{ saveMessage }}</span>
          <button v-if="loadError" class="admin-btn admin-btn--ghost" :disabled="loading" @click="loadData">
            Ujraprobalas
          </button>
          <button class="admin-btn admin-btn--primary" :disabled="saving || loading || !!loadError" @click="handleSave">
            {{ saving ? 'Mentés...' : 'Mentés' }}
          </button>
          <button class="admin-btn admin-btn--ghost" @click="logout">Kijelentkezés</button>
        </div>
      </header>

      <div class="admin-content">
        <p v-if="loading" class="admin-info">Adatok betoltese...</p>
        <p v-else-if="loadError" class="admin-error admin-error--block">{{ loadError }}</p>
        <!-- ═══ Kapcsolat ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Kapcsolat</h2>
          <div class="admin-grid">
            <label class="admin-field">
              <span class="admin-label">Név</span>
              <input v-model="form.contact.name" class="admin-input" />
            </label>
            <label class="admin-field">
              <span class="admin-label">Cím</span>
              <input v-model="form.contact.address" class="admin-input" />
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Cím megjegyzés</span>
              <input v-model="form.contact.addressNote" class="admin-input" />
            </label>
            <label class="admin-field">
              <span class="admin-label">Email (üzleti)</span>
              <input v-model="form.contact.email" type="email" class="admin-input" />
            </label>
            <label class="admin-field">
              <span class="admin-label">Email (info)</span>
              <input v-model="form.contact.emailInfo" type="email" class="admin-input" />
            </label>
          </div>

          <div class="admin-subsection">
            <span class="admin-label">Telefonszámok</span>
            <div v-for="(_, i) in form.contact.phones" :key="i" class="admin-row">
              <input v-model="form.contact.phones[i]" class="admin-input admin-input--flex" />
              <button class="admin-btn admin-btn--danger" @click="removePhone(i)">Törlés</button>
            </div>
            <button class="admin-btn admin-btn--ghost" @click="addPhone">+ Telefonszám</button>
          </div>

          <div class="admin-subsection">
            <span class="admin-label">Social linkek</span>
            <div v-for="(_, i) in form.contact.socialLinks" :key="i" class="admin-row">
              <input v-model="form.contact.socialLinks[i]" class="admin-input admin-input--flex" />
            </div>
          </div>
        </section>

        <!-- ═══ Nyitvatartás ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Nyitvatartás</h2>
          <div class="admin-grid">
            <label class="admin-field">
              <span class="admin-label">Hétköznap napok</span>
              <input v-model="form.hours.weekdays.days" class="admin-input" />
            </label>
            <label class="admin-field">
              <span class="admin-label">Nyitás</span>
              <input v-model="form.hours.weekdays.open" class="admin-input" />
            </label>
            <label class="admin-field">
              <span class="admin-label">Zárás</span>
              <input v-model="form.hours.weekdays.close" class="admin-input" />
            </label>
          </div>
          <div class="admin-grid">
            <label class="admin-field">
              <span class="admin-label">Hétvége napok</span>
              <input v-model="form.hours.weekend.days" class="admin-input" />
            </label>
            <label class="admin-field">
              <span class="admin-label">Nyitás</span>
              <input v-model="form.hours.weekend.open" class="admin-input" />
            </label>
            <label class="admin-field">
              <span class="admin-label">Zárás</span>
              <input v-model="form.hours.weekend.close" class="admin-input" />
            </label>
          </div>
        </section>

        <!-- ═══ Rólunk ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Rólunk</h2>
          <div class="admin-grid">
            <label class="admin-field admin-field--full">
              <span class="admin-label">Főcím</span>
              <input v-model="form.about.headline" class="admin-input" />
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Misszió</span>
              <input v-model="form.about.mission" class="admin-input" />
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Alapítók bemutatkozás</span>
              <textarea v-model="form.about.foundersIntro" class="admin-textarea" rows="4"></textarea>
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Vízió</span>
              <textarea v-model="form.about.vision" class="admin-textarea" rows="4"></textarea>
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Záró idézet</span>
              <textarea v-model="form.about.closing" class="admin-textarea" rows="3"></textarea>
            </label>
          </div>
        </section>

        <!-- ═══ Árlista ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Árlista</h2>
          <div v-for="(item, i) in form.pricing.items" :key="i" class="admin-pricing-row">
            <div class="admin-row">
              <input v-model="item.name" class="admin-input admin-input--flex" placeholder="Jegy neve" />
              <label class="admin-checkbox">
                <input v-model="item.highlight" type="checkbox" />
                <span>Kiemelt</span>
              </label>
              <button class="admin-btn admin-btn--danger" @click="removePricingRow(i)">Törlés</button>
            </div>
            <div class="admin-grid admin-grid--tight">
              <label v-for="cat in form.pricing.categories" :key="cat" class="admin-field">
                <span class="admin-label">{{ cat }} (Ft)</span>
                <input v-model.number="item.prices[cat]" type="number" class="admin-input" />
              </label>
            </div>
          </div>
          <button class="admin-btn admin-btn--ghost" @click="addPricingRow">+ Jegy hozzáadása</button>

          <h3 class="admin-subtitle">Kiegészítők</h3>
          <div v-for="(addon, i) in form.pricing.addons" :key="i" class="admin-row">
            <input v-model="addon.name" class="admin-input admin-input--flex" placeholder="Név" />
            <input v-model.number="addon.price" type="number" class="admin-input" style="width: 8rem" placeholder="Ár" />
            <button class="admin-btn admin-btn--danger" @click="removeAddon(i)">Törlés</button>
          </div>
          <button class="admin-btn admin-btn--ghost" @click="addAddon">+ Kiegészítő</button>
        </section>

        <!-- ═══ Segédlet — Bevezető ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Segédlet — Bevezető</h2>
          <div class="admin-grid">
            <label class="admin-field">
              <span class="admin-label">Kicker</span>
              <input v-model="form.help.intro.kicker" class="admin-input" />
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Főcím</span>
              <input v-model="form.help.intro.headline" class="admin-input" />
            </label>
          </div>
          <div class="admin-subsection">
            <span class="admin-label">Bekezdések</span>
            <div v-for="(_, i) in form.help.intro.paragraphs" :key="i" class="admin-row">
              <textarea v-model="form.help.intro.paragraphs[i]" class="admin-textarea admin-input--flex" rows="2"></textarea>
            </div>
          </div>
        </section>

        <!-- ═══ Segédlet — Jelölések ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Segédlet — Jelölések</h2>
          <div class="admin-grid">
            <label class="admin-field">
              <span class="admin-label">Kicker</span>
              <input v-model="form.help.markings.kicker" class="admin-input" />
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Főcím</span>
              <input v-model="form.help.markings.headline" class="admin-input" />
            </label>
            <label class="admin-field admin-field--full">
              <span class="admin-label">Leírás</span>
              <input v-model="form.help.markings.description" class="admin-input" />
            </label>
          </div>
          <div v-for="(rule, i) in form.help.markings.rules" :key="i" class="admin-subsection">
            <div class="admin-grid">
              <label class="admin-field">
                <span class="admin-label">Szabály {{ i + 1 }} — Cím</span>
                <input v-model="rule.title" class="admin-input" />
              </label>
              <label class="admin-field admin-field--full">
                <span class="admin-label">Szöveg</span>
                <textarea v-model="rule.text" class="admin-textarea" rows="2"></textarea>
              </label>
            </div>
          </div>
        </section>

        <!-- ═══ Segédlet — Nehézségi szintek ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Nehézségi szintek</h2>
          <div v-for="(level, i) in form.help.difficultyLegend" :key="i" class="admin-subsection">
            <div class="admin-grid">
              <label class="admin-field">
                <span class="admin-label">{{ level.name }}</span>
                <input v-model="level.name" class="admin-input" />
              </label>
              <label class="admin-field admin-field--full">
                <span class="admin-label">Leírás</span>
                <textarea v-model="level.description" class="admin-textarea" rows="2"></textarea>
              </label>
            </div>
          </div>
        </section>

        <!-- ═══ Galéria ═══ -->
        <section class="admin-section">
          <h2 class="admin-section-title">Galéria</h2>
          <div class="admin-gallery-grid">
            <div v-for="(item, i) in gallery.items" :key="item.id" class="admin-gallery-card">
              <div class="admin-gallery-preview">
                <img v-if="item.src" :src="item.src" :alt="item.alt" class="admin-gallery-img" />
                <div v-else class="admin-gallery-placeholder">Nincs kép</div>
              </div>
              <input v-model="item.alt" class="admin-input" placeholder="Alt szöveg" />
              <input v-model="item.src" class="admin-input" placeholder="Kép URL" />
              <button class="admin-btn admin-btn--danger admin-btn--sm" @click="removeGalleryItem(i)">Törlés</button>
            </div>
          </div>
          <button class="admin-btn admin-btn--ghost" @click="addGalleryItem">+ Kép hozzáadása</button>
        </section>
      </div>

      <!-- Floating save bar -->
      <div class="admin-save-bar">
        <span v-if="saveMessage" class="admin-save-msg">{{ saveMessage }}</span>
        <button class="admin-btn admin-btn--primary admin-btn--lg" :disabled="saving || loading || !!loadError" @click="handleSave">
          {{ saving ? 'Mentés...' : 'Összes mentése' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Login */
.admin-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.admin-login-card {
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 24rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.admin-login-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 1.5rem;
  text-align: center;
}

.admin-login-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admin-error {
  color: #dc2626;
  font-size: 0.85rem;
  margin: 0;
}

.admin-error--block {
  margin-bottom: 1rem;
}

.admin-info {
  color: #374151;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

/* Header */
.admin-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.admin-header-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.admin-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Content */
.admin-content {
  max-width: 56rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 6rem;
}

/* Sections */
.admin-section {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.admin-section-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

.admin-subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 1.5rem 0 0.75rem;
}

/* Grid */
.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 0.75rem;
}

.admin-grid--tight {
  gap: 0.5rem;
}

/* Fields */
.admin-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.admin-field--full {
  grid-column: 1 / -1;
}

.admin-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.admin-input {
  padding: 0.55rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #111;
  background: #fafafa;
  transition: border-color 0.15s;
}

.admin-input:focus {
  outline: none;
  border-color: #986fdd;
  background: white;
}

.admin-input--flex {
  flex: 1;
}

.admin-textarea {
  padding: 0.55rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #111;
  background: #fafafa;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.15s;
}

.admin-textarea:focus {
  outline: none;
  border-color: #986fdd;
  background: white;
}

/* Rows */
.admin-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.admin-subsection {
  margin-top: 1rem;
}

/* Checkbox */
.admin-checkbox {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: #374151;
  white-space: nowrap;
}

/* Pricing row */
.admin-pricing-row {
  padding: 0.75rem;
  border: 1px solid #f0f0f0;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

/* Buttons */
.admin-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  white-space: nowrap;
}

.admin-btn--primary {
  background: #986fdd;
  color: white;
}

.admin-btn--primary:hover {
  background: #7c54c0;
}

.admin-btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-btn--ghost {
  background: transparent;
  color: #6b7280;
  border: 1px dashed #d1d5db;
}

.admin-btn--ghost:hover {
  border-color: #986fdd;
  color: #986fdd;
}

.admin-btn--danger {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.admin-btn--danger:hover {
  background: #fee2e2;
}

.admin-btn--sm {
  padding: 0.3rem 0.6rem;
  font-size: 0.78rem;
}

.admin-btn--lg {
  padding: 0.65rem 2rem;
  font-size: 0.95rem;
}

/* Gallery */
.admin-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.admin-gallery-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #f0f0f0;
  border-radius: 0.5rem;
}

.admin-gallery-preview {
  aspect-ratio: 1;
  border-radius: 0.4rem;
  overflow: hidden;
  background: #f5f5f5;
}

.admin-gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-gallery-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.8rem;
}


/* Save bar */
.admin-save-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  z-index: 50;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
}

.admin-save-msg {
  font-size: 0.85rem;
  font-weight: 600;
  color: #16a34a;
}
</style>
