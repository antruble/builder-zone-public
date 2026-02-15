<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/content/site'
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

    <div class="relative z-10 max-w-6xl mx-auto px-4 hero-inner">
      <div class="hero-top">
        <div class="hero-copy">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {{ site.about.headline }}
          </h1>

          <p class="text-lg md:text-xl text-white/80">
            {{ site.about.bullets[0] }}
          </p>

          <div class="flex flex-wrap gap-4 mt-8">
            <Button variant="primary" size="lg" @click="scrollToSection('kapcsolat')">
              Kapcsolat
            </Button>

            <Button
              variant="outline"
              size="lg"
              class="border-white/30 text-white hover:bg-white/10"
              @click="scrollToSection('arlista')"
            >
              Árlista
            </Button>
          </div>
        </div>

        <aside class="hero-hours" aria-label="Nyitvatartás">
          <div class="flex flex-col items-center gap-8">
            <div class="diamond-wrapper">
              <div class="diamond diamond-schedule">
                <div class="deco-ring deco-ring-schedule"></div>

                <svg class="drip-svg drip-svg--top" viewBox="0 0 200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0,0 L200,0 L200,70 Q170,65 150,80 Q130,95 120,75 Q105,55 90,85 Q75,110 55,78 Q40,60 20,82 Q10,92 0,75 Z"
                    fill="#9EFB7B"
                  />
                </svg>

                <div class="diamond-content">
                  <h3 class="font-bold text-gray-900 text-base mb-2">Nyitvatartás</h3>
                  <div class="space-y-1.5">
                    <div>
                      <p class="text-gray-600 text-xs">{{ site.hours.weekdays.days }}</p>
                      <p class="text-gray-900 font-semibold text-sm">
                        {{ site.hours.weekdays.open }} – {{ site.hours.weekdays.close }}
                      </p>
                    </div>
                    <div>
                      <p class="text-gray-600 text-xs">{{ site.hours.weekend.days }}</p>
                      <p class="text-gray-900 font-semibold text-sm">
                        {{ site.hours.weekend.open }} – {{ site.hours.weekend.close }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social bubbles -->
            <div class="flex items-center justify-center gap-3">
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
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="item.icon" />
                </svg>
              </a>
            </div>
          </div>
        </aside>
      </div>

      <!-- Address pill -->
      <button
        class="address-pill"
        @click="isAddressOpen = true"
      >
        <!-- Organic liquid edge — echoes diamond drip -->
        <svg class="address-pill-liquid" viewBox="0 0 320 28" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="pill-liq" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="rgba(158,251,123,0.22)" />
              <stop offset="35%" stop-color="rgba(152,111,221,0.16)" />
              <stop offset="65%" stop-color="rgba(158,251,123,0.2)" />
              <stop offset="100%" stop-color="rgba(152,111,221,0.14)" />
            </linearGradient>
          </defs>
          <path d="M0,0 L320,0 L320,7 Q285,6 260,11 Q235,17 210,9 Q190,3 170,13 Q150,23 130,10 Q112,1 90,12 Q68,21 48,8 Q30,0 15,9 Q8,14 0,10 Z" fill="url(#pill-liq)" />
        </svg>

        <!-- Ambient accent glow at top -->
        <span class="address-pill-glow" aria-hidden="true"></span>
        <!-- Glass highlight band -->
        <!-- <span class="address-pill-shine" aria-hidden="true"></span> -->

        <!-- Action pod — embedded glass element -->
        <span class="address-pill-action" aria-hidden="true">
          <svg class="address-pill-action-icon" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </span>

        <!-- Content -->
        <span class="address-pill-kicker">Címünk</span>
        <span class="address-pill-address">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
          </svg>
          {{ site.contact.address }}
        </span>
        <span class="address-pill-hint">
          Kattints a térkép megnyitásához
        </span>
      </button>
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
.hero-inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 7rem;
  gap: 3rem;
}

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

.hero-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.hero-copy {
  max-width: 44rem;
}

.hero-hours {
  display: flex;
  justify-content: center;
}

/* Diamond */
.diamond-wrapper {
  position: relative;
  width: 220px;
  height: 220px;
  flex-shrink: 0;
}

