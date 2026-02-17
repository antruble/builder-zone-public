<script setup lang="ts">
import { ref, inject } from 'vue'
import { siteContentKey } from '@/composables/useSiteContent'
import { site as defaults } from '@/content/site'

const site = inject(siteContentKey, defaults)
import Button from '@/components/ui/Button.vue'
import AddressSheet from '@/components/ui/AddressSheet.vue'
import heroBg from '@/assets/img/hero-bg.jpg'

const isAddressOpen = ref(false)

function scrollToSection(id: string) {
  const section = document.getElementById(id)

  if (!section) return

  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

const socialItems = [
  {
    name: 'Instagram',
    href: site.contact.socialLinks[0] ?? '',
    icon:
      'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    name: 'Facebook',
    href: site.contact.socialLinks[1] ?? '',
    icon:
      'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'TikTok',
    href: site.contact.socialLinks[2] ?? '',
    icon:
      'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z',
  },
]

function onSocialClick(event: MouseEvent, href: string) {
  if (href) return
  event.preventDefault()
}

const mapQuery = encodeURIComponent(site.contact.address)
const mapEmbedFallback = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`
const mapEmbedSrc = site.contact.mapLink?.trim() ? site.contact.mapLink : mapEmbedFallback
const mapSearchHref = site.contact.mapLink?.trim()
  ? site.contact.mapLink
  : `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
</script>

<template>
  <section id="hero" class="scroll-mt-28 relative min-h-screen overflow-hidden">
    <img :src="heroBg" alt="" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-linear-to-b from-slate-950/35 via-slate-900/48 to-slate-900/76"></div>
    <div class="hero-ambient hero-ambient-primary" aria-hidden="true"></div>
    <div class="hero-ambient hero-ambient-accent" aria-hidden="true"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 hero-grid-outer">
      <div class="hero-grid">
        <!-- Cell 1: Title + bullet — top-left -->
        <div class="hero-cell hero-cell--copy">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {{ site.about.headline }}
          </h1>
          <p class="text-xl md:text-3xl text-white/80">
            {{ site.about.bullets[0] }}
          </p>
        </div>

        <!-- Cell 2: Nyitvatartás — top-right -->
        <div class="hero-cell hero-cell--hours">
          <div class="diamond-wrapper">
            <div class="diamond diamond-schedule">
              <div class="deco-ring deco-ring-schedule"></div>
              <div class="diamond-content">
                <h3 class="font-bold text-gray-900 text-lg mb-2">Nyitvatartás</h3>
                <div class="space-y-1.5">
                  <div>
                    <p class="text-gray-600 text-sm">{{ site.hours.weekdays.days }}</p>
                    <p class="text-gray-900 font-semibold text-base">
                      {{ site.hours.weekdays.open }} – {{ site.hours.weekdays.close }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-600 text-sm">{{ site.hours.weekend.days }}</p>
                    <p class="text-gray-900 font-semibold text-base">
                      {{ site.hours.weekend.open }} – {{ site.hours.weekend.close }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cell 3: Socials — bottom-left -->
        <div class="hero-cell hero-cell--socials">
          <div class="hero-socials">
            <a
              v-for="(item, i) in socialItems"
              :key="i"
              :href="item.href || '#'"
              :aria-label="item.name"
              :class="[
                'social-bubble',
                !item.href && 'opacity-50 cursor-not-allowed',
              ]"
              :tabindex="item.href ? 0 : -1"
              :target="item.href ? '_blank' : undefined"
              :rel="item.href ? 'noopener noreferrer' : undefined"
              @click="onSocialClick($event, item.href)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="item.icon" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Cell 4: Address — bottom-right -->
        <div class="hero-cell hero-cell--address">
          <button class="diamond-wrapper diamond-wrapper--address" @click="isAddressOpen = true">
            <div class="diamond diamond-address">
              <div class="deco-ring deco-ring-address"></div>
              <div class="diamond-content">
                <span class="address-arrow" aria-hidden="true">
                  <svg fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </span>
                <h3 class="font-bold text-gray-900 text-lg mb-2">Címünk</h3>
                <span class="address-pill-address">
                  {{ site.contact.address }}
                </span>
                <span class="address-pill-hint">
                  Kattints a térkép megnyitásához
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <AddressSheet
      v-model="isAddressOpen"
      :address="site.contact.address"
      :address-note="site.contact.addressNote"
      :map-embed-src="mapEmbedSrc"
      :map-search-href="mapSearchHref"
    />
  </section>
</template>

<style scoped>
/* ── Outer wrapper — full viewport ── */
.hero-grid-outer {
  min-height: 100vh;
  display: flex;
  padding-top: 6rem;
  padding-bottom: 2rem;
}

/* ── 2×2 Grid ── */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  width: 100%;
}

/* Mobile order: title(1), hours(2), address(3), socials(4) */
.hero-cell--copy    { order: 1; }
.hero-cell--hours   { order: 2; }
.hero-cell--address { order: 3; }
.hero-cell--socials { order: 4; }

/* Cell alignment */
.hero-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-cell--copy {
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

/* ── Ambient blurs ── */
.hero-ambient {
  position: absolute;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(48px);
  opacity: 0.65;
}

.hero-ambient-primary {
  width: 36rem;
  height: 36rem;
  top: -10rem;
  right: -12rem;
  background:
    radial-gradient(circle at 30% 30%, rgba(152, 111, 221, 0.48) 0%, rgba(152, 111, 221, 0.06) 66%),
    radial-gradient(circle at 65% 70%, rgba(158, 251, 123, 0.24) 0%, rgba(158, 251, 123, 0) 72%);
}

.hero-ambient-accent {
  width: 30rem;
  height: 30rem;
  bottom: -12rem;
  left: -10rem;
  background:
    radial-gradient(circle at 40% 40%, rgba(158, 251, 123, 0.35) 0%, rgba(158, 251, 123, 0.06) 68%),
    radial-gradient(circle at 60% 60%, rgba(152, 111, 221, 0.25) 0%, rgba(152, 111, 221, 0) 74%);
}

/* ── Diamond ── */
.diamond-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  isolation: isolate;
}

.diamond-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 32%;
  background: var(--bz-primary);
  transform: rotate(8deg);
  z-index: -1;

  transform-origin: center;
  transform: translate(0px, 0px) scale(1.12) rotate(8deg);

  filter: blur(0px);
  opacity: 0.9;
  transition: transform 0.35s ease, opacity 0.35s ease;
  will-change: transform;
}

