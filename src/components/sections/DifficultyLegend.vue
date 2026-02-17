<script setup lang="ts">
import type { DifficultyLevel } from '@/content/site'

import zaszloImg from '@/assets/img/zaszlo.jpg'
import cipoImg from '@/assets/img/cipo.jpg'
import karImg from '@/assets/img/kar.jpg'
import fogaskerekImg from '@/assets/img/fogaskerek.jpg'
import tuzImg from '@/assets/img/tuz.jpg'
import magnusImg from '@/assets/img/magnus.jpg'

defineProps<{
  levels: readonly DifficultyLevel[]
}>()

const levelStyles: { color: string; img: string }[] = [
  { color: '255, 255, 255', img: zaszloImg },      // fehér
  { color: '66, 133, 244', img: cipoImg },          // kék
  { color: '234, 179, 8', img: karImg },             // sárga
  { color: '76, 175, 100', img: fogaskerekImg },     // zöld
  { color: '220, 50, 50', img: tuzImg },             // piros
  { color: '55, 55, 55', img: magnusImg },           // fekete/sötétszürke
]
</script>

<template>
  <div class="diff-grid">
    <div
      v-for="(level, idx) in levels"
      :key="level.name"
      class="diff-card"
      :style="{
        '--lvl': levelStyles[idx]?.color ?? '120,120,120',
      } as any"
    >
      <div class="diff-card-line" aria-hidden="true"></div>
      <div class="diff-card-inner">
        <div class="diff-header">
          <span class="diff-badge">
            <img
              :src="levelStyles[idx]?.img"
              :alt="level.name"
              class="diff-icon-img"
            />
          </span>
        </div>
        <p class="diff-desc">{{ level.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diff-grid {
  display: grid;
  gap: 0.75rem;
}

.diff-card {
  --lvl: 120, 120, 120;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background:
    linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.95),
      rgba(var(--lvl), 0.045)
    );
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.diff-card:hover {
  transform: translateY(-2px);
  background:
    linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.93),
      rgba(var(--lvl), 0.08)
    );
  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.07),
    0 2px 6px rgba(var(--lvl), 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Top accent line */
.diff-card-line {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 2px;
  border-radius: 9999px;
  background:
    linear-gradient(
      90deg,
      rgba(var(--lvl), 0.15),
      rgba(var(--lvl), 0.45),
      rgba(var(--lvl), 0.15)
    );
}

.diff-card-inner {
  padding: 1.25rem 1.35rem;
}

/* Header row */
.diff-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

/* Icon badge */
.diff-badge {
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgba(var(--lvl), 0.1);
  border: 1px solid rgba(var(--lvl), 0.1);
}

.diff-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

/* Title */
.diff-title-group {
  min-width: 0;
}

.diff-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
}

/* Description */
.diff-desc {
  font-size: 0.8rem;
  line-height: 1.55;
  color: #6b7280;
  margin: 0;
}

/* ── Responsive ── */
@media (min-width: 640px) {
  .diff-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }
}

@media (min-width: 1024px) {
  .diff-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}
</style>
