<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'accent' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    class?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
  },
)

defineEmits<{ click: [e: MouseEvent] }>()

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white shadow-sm hover:opacity-90',
  accent: 'bg-accent text-gray-900 shadow-sm hover:opacity-90',
  ghost: 'bg-transparent text-gray-900 hover:bg-black/5',
  outline: 'border border-black/15 text-gray-900 hover:bg-black/5',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center font-semibold rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.disabled && 'opacity-50 pointer-events-none',
    props.class,
  ),
)
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes" @click="$emit('click', $event)">
    <slot />
  </button>
</template>