.diamond-wrapper:hover::before {
  transform: translate(2px, 2px) scale(1.16) rotate(12deg);
  opacity: 1;
}

.diamond {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 32%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  background: #f4f3f2;
  box-shadow: 0 8px 32px rgba(158, 251, 123, 0.25);
}

.diamond-wrapper:hover .diamond {
  box-shadow: 0 14px 40px rgba(158, 251, 123, 0.35);
}

.diamond-content {
  position: relative;
  z-index: 2;
  width: 65%;
  text-align: center;
}

.deco-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  pointer-events: none;
}

.deco-ring-schedule {
  width: 85%;
  height: 85%;
  transform: translate(-50%, -50%);
  border: 3px solid var(--bz-primary);
}

/* ── Social bubbles ── */
.hero-socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.social-bubble {
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.social-bubble svg {
  width: 1.6rem;
  height: 1.6rem;
}

.social-bubble:not(.opacity-50):hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.96);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.social-bubble:focus-visible {
  outline: 2px solid rgba(158, 251, 123, 0.65);
  outline-offset: 2px;
}

/* ── Address card ── */
.diamond-wrapper--address {
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
}

.diamond-wrapper--address::before {
  background: var(--bz-accent);
  transform: translate(0px, 0px) scale(1.12) rotate(-8deg);
}

.diamond-wrapper--address:hover::before {
  transform: translate(2px, 2px) scale(1.16) rotate(-12deg);
  opacity: 1;
}

.diamond-address {
  background: #f4f3f2;
  box-shadow: 0 8px 32px rgba(158, 251, 123, 0.25);
}

.diamond-wrapper--address:hover .diamond-address {
  box-shadow: 0 14px 40px rgba(158, 251, 123, 0.35);
}

.diamond-wrapper--address:focus-visible .diamond-address {
  outline: 2px solid rgba(158, 251, 123, 0.65);
  outline-offset: 4px;
}

.deco-ring-address {
  width: 85%;
  height: 85%;
  transform: translate(-50%, -50%);
  border: 3px solid var(--bz-accent);
}

.address-pill-address {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  line-height: 1.35;
}

.address-pill-hint {
  display: block;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(107, 114, 128, 0.7);
  text-align: center;
  margin-top: 0.25rem;
  transition: color 0.25s ease;
}

.diamond-wrapper--address:hover .address-pill-hint {
  color: rgba(107, 114, 128, 1);
}

/* ── Up arrow ── */
.address-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 auto 0.4rem;
  border-radius: 50%;
  color: rgba(107, 114, 128, 0.5);
  background: rgba(0, 0, 0, 0.04);
  transition: color 0.25s ease, transform 0.25s ease;
}

.address-arrow svg {
  width: 0.85rem;
  height: 0.85rem;
}

.diamond-wrapper--address:hover .address-arrow {
  color: rgba(107, 114, 128, 0.85);
  transform: translateY(-2px);
}

/* ── Desktop: 2×2 grid ── */
@media (min-width: 768px) {
  .hero-grid-outer {
    padding-top: 7.5rem;
  }

  .hero-grid {
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr 1fr;
    gap: 3rem;
  }

  /* Reset mobile order */
  .hero-cell--copy    { order: unset; }
  .hero-cell--hours   { order: unset; }
  .hero-cell--socials { order: unset; }
  .hero-cell--address { order: unset; }

  /* Row 1: copy + hours */
  .hero-cell--copy {
    align-self: self-end;
  }

  .hero-cell--hours {
    align-self: center;
  }

  /* Row 2: socials + address */
  .hero-cell--socials {
    align-self: self-end;
    padding-bottom: 6rem;
    justify-content: start;
  }

  .hero-cell--address {
    align-self:baseline;
  }

  .diamond-wrapper {
    width: 230px;
    height: 230px;
  }

  .hero-socials {
    gap: 2rem;
    margin-left: 2rem;
  }

  .social-bubble {
    width: 4.5rem;
    height: 4.5rem;
  }

  .social-bubble svg {
    width: 1.8rem;
    height: 1.8rem;
  }
}

@media (min-width: 1024px) {
  .hero-grid-outer {
    padding-top: 10rem;
  }

  .hero-grid {
    gap: 3.5rem;
  }

  .diamond-wrapper {
    width: 260px;
    height: 260px;
  }

  .address-pill-address {
    font-size: 0.9rem;
  }

  .address-pill-hint {
    font-size: 0.7rem;
  }

  .social-bubble {
    width: 6rem;
    height: 6rem;
  }

  .social-bubble svg {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (max-width: 640px) {
  .hero-ambient {
    filter: blur(38px);
    opacity: 0.52;
  }
}
</style>
