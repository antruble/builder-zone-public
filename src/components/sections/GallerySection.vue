<script setup lang="ts">
import type { GalleryItem } from '@/content/gallery'
import Container from '@/components/ui/Container.vue'

defineProps<{
  items: GalleryItem[]
}>()

const emit = defineEmits<{
  open: [index: number]
}>()

const gradients = [
  'linear-gradient(135deg, rgba(152,111,221,0.18), rgba(158,251,123,0.12))',
  'linear-gradient(135deg, rgba(158,251,123,0.16), rgba(152,111,221,0.1))',
  'linear-gradient(135deg, rgba(152,111,221,0.12), rgba(200,200,210,0.14))',
  'linear-gradient(135deg, rgba(158,251,123,0.1), rgba(200,200,210,0.12))',
]

function gradientFor(idx: number) {
  return gradients[idx % gradients.length]
}
</script>

<template>
  <section id="galeria" class="scroll-mt-28 gallery-section section-neutral">
    <Container>
      <!-- Header -->
      <div class="gallery-header">
        <span class="gallery-kicker">Galéria</span>
        <h2 class="gallery-title">Nézz körül a termünkben</h2>
        <div class="gallery-chip">
          <span class="gallery-chip-dot" aria-hidden="true"></span>
          <span class="gallery-chip-text">Fotók hamarosan frissülnek</span>
        </div>
      </div>

      <!-- Grid -->
      <div class="gallery-grid">
        <button
          v-for="(item, idx) in items"
          :key="item.id"
          :class="['gallery-tile', idx === 0 && 'gallery-tile--featured']"
          @click="emit('open', idx)"
        >
          <div class="gallery-tile-inner">
            <!-- Image -->
            <img
              v-if="item.src"
              :src="item.src"
              :alt="item.alt"
              class="gallery-tile-img"
            />

            <!-- Placeholder -->
            <div
              v-else
              class="gallery-tile-placeholder"
              :style="{ background: gradientFor(idx) }"
            >
              <svg class="gallery-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
              </svg>
            </div>

            <!-- Hover overlay -->
            <div class="gallery-tile-overlay">
              <span class="gallery-tile-caption">{{ item.alt }}</span>
            </div>

            <!-- Shine -->
            <div class="gallery-tile-shine" aria-hidden="true"></div>
          </div>
        </button>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.gallery-section {
  position: relative;
  padding: 5rem 0 4.5rem;
}

/* Header */
.gallery-header {
  margin-bottom: 2rem;
}

.gallery-kicker {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(91, 57, 148, 0.75);
  margin-bottom: 0.75rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  background: rgba(152, 111, 221, 0.08);
  border: 1px solid rgba(152, 111, 221, 0.12);
}

.gallery-title {
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.35;
  color: #111827;
  letter-spacing: -0.01em;
  margin: 0 0 0.75rem;
}

.gallery-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.6rem 0.2rem 0.4rem;
  border-radius: 9999px;
  background: rgba(158, 251, 123, 0.08);
  border: 1px solid rgba(158, 251, 123, 0.15);
}

.gallery-chip-dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(158, 251, 123, 1),
    rgba(152, 111, 221, 0.8)
  );
}

.gallery-chip-text {
  font-size: 0.68rem;
  font-weight: 600;
  color: rgba(50, 87, 24, 0.7);
  letter-spacing: 0.02em;
}

/* Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

/* Tile */
.gallery-tile {
  position: relative;
  display: block;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: none;
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.gallery-tile:hover {
  transform: translateY(-3px);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(152, 111, 221, 0.06);
}

.gallery-tile:focus-visible {
  outline: 2px solid rgba(158, 251, 123, 0.65);
  outline-offset: 2px;
}

/* Inner wrapper */
.gallery-tile-inner {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: inherit;
}

/* Featured tile — spans 2 cols on md+, wider aspect */
.gallery-tile--featured .gallery-tile-inner {
  aspect-ratio: 1;
}

/* Image */
.gallery-tile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Placeholder */
.gallery-tile-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-placeholder-icon {
  width: 1.8rem;
  height: 1.8rem;
  color: rgba(107, 114, 128, 0.3);
}

/* Hover overlay */
.gallery-tile-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(15, 15, 25, 0) 50%
  );
  transition: background 0.3s ease;
}

.gallery-tile:hover .gallery-tile-overlay {
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(15, 15, 25, 0.45) 100%
  );
}

.gallery-tile-caption {
  display: block;
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0);
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.01em;
}

.gallery-tile:hover .gallery-tile-caption {
  color: rgba(255, 255, 255, 0.92);
}

/* Shine (top-left corner glint) */
.gallery-tile-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06) 0%,
    transparent 100%
  );
  border-radius: inherit;
}

/* ── Responsive ── */
@media (min-width: 768px) {
  .gallery-section {
    padding: 6rem 0 5.5rem;
  }

  .gallery-title {
    font-size: 1.75rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .gallery-tile--featured {
    grid-column: span 2;
    grid-row: span 2;
  }

  .gallery-tile--featured .gallery-tile-inner {
    aspect-ratio: auto;
    height: 100%;
  }

  .gallery-tile-caption {
    padding: 0.65rem 0.85rem;
    font-size: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .gallery-section {
    padding: 7rem 0 6rem;
  }

  .gallery-title {
    font-size: 1.85rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .gallery-tile {
    border-radius: 1.1rem;
  }

  .gallery-placeholder-icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
