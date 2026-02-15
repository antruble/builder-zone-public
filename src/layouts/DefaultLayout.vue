<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { site } from '@/content/site'
import logo from '@/assets/img/logo.jpeg'

const menuOpen = ref(false)
const isScrolled = ref(false)
const isMobile = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

function updateIsMobile() {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
}

onMounted(() => {
  updateIsMobile()

  const media = window.matchMedia('(max-width: 767px)')
  media.addEventListener('change', updateIsMobile)

  onUnmounted(() => {
    media.removeEventListener('change', updateIsMobile)
  })
})

function handleNavClick(href: string) {
  menuOpen.value = false

  if (!href.startsWith('#')) return

  const id = href.slice(1)
  const section = document.getElementById(id)

  if (!section) return

  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', href)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  if (window.location.hash) {
    requestAnimationFrame(() => handleNavClick(window.location.hash))
  }
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg">
    <header
      :class="[
        'fixed left-0 right-0 z-50 transition-all duration-300 ease-out',
        isScrolled && !isMobile ? 'top-0' : 'top-4 md:top-6',
      ]"
    >
      <div
        :class="[
          'transition-all duration-300 ease-out backdrop-blur-lg',
          isScrolled && !isMobile
            ? 'mx-3 md:mx-auto md:max-w-6xl rounded-b-3xl bg-white shadow-md border-b border-gray-200/60'
            : 'mx-3 md:mx-auto md:max-w-6xl rounded-3xl bg-white shadow-card border border-white/40',
        ]"
      >
        <nav
          :class="[
            'flex items-center justify-between transition-all duration-300',
            isScrolled && !isMobile
              ? 'max-w-6xl mx-auto px-4 h-14'
              : 'px-5 md:px-6 h-16',
          ]"
        >
          <a
            href="#hero"
            class="flex items-center gap-2 shrink-0 h-full"
            @click.prevent="handleNavClick('#hero')"
          >
            <!-- <span class="text-lg font-bold text-gray-900 tracking-tight uppercase">Boulder Zóna</span> -->
            <img :src="logo" alt="" class="h-full max-h-full w-auto object-contain" />
          </a>

          <div
            :class="[
              'hidden md:flex items-center gap-1 bg-primary/90 rounded-2xl transition-all duration-300',
              isScrolled ? 'px-4 py-2' : 'px-5 py-2.5',
            ]"
          >
            <a
              v-for="item in site.nav.items"
              :key="item.href"
              :href="item.href"
              class="px-3 py-1 text-sm font-medium text-white/80 hover:text-white rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              @click.prevent="handleNavClick(item.href)"
            >
              {{ item.label }}
            </a>
          </div>

          <button
            class="md:hidden p-2 text-gray-700 rounded-lg hover:bg-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Menü megnyitása"
            @click="menuOpen = !menuOpen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!menuOpen"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </nav>

        <Transition name="menu">
          <div
            v-if="menuOpen"
            class="md:hidden border-t border-gray-200/50 px-4 py-3 space-y-1"
          >
            <a
              v-for="item in site.nav.items"
              :key="item.href"
              :href="item.href"
              class="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-black/5 rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              @click.prevent="handleNavClick(item.href)"
            >
              {{ item.label }}
            </a>
          </div>
        </Transition>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer id="kapcsolat" class="footer scroll-mt-28">
      <div class="footer-accent-line" aria-hidden="true"></div>
      <div class="footer-inner">
        <div class="footer-grid">
          <!-- Brand column -->
          <div class="footer-col">
            <p class="footer-brand">{{ site.contact.name }}</p>
            <p class="footer-text">{{ site.contact.address }}</p>
            <p class="footer-text footer-text--note">{{ site.contact.addressNote }}</p>
          </div>

          <!-- Hours column -->
          <div class="footer-col">
            <p class="footer-label">Nyitvatartás</p>
            <p class="footer-text">{{ site.hours.weekdays.days }}: {{ site.hours.weekdays.open }} – {{ site.hours.weekdays.close }}</p>
            <p class="footer-text">{{ site.hours.weekend.days }}: {{ site.hours.weekend.open }} – {{ site.hours.weekend.close }}</p>
          </div>

          <!-- Contact column -->
          <div class="footer-col">
            <p class="footer-label">Elérhetőség</p>
            <p>
              <a :href="`mailto:${site.contact.email}`" class="footer-link">
                {{ site.contact.email }}
              </a>
            </p>
            <div class="footer-phones">
              <a
                v-for="phone in site.contact.phones"
                :key="phone"
                :href="`tel:${phone}`"
                class="footer-link"
              >
                {{ phone }}
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span class="footer-copyright">&copy; {{ new Date().getFullYear() }} {{ site.contact.name }}</span>
          <span class="footer-dot" aria-hidden="true"></span>
          <span class="footer-tagline">Boulder terem Debrecenben</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Footer ── */
.footer {
  position: relative;
  background:
    linear-gradient(
      180deg,
      rgba(158, 251, 123, 0.155) 0%,
      rgba(158, 251, 123, 0.125) 50%,
      rgba(152, 111, 221, 0.105) 100%
    ),
    #fafbfa;
}

.footer-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    rgba(158, 251, 123, 0.35),
    rgba(152, 111, 221, 0.3)
  );
}

.footer-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 3rem 1rem 2rem;
}

.footer-grid {
  display: grid;
  gap: 2rem;
}

/* Columns */
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-brand {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.15rem;
}

.footer-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(91, 57, 148, 0.6);
  margin: 0 0 0.25rem;
}

.footer-text {
  font-size: 0.88rem;
  color: #6b7280;
  line-height: 1.55;
  margin: 0;
}

.footer-text--note {
  font-size: 0.8rem;
  color: #9ca3af;
}

/* Links */
.footer-link {
  font-size: 0.88rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: rgba(91, 57, 148, 0.85);
}

.footer-phones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* Bottom bar */
.footer-bottom {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.footer-copyright {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
}

.footer-dot {
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(158, 251, 123, 0.8),
    rgba(152, 111, 221, 0.6)
  );
  flex-shrink: 0;
}

.footer-tagline {
  font-size: 0.75rem;
  color: #b0b5bd;
  font-weight: 500;
}

/* ── Responsive ── */
@media (min-width: 768px) {
  .footer-inner {
    padding: 3.5rem 1.5rem 2.25rem;
  }

  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
}
</style>

