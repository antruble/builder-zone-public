<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { galleryKey } from '@/composables/useGallery'
import { galleryItems as defaults } from '@/content/gallery'
import HeroLanding from '@/components/sections/HeroLanding.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import PricingSection from '@/components/sections/PricingSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import HelpSection from '@/components/sections/HelpSection.vue'
import NewsSection from '@/components/sections/NewsSection.vue'
import LightboxModal from '@/components/sections/LightboxModal.vue'

const galleryRef = inject(galleryKey, ref(defaults))
const galleryItems = computed(() => galleryRef.value)

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function scrollToSection(id: string) {
  const section = document.getElementById(id)

  if (!section) return

  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function prev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryItems.value.length) % galleryItems.value.length
}

function next() {
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryItems.value.length
}

</script>

<template>
  <!-- Hero (own background) -->
  <HeroLanding />

  <!-- 1. Rólunk — ODD → neutral -->
  <AboutSection />

  <!-- 2. Árlista — EVEN → accent -->
  <PricingSection />

  <!-- 3. Galéria — ODD → neutral -->
  <GallerySection :items="galleryItems" @open="openLightbox" />

  <!-- 4. Segédlet — EVEN → accent -->
  <HelpSection />

  <!-- 5. Hírek — ODD → neutral -->
  <NewsSection @contact="scrollToSection('kapcsolat')" />

  <LightboxModal
    :is-open="lightboxOpen"
    :items="galleryItems"
    :index="lightboxIndex"
    @close="closeLightbox"
    @prev="prev"
    @next="next"
  />
</template>
