<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    class?: string
  }>(),
  {
    align: 'left',
  },
)

const alignClass = computed(() => (props.align === 'center' ? 'text-center' : 'text-left'))
</script>

<template>
  <div :class="cn('mb-6', alignClass, props.class)">
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-900">{{ title }}</h2>
    <p v-if="subtitle" class="mt-2 text-muted">{{ subtitle }}</p>
  </div>
</template>
