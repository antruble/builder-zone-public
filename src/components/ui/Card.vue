<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'accent' | 'primary'
type Padding = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    tone?: Tone
    padding?: Padding
    class?: string
  }>(),
  {
    tone: 'default',
    padding: 'md',
  },
)

const toneClasses: Record<Tone, string> = {
  default: 'bg-white/90',
  accent: 'bg-accent/20',
  primary: 'bg-primary/15',
}

const paddingClasses: Record<Padding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const classes = computed(() =>
  cn('rounded-2xl shadow-card', toneClasses[props.tone], paddingClasses[props.padding], props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
