<script setup lang="ts">
import { provide } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { siteContentKey, fetchSiteContent, useSiteContent } from '@/composables/useSiteContent'
import { galleryKey, fetchGallery, useGallery } from '@/composables/useGallery'
import { newsKey, fetchNews, useNews } from '@/composables/useNews'

const route = useRoute()

const siteContent = useSiteContent()
const gallery = useGallery()
const news = useNews()

provide(siteContentKey, siteContent)
provide(galleryKey, gallery)
provide(newsKey, news)

fetchSiteContent()
fetchGallery()
fetchNews()
</script>

<template>
  <DefaultLayout v-if="!route.meta.noLayout">
    <RouterView />
  </DefaultLayout>
  <RouterView v-else />
</template>