.diamond {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 32%;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  background: #f4f3f2;
  box-shadow: 0 8px 32px rgba(158, 251, 123, 0.25);
}

.diamond-wrapper:hover .diamond {
  transform: rotate(45deg) scale(1.04);
  box-shadow: 0 14px 40px rgba(158, 251, 123, 0.35);
}

.diamond-content {
  position: relative;
  z-index: 2;
  transform: rotate(-45deg);
  width: 65%;
  text-align: center;
  overflow: hidden;
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

.drip-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.drip-svg--top {
  z-index: 999;
  transform: translateX(-50%) rotate(-45deg);
  transform-origin: top center;
}

/* Social bubbles */
.social-bubble {
  width: 2.6rem;
  height: 2.6rem;
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

/* ═══════════════════════════════════════════════
   Address pill — diamond-cut glass object
   ═══════════════════════════════════════════════ */
.address-pill {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  isolation: isolate;
  gap: 0.4rem;
  width: 100%;
  max-width: 14.5rem;
  margin: 0 auto;
  /* Extra bottom padding = wedge zone (below the 73% cut line) */
  padding: 1.8rem 1.4rem 1rem;
  background:
    linear-gradient(
      168deg,
      rgba(255, 255, 255, 0.96) 0%,
      rgba(252, 250, 255, 0.93) 40%,
      rgba(245, 248, 243, 0.89) 100%
    );
  backdrop-filter: blur(16px);
  /* Diamond-cut silhouette: peaked top + angled shoulders + flat cut + centered wedge */
  clip-path: polygon(
    /* ───────────── TOP PEAK (diamond csúcs) ───────────── */

    45% 2.5%,   /* bal felső csúcs-váll – elkezdi a diamond csúcs ívét */
    50% 0%,     /* középső csúcs – ez a diamond legfelső pontja */
    55% 2.5%,   /* jobb felső csúcs-váll – szimmetrikus a bal oldallal */

    /* ───────────── RIGHT SIDE (jobb oldali lejtés) ───────────── */

    90% 20%,    /* jobb felső lejtő – diamond felső oldala */
    97% 34%,    /* jobb középső ív – lágyítja az oldalt */
    100% 73%,   /* jobb alsó töréspont – itt ér véget a diamond rész */

    /* ───────────── FLAT BOTTOM (lapos alj, háromszög nélkül) ───────────── */

    100% 100%,  /* jobb alsó sarok – teljesen lemegy a container aljáig */
    0% 100%,    /* bal alsó sarok – lapos vízszintes aljat hoz létre */

    /* ───────────── LEFT SIDE (bal oldali lejtés) ───────────── */

    0% 73%,     /* bal alsó töréspont – szimmetrikus a jobb oldallal */
    3% 34%,     /* bal középső ív – lágyítja az oldalt */
    10% 20%     /* bal felső lejtő – visszatér a csúcshoz */
  );

  filter:
    drop-shadow(0 -4px 14px rgba(0, 0, 0, 0.12))
    drop-shadow(0 -1px 6px rgba(152, 111, 221, 0.05));
  cursor: pointer;
  transition:
    filter 0.3s ease,
    transform 0.3s ease;
}

/* Neon "belső margó" a felső éleken */
.address-pill::before {
  content: "";
  position: absolute;
  /* beljebb húzzuk, hogy "inner margin" legyen */
  inset: 6px 6px 22px 6px;

  /* ugyanaz a forma, mint a fő elemé */
  clip-path: inherit;

  pointer-events: none;
  z-index: 0;

  /* neon glow: erős felül, finoman kifut lefelé */
  background: linear-gradient(
    to bottom,
    rgba(158, 251, 123, 0.95) 0%,
    rgba(158, 251, 123, 0.55) 18%,
    rgba(158, 251, 123, 0.22) 36%,
    rgba(158, 251, 123, 0.08) 52%,
    transparent 70%
  );

  filter: blur(7px);
  opacity: 0.75;
}

/* Biztosítsuk, hogy a tartalom a neon fölött legyen */
.address-pill > * {
  position: relative;
  z-index: 1;
}

.address-pill:hover::before {
  opacity: 0.95;
  filter: blur(8px);
}

.address-pill:hover {
  /* transform: translateY(-1px); */
  filter:
    drop-shadow(0 -6px 20px rgba(0, 0, 0, 0.16))
    drop-shadow(0 -2px 8px rgba(152, 111, 221, 0.08));
}

.address-pill:focus-visible {
  /* clip-path hides outline, use drop-shadow as focus indicator */
  filter:
    drop-shadow(0 0 0 2px rgba(158, 251, 123, 0.6))
    drop-shadow(0 -4px 14px rgba(0, 0, 0, 0.12));
}

/* ── Liquid drip edge — follows diamond peak ── */
.address-pill-liquid {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 28px;
  pointer-events: none;
  opacity: 0.55;
  filter: blur(0.3px);
  transition: opacity 0.35s ease;
}

.address-pill:hover .address-pill-liquid {
  opacity: 0.9;
}

/* ── Ambient accent glow — inside the peak zone ── */
.address-pill-glow {
  position: absolute;
  top: 4%;
  left: 25%;
  right: 25%;
  height: 12px;
  border-radius: 9999px;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 100% 100% at 50% 100%,
      rgba(158, 251, 123, 0.1) 0%,
      rgba(152, 111, 221, 0.05) 60%,
      transparent 100%
    );
  filter: blur(3px);
  transition: opacity 0.3s ease;
}

.address-pill:hover .address-pill-glow {
  opacity: 1.3;
}

/* ── Glass highlight band ── */
.address-pill-shine {
  position: absolute;
  top: 18%;
  left: 15%;
  right: 15%;
  height: 1px;
  pointer-events: none;
  border-radius: 9999px;
  background:
    linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.6) 25%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.6) 75%,
      transparent 100%
    );
  opacity: 0.65;
  transition: opacity 0.3s ease;
}

