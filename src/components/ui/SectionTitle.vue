<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(
  defineProps<{
    kicker: string
    title?: string
    align?: 'left' | 'center'
    class?: string
  }>(),
  { align: 'left' },
)

const rootClass = computed(() =>
  cn('section-title', props.align === 'center' && 'section-title--center', props.class),
)
</script>

<template>
  <div :class="rootClass">
    <h2 class="section-title-kicker">{{ kicker }}</h2>
    <div class="section-title-line" aria-hidden="true"></div>
    <p v-if="title" class="section-title-sub">{{ title }}</p>
  </div>
</template>

<style scoped>
.section-title {
  margin-bottom: 2.5rem;
}

.section-title-kicker {
  display: block;
  font-size: 2.75rem;
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1;
  margin: 0 0 0.6rem;
  background: linear-gradient(130deg, #0f172a 20%, rgba(91, 57, 148, 0.88) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title-line {
  width: 2.75rem;
  height: 3px;
  border-radius: 9999px;
  margin-bottom: 0.8rem;
  background: linear-gradient(90deg, rgba(158, 251, 123, 0.85), rgba(152, 111, 221, 0.65));
}

.section-title-sub {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
  max-width: 44rem;
}

/* Center variant */
.section-title--center {
  text-align: center;
}
.section-title--center .section-title-line {
  margin-left: auto;
  margin-right: auto;
}
.section-title--center .section-title-sub {
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .section-title-kicker {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .section-title-kicker {
    font-size: 4.25rem;
  }
}
</style>
