<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    size?: Size
    class?: string
  }>(),
  {
    size: 'md',
  },
)

const sizeClasses: Record<Size, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-6xl',
  lg: 'max-w-7xl',
}

const classes = computed(() => cn('mx-auto px-4', sizeClasses[props.size], props.class))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
