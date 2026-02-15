<script setup lang="ts">
import type { DifficultyLevel } from '@/content/site'

defineProps<{
  levels: DifficultyLevel[]
}>()

// Minimal inline SVG paths mapped by level name
const icons: Record<string, string> = {
  Rajtzászló:
    'M5 3v18M5 3h9l-1.5 4L14 11H5',
  'Mászó cipőnyomok':
    'M8 21h2l1-3h2l1 3h2M9 18l-1-5 2-3 2 1 2-1 2 3-1 5',
  'Feszített bicepszes kar':
    'M7 17l2-4 3 2 3-6 2 1M5 20a8 8 0 0 1 2-12M17 8a4 4 0 0 1 0 8',
  Fogaskerék:
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41',
  Tűz:
    'M12 2c.5 4-3 6-3 10a5 5 0 0 0 10 0c0-4-3-5.5-3-10M10 15a2 2 0 0 0 4 0c0-2-2-3-2-5s2 3 2 5',
  'Magnus Midtbo':
    'M2 18l4-8 4 4 4-10 4 10 4-4 4 8H2z',
}

// Difficulty color scale: mint → teal → blue → indigo → amber → crimson
const levelStyles = [
  { color: '76, 175, 100',  label: 'Kezdő' },        // soft green
  { color: '56, 166, 155',  label: 'Haladó kezdő' },  // teal
  { color: '66, 133, 200',  label: 'Középhaladó' },   // blue
  { color: '100, 80, 180',  label: 'Haladó' },        // indigo
  { color: '210, 130, 50',  label: 'Tapasztalt' },     // amber
  { color: '190, 50, 70',   label: 'Elit' },           // crimson
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
            <svg
              class="diff-icon"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <path :d="icons[level.name] ?? 'M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z'" />
            </svg>
          </span>
          <div class="diff-title-group">
            <h3 class="diff-name">{{ level.name }}</h3>
          </div>
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
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--lvl), 0.1);
  border: 1px solid rgba(var(--lvl), 0.1);
}

.diff-icon {
  width: 1.15rem;
  height: 1.15rem;
  color: rgba(var(--lvl), 1);
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
