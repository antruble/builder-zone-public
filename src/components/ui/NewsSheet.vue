<script setup lang="ts">
import { computed } from 'vue'
import type { NewsItem } from '@/content/news'

const props = defineProps<{
  modelValue: boolean
  item: NewsItem | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${y}.${m}.${d}.`
}

const formattedDate = computed(() => (props.item ? formatDate(props.item.date) : ''))
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="modelValue && item" class="sheet-overlay" @click.self="close">
        <div class="sheet-card" role="dialog" aria-modal="true">
          <!-- Handle -->
          <div class="sheet-handle" aria-hidden="true"></div>

          <!-- Header -->
          <div class="sheet-header">
            <span class="sheet-date">{{ formattedDate }}</span>
            <button class="sheet-close" aria-label="Bezárás" @click="close">✕</button>
          </div>

          <!-- Scrollable content -->
          <div class="sheet-body">
            <h2 class="sheet-title">{{ item.title }}</h2>
            <p v-if="item.subtitle" class="sheet-subtitle">{{ item.subtitle }}</p>

            <p class="sheet-text">{{ item.body }}</p>

            <!-- Images grid -->
            <div v-if="item.images && item.images.length > 0" class="sheet-images">
              <img
                v-for="(src, i) in item.images"
                :key="i"
                :src="src"
                :alt="`${item.title} – kép ${i + 1}`"
                class="sheet-image"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: flex-end;
}

.sheet-card {
  width: 100%;
  max-height: 88vh;
  background: white;
  border-radius: 1.5rem 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.18);
}

.sheet-handle {
  width: 2.5rem;
  height: 0.28rem;
  border-radius: 9999px;
  background: #e5e7eb;
  margin: 0.75rem auto 0;
  flex-shrink: 0;
}

.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem 0;
  flex-shrink: 0;
}

.sheet-date {
  font-size: 0.78rem;
  font-weight: 500;
  color: #9ca3af;
}

.sheet-close {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.sheet-close:hover {
  background: #e5e7eb;
}

.sheet-body {
  padding: 0.75rem 1.25rem 2rem;
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
}

.sheet-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
  margin: 0 0 0.4rem;
}

.sheet-subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 1.25rem;
  line-height: 1.5;
}

.sheet-text {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #374151;
  white-space: pre-line;
  margin: 0 0 1.5rem;
}

.sheet-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.sheet-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 0.65rem;
}

/* Transition */
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.22s ease;
}

.sheet-enter-active .sheet-card,
.sheet-leave-active .sheet-card {
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from .sheet-card,
.sheet-leave-to .sheet-card {
  transform: translateY(100%);
}

@media (min-width: 640px) {
  .sheet-overlay {
    align-items: center;
    justify-content: center;
  }

  .sheet-card {
    width: 100%;
    max-width: 38rem;
    max-height: 85vh;
    border-radius: 1.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);
  }

  .sheet-body {
    padding: 1rem 2rem 2.5rem;
  }

  .sheet-header {
    padding: 0.75rem 2rem 0;
  }
}
</style>
