<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  address: string
  addressNote?: string
  mapEmbedSrc: string
  mapSearchHref: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function onOverlayClick() {
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-overlay">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50"
        role="presentation"
        @click.self="onOverlayClick"
      >
        <div class="sheet-backdrop" @click="onOverlayClick"></div>

        <Transition name="sheet-panel" appear>
          <div
            v-if="modelValue"
            role="dialog"
            aria-modal="true"
            :aria-label="title ?? 'Címünk'"
            class="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain"
          >
            <div class="sheet-card pb-safe">
              <!-- Top accent gradient -->
              <div class="sheet-accent-line" aria-hidden="true"></div>

              <!-- Drag handle -->
              <div class="flex justify-center pt-3 pb-1" aria-hidden="true">
                <div class="sheet-handle"></div>
              </div>

              <!-- Header -->
              <div class="flex items-center justify-between gap-3 px-5 pt-2 pb-3">
                <h3 class="text-base font-bold text-gray-900">
                  {{ title ?? 'Címünk' }}
                </h3>

                <div class="flex items-center gap-2">
                  <a
                    :href="mapSearchHref"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="sheet-maps-link"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Maps
                  </a>

                  <button
                    aria-label="Bezárás"
                    class="sheet-close-btn"
                    @click="close"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Address -->
              <div class="px-5 pb-4">
                <div class="flex items-start gap-2.5">
                  <span class="sheet-dot" aria-hidden="true"></span>
                  <div>
                    <p class="text-sm font-semibold text-gray-900 leading-snug">{{ address }}</p>
                    <p v-if="addressNote" class="text-xs text-gray-500 mt-1 leading-relaxed">
                      {{ addressNote }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Map -->
              <div class="px-5 pb-5">
                <div class="sheet-map-wrap">
                  <div class="sheet-map-shine" aria-hidden="true"></div>
                  <iframe
                    :src="mapEmbedSrc"
                    class="sheet-map-iframe"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop */
.sheet-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 25, 0.42);
  backdrop-filter: blur(6px);
}

/* Card — frosted white glass matching hero design system */
.sheet-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem 1.5rem 0 0;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-bottom: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 246, 250, 0.94) 100%);
  backdrop-filter: blur(16px);
  box-shadow:
    0 -16px 48px rgba(0, 0, 0, 0.12),
    0 -4px 16px rgba(152, 111, 221, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* Top accent gradient line */
.sheet-accent-line {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(158, 251, 123, 0.5), rgba(152, 111, 221, 0.45));
  filter: blur(0.5px);
}

/* Drag handle bar */
.sheet-handle {
  width: 2.5rem;
  height: 0.22rem;
  border-radius: 9999px;
  background: rgba(152, 111, 221, 0.22);
}

/* Maps link — brand-consistent pill button */
.sheet-maps-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(79, 47, 132, 0.9);
  padding: 0.35rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid rgba(152, 111, 221, 0.25);
  background:
    linear-gradient(135deg, rgba(152, 111, 221, 0.1), rgba(158, 251, 123, 0.1)),
    rgba(255, 255, 255, 0.85);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.sheet-maps-link:hover {
  transform: translateY(-1px);
  background:
    linear-gradient(135deg, rgba(152, 111, 221, 0.18), rgba(158, 251, 123, 0.16)),
    rgba(255, 255, 255, 0.95);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 4px 12px rgba(79, 47, 132, 0.12);
}

.sheet-maps-link:focus-visible {
  outline: 2px solid rgba(152, 111, 221, 0.4);
  outline-offset: 2px;
}

/* Close button — frosted circle like social bubbles */
.sheet-close-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: transform 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.sheet-close-btn:hover {
  color: #111827;
  transform: scale(1.06);
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.sheet-close-btn:focus-visible {
  outline: 2px solid rgba(152, 111, 221, 0.4);
  outline-offset: 2px;
}

/* Address dot — brand gradient */
.sheet-dot {
  flex-shrink: 0;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.35rem;
  border-radius: 9999px;
  background: radial-gradient(circle at 35% 35%, rgba(158, 251, 123, 1), rgba(152, 111, 221, 0.85));
  box-shadow: 0 0 0 3px rgba(158, 251, 123, 0.14);
}

/* Map container — glass card treatment */
.sheet-map-wrap {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.sheet-map-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(130deg, rgba(152, 111, 221, 0.08), transparent 40%),
    linear-gradient(330deg, rgba(158, 251, 123, 0.08), transparent 44%);
}

.sheet-map-iframe {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 300px;
  border: 0;
  filter: saturate(0.92) contrast(1.02);
}

/* Overlay fade */
.sheet-overlay-enter-active,
.sheet-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.sheet-overlay-enter-from,
.sheet-overlay-leave-to {
  opacity: 0;
}

/* Panel slide up */
.sheet-panel-enter-active {
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}
.sheet-panel-leave-active {
  transition: transform 0.22s ease-in;
}
.sheet-panel-enter-from,
.sheet-panel-leave-to {
  transform: translateY(100%);
}

.pb-safe {
  padding-bottom: max(1rem, env(safe-area-inset-bottom, 1rem));
}

@media (min-width: 768px) {
  .sheet-map-iframe {
    height: 540px;
  }
}

@media (max-height: 600px) {
  .sheet-map-iframe {
    height: 200px;
  }
}
</style>
