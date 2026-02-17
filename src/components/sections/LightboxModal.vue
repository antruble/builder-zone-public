<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import type { GalleryItem } from '@/content/gallery'

const props = defineProps<{
  isOpen: boolean
  items: readonly GalleryItem[]
  index: number
}>()

const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()

function onKeydown(e: KeyboardEvent) {
  if (!props.isOpen) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') emit('prev')
  if (e.key === 'ArrowRight') emit('next')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Lock body scroll when open
watch(
  () => props.isOpen,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  },
)

const gradients = [
  'from-primary/30 to-accent/20',
  'from-accent/30 to-primary/20',
  'from-primary/20 to-gray-400/20',
  'from-accent/20 to-gray-400/20',
]

function gradientFor(idx: number): string {
  return gradients[idx % gradients.length] ?? 'from-primary/30 to-accent/20'
}

const current = computed<GalleryItem | undefined>(() => props.items[props.index])
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        :aria-label="`Galéria: ${current?.alt ?? ''}`"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/80" @click="emit('close')"></div>

        <!-- Content -->
        <div class="relative z-10 flex items-center gap-2 px-4 max-w-4xl w-full">
          <!-- Prev -->
          <button
            class="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Előző kép"
            @click="emit('prev')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Image / Placeholder -->
          <div class="flex-1 flex flex-col items-center">
            <div class="w-full aspect-4/3 rounded-2xl overflow-hidden">
              <img
                v-if="current?.src"
                :src="current.src"
                :alt="current.alt"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                :class="[
                  'w-full h-full flex flex-col items-center justify-center bg-linear-to-br',
                  gradientFor(index),
                ]"
              >
                <svg class="w-12 h-12 text-white/60 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
                </svg>
                <p class="text-white/80 font-medium">Fotó hamarosan</p>
              </div>
            </div>

            <!-- Caption -->
            <p class="mt-3 text-sm text-white/70 text-center">
              {{ current?.alt }} — {{ index + 1 }} / {{ items.length }}
            </p>
          </div>

          <!-- Next -->
          <button
            class="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Következő kép"
            @click="emit('next')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Bezárás"
          @click="emit('close')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
