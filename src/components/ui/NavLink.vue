<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="text-sm font-medium text-muted hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
    active-class="text-gray-900 font-semibold"
  >
    {{ label }}
  </RouterLink>
</template>
