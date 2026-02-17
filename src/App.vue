<script setup lang="ts">
import { provide } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { siteContentKey, fetchSiteContent, useSiteContent } from '@/composables/useSiteContent'
import { galleryKey, fetchGallery, useGallery } from '@/composables/useGallery'

const route = useRoute()

const siteContent = useSiteContent()
const gallery = useGallery()

provide(siteContentKey, siteContent)
provide(galleryKey, gallery)

fetchSiteContent()
fetchGallery()
</script>

<template>
  <DefaultLayout v-if="!route.meta.noLayout">
    <RouterView />
  </DefaultLayout>
  <RouterView v-else />
</template>
