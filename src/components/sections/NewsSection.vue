<script setup lang="ts">
import { inject, computed, ref } from 'vue'
import Container from '@/components/ui/Container.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import NewsSheet from '@/components/ui/NewsSheet.vue'
import { newsKey } from '@/composables/useNews'
import type { NewsItem } from '@/content/news'

const news = inject(newsKey, ref([]))
const publishedNews = computed(() =>
  [...news.value].filter((n) => n.published).sort((a, b) => b.date.localeCompare(a.date)),
)

const selectedItem = ref<NewsItem | null>(null)
const sheetOpen = ref(false)

function openSheet(item: NewsItem) {
  selectedItem.value = item
  sheetOpen.value = true
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${y}.${m}.${d}.`
}
</script>

<template>
  <section id="hirek" class="scroll-mt-28 news-section section-neutral">
    <Container>
      <!-- Header -->
      <SectionTitle kicker="Hírek" title="A terem hírei és közösségi frissítések egy helyen." />

      <!-- Real news grid -->
      <div v-if="publishedNews.length > 0" class="news-grid">
        <button
          v-for="item in publishedNews"
          :key="item.id"
          class="news-card"
          @click="openSheet(item)"
        >
          <div class="news-card-accent" aria-hidden="true"></div>

          <span class="news-card-date">{{ formatDate(item.date) }}</span>
          <h3 class="news-card-title">{{ item.title }}</h3>
          <p v-if="item.subtitle" class="news-card-subtitle">{{ item.subtitle }}</p>

          <span class="news-card-cta">Tovább →</span>
        </button>
      </div>

      <!-- Coming soon panel (fallback) -->
      <div v-else class="news-preview-panel">
        <div class="news-preview-accent" aria-hidden="true"></div>

        <div class="news-skeleton-grid">
          <div v-for="i in 3" :key="i" class="news-skeleton-card">
            <div class="news-skel-badge"></div>
            <div class="news-skel-line news-skel-line--title"></div>
            <div class="news-skel-line news-skel-line--body"></div>
            <div class="news-skel-line news-skel-line--body news-skel-line--short"></div>
          </div>
        </div>

        <div class="news-coming-soon">
          <div class="news-coming-dot" aria-hidden="true"></div>
          <span class="news-coming-text">Hamarosan érkezik</span>
        </div>
      </div>
    </Container>
  </section>

  <!-- Sheet -->
  <NewsSheet v-model="sheetOpen" :item="selectedItem" />
</template>

<style scoped>
.news-section {
  position: relative;
  padding: 5rem 0 4.5rem;
}

/* ── Real news grid ── */
.news-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.news-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.96), rgba(248, 245, 252, 0.9));
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  padding: 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 16px 36px rgba(0, 0, 0, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.news-card:active {
  transform: translateY(0);
}

.news-card-accent {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(158, 251, 123, 0.5), rgba(152, 111, 221, 0.4));
}

.news-card-date {
  font-size: 0.72rem;
  font-weight: 500;
  color: #9ca3af;
}

.news-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.35;
  margin: 0;
}

.news-card-subtitle {
  font-size: 0.88rem;
  line-height: 1.55;
  color: #6b7280;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-cta {
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(152, 111, 221, 0.85);
  margin-top: 0.35rem;
}

/* ── Preview panel (fallback) ── */
.news-preview-panel {
  position: relative;
  overflow: hidden;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.96), rgba(248, 245, 252, 0.9));
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(152, 111, 221, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  padding: 2rem 1.5rem;
}

.news-preview-accent {
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    rgba(158, 251, 123, 0.4),
    rgba(152, 111, 221, 0.35)
  );
}

/* ── Skeleton grid ── */
.news-skeleton-grid {
  display: grid;
  gap: 1rem;
}

.news-skeleton-card {
  padding: 1.15rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.news-skeleton-card:nth-child(3) {
  display: none;
}

.news-skel-badge {
  width: 4rem;
  height: 1.15rem;
  border-radius: 9999px;
  background: rgba(152, 111, 221, 0.06);
  animation: skel-pulse 2.4s ease-in-out infinite;
}

.news-skel-line {
  border-radius: 0.35rem;
  background: rgba(0, 0, 0, 0.04);
  animation: skel-pulse 2.4s ease-in-out infinite;
}

.news-skel-line--title {
  width: 65%;
  height: 0.85rem;
  animation-delay: 0.15s;
}

.news-skel-line--body {
  width: 90%;
  height: 0.55rem;
  animation-delay: 0.3s;
}

.news-skel-line--short {
  width: 55%;
  animation-delay: 0.45s;
}

@keyframes skel-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* ── Coming soon label ── */
.news-coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin-top: 1.75rem;
}

.news-coming-dot {
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(158, 251, 123, 1),
    rgba(152, 111, 221, 0.8)
  );
}

.news-coming-text {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #9ca3af;
}

/* ── Responsive ── */
@media (min-width: 640px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .news-skeleton-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .news-skeleton-card:nth-child(3) {
    display: flex;
  }
}

@media (min-width: 768px) {
  .news-section {
    padding: 6rem 0 5.5rem;
  }

  .news-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .news-skeleton-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .news-preview-panel {
    padding: 2.5rem 2rem;
  }
}

@media (min-width: 1024px) {
  .news-section {
    padding: 7rem 0 6rem;
  }
}
</style>
