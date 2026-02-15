<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'primary' | 'accent'
type Size = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    tone?: Tone
    size?: Size
    class?: string
  }>(),
  {
    tone: 'default',
    size: 'sm',
  },
)

const toneClasses: Record<Tone, string> = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary/15 text-gray-900',
  accent: 'bg-accent/20 text-gray-900',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center rounded-full font-medium',
    toneClasses[props.tone],
    sizeClasses[props.size],
    props.class,
  ),
)
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