.address-pill:hover .address-pill-shine {
  opacity: 1;
}

/* ── Action pod — embedded glass micro-element ── */
.address-pill-action {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(91, 57, 148, 0.6);
  background:
    radial-gradient(
      ellipse at 40% 35%,
      rgba(255, 255, 255, 0.8),
      rgba(248, 245, 252, 0.5)
    );
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow:
    0 1px 4px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition:
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.address-pill-action-icon {
  width: 0.8rem;
  height: 0.8rem;
}

.address-pill:hover .address-pill-action {
  color: rgba(91, 57, 148, 0.85);
  transform: translateY(-1px);
  box-shadow:
    0 2px 8px rgba(152, 111, 221, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* ── Kicker ── */
.address-pill-kicker {
  display: block;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-align: center;
  color: rgba(91, 57, 148, 0.5);
  margin-top: 0.1rem;
}

/* ── Address text ── */
.address-pill-address {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  line-height: 1.35;
}

/* ── Helper hint ── */
.address-pill-hint {
  display: block;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(91, 57, 148, 0.38);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  margin-top: 0.05rem;
  transition: color 0.25s ease;
}

.address-pill:hover .address-pill-hint {
  color: rgba(91, 57, 148, 0.58);
}

@media (min-width: 768px) {
  .hero-inner {
    padding-top: 7.5rem;
  }

  .hero-top {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 2.8rem;
  }

  .hero-hours {
    justify-content: flex-end;
  }

  .diamond-wrapper {
    width: 240px;
    height: 240px;
  }
}

@media (min-width: 1024px) {
  .hero-inner {
    padding-top: 10rem;
  }

  .diamond-wrapper {
    width: 260px;
    height: 260px;
  }

   .address-pill-kicker {
    font-size: 0.62rem;
  }

  .address-pill-address {
    font-size: 0.9rem;
  }

  .address-pill-hint {
    font-size: 0.7rem;
  }

  .address-pill-action {
    width: 2rem;
    height: 2rem;
  }

  .address-pill-action-icon {
    width: 0.9rem;
    height: 0.9rem;
  }
}

@media (max-width: 640px) {
  .hero-ambient {
    filter: blur(38px);
    opacity: 0.52;
  }
}
</style>
