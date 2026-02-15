<script setup lang="ts">
import Container from '@/components/ui/Container.vue'
import Button from '@/components/ui/Button.vue'

const emit = defineEmits<{
  contact: []
}>()
</script>

<template>
  <section id="hirek" class="scroll-mt-28 news-section section-neutral">
    <Container>
      <!-- Header -->
      <div class="news-header">
        <span class="news-kicker">Hírek</span>
        <h2 class="news-title">A terem hírei és közösségi frissítések egy helyen.</h2>
      </div>

      <!-- Coming soon panel -->
      <div class="news-preview-panel">
        <div class="news-preview-accent" aria-hidden="true"></div>

        <!-- Skeleton grid -->
        <div class="news-skeleton-grid">
          <div
            v-for="i in 3"
            :key="i"
            class="news-skeleton-card"
          >
            <!-- Badge skeleton -->
            <div class="news-skel-badge"></div>
            <!-- Title skeleton -->
            <div class="news-skel-line news-skel-line--title"></div>
            <!-- Body skeletons -->
            <div class="news-skel-line news-skel-line--body"></div>
            <div class="news-skel-line news-skel-line--body news-skel-line--short"></div>
          </div>
        </div>

        <!-- Hamarosan label -->
        <div class="news-coming-soon">
          <div class="news-coming-dot" aria-hidden="true"></div>
          <span class="news-coming-text">Hamarosan érkezik</span>
        </div>
      </div>

    </Container>
  </section>
</template>

<style scoped>
.news-section {
  position: relative;
  padding: 5rem 0 4.5rem;
}

/* ── Header ── */
.news-header {
  margin-bottom: 2rem;
}

.news-kicker {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(91, 57, 148, 0.75);
  margin-bottom: 0.75rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  background: rgba(152, 111, 221, 0.08);
  border: 1px solid rgba(152, 111, 221, 0.12);
}

.news-title {
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.35;
  color: #111827;
  letter-spacing: -0.01em;
  margin: 0;
}

/* ── Preview panel ── */
.news-preview-panel {
  position: relative;
  overflow: hidden;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.96), rgba(248, 245, 252, 0.9));
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

/* Hide 3rd card on mobile */
.news-skeleton-card:nth-child(3) {
  display: none;
}

/* Skeleton elements */
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

/* ── CTA ── */
.news-cta {
  margin-top: 2.5rem;
  text-align: center;
}

/* ── Responsive ── */
@media (min-width: 640px) {
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

  .news-title {
    font-size: 1.75rem;
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

  .news-title {
    font-size: 1.85rem;
  }
}
</style>
