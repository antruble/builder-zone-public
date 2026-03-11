<script setup lang="ts">
import { inject } from 'vue'
import { siteContentKey } from '@/composables/useSiteContent'
import { site as defaults } from '@/content/site'
import Container from '@/components/ui/Container.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const site = inject(siteContentKey, defaults)
</script>

<template>
  <section id="rolunk" class="scroll-mt-28 about-section section-neutral">
    <!-- Ambient blobs -->
    <div class="about-ambient about-ambient-primary" aria-hidden="true"></div>
    <div class="about-ambient about-ambient-accent" aria-hidden="true"></div>
    <div class="about-ambient about-ambient-mid" aria-hidden="true"></div>

    <Container class="relative z-10">
      <!-- Section header -->
      <SectionTitle :kicker="site.ui.aboutKicker" :title="site.about.mission" />

      <!-- Two-column: narrative + founders card -->
      <div class="about-grid">
        <!-- Left: narrative text -->
        <div class="about-narrative">
          <p class="about-body">
            {{ site.about.vision }}
          </p>
          
      <!-- Closing statement — pull quote -->
      <div class="about-closing">
        <div class="about-closing-line" aria-hidden="true"></div>
        <blockquote class="about-quote">
          {{ site.about.closing }}
        </blockquote>
      </div>
        </div>

        <!-- Right: founders glass card -->
        <div class="founders-card">
          <div class="founders-accent" aria-hidden="true"></div>

          <!-- Founders badge -->
          <div class="founders-badge">
            <span class="founders-badge-label">{{ site.ui.aboutFoundersBadge }}</span>
          </div>

          <!-- Names -->
          <div class="founders-names">
            <span class="founders-name">Zoli</span>
            <span class="founders-ampersand">&</span>
            <span class="founders-name">Bence</span>
          </div>

          <!-- Intro text -->
          <p class="founders-text">
            {{ site.about.foundersIntro }}
          </p>

          <!-- Deco ring -->
          <div class="founders-deco" aria-hidden="true"></div>
        </div>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  overflow: hidden;
  padding: 5rem 0 4.5rem;
}

/* Ambient gradient blobs (very subtle) */
.about-ambient {
  position: absolute;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(72px);
}

.about-ambient-primary {
  width: 32rem;
  height: 32rem;
  top: -8rem;
  left: -10rem;
  opacity: 0.5;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(152, 111, 221, 0.4) 0%,
    rgba(152, 111, 221, 0) 70%
  );
}

.about-ambient-accent {
  width: 28rem;
  height: 28rem;
  bottom: -6rem;
  right: -8rem;
  opacity: 0.45;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(158, 251, 123, 0.35) 0%,
    rgba(158, 251, 123, 0) 70%
  );
}

.about-ambient-mid {
  width: 20rem;
  height: 20rem;
  top: 40%;
  right: 20%;
  opacity: 0.3;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(152, 111, 221, 0.25) 0%,
    rgba(158, 251, 123, 0.15) 50%,
    transparent 70%
  );
}


/* Two-column grid */
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: start;
}

/* Narrative */
.about-narrative {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-body {
  font-size: 1.02rem;
  line-height: 1.72;
  color: #4b5563;
  max-width: 36rem;
}

/* Founders glass card */
.founders-card {
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background:
    linear-gradient(
      155deg,
      rgba(242, 242, 242, 0.95),
      rgba(244, 243, 242, 0.88)
    );
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.07),
    0 2px 8px rgba(152, 111, 221, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* Top accent gradient stripe */
.founders-accent {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    rgba(158, 251, 123, 0.45),
    rgba(152, 111, 221, 0.4)
  );
}

/* Founders badge pill */
.founders-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1rem;
  padding: 0.22rem 0.6rem 0.22rem 0.4rem;
  border-radius: 9999px;
  background: rgba(158, 251, 123, 0.12);
  border: 1px solid rgba(158, 251, 123, 0.2);
}

.founders-badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(91, 57, 148, 0.7);
}

.founders-badge-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(50, 87, 24, 0.85);
}

/* Names display */
.founders-names {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.founders-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.01em;
}

.founders-ampersand {
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(152, 111, 221, 0.55);
}

/* Founders text */
.founders-text {
  font-size: 0.88rem;
  line-height: 1.65;
  color: #6b7280;
}

/* Decorative ring (echoing diamond deco-ring) */
.founders-deco {
  position: absolute;
  bottom: -2.5rem;
  right: -2.5rem;
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  border: 2px solid rgba(152, 111, 221, 0.08);
  pointer-events: none;
}

/* Closing statement */
.about-closing {
  margin-top: 3.5rem;
  max-width: 36rem;
}

.about-closing-line {
  width: 3rem;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    rgba(152, 111, 221, 0.35),
    rgba(158, 251, 123, 0.4)
  );
  margin-bottom: 1.25rem;
}

.about-quote {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  color: #1f2937;
  font-style: normal;
}

/* Responsive */
@media (min-width: 768px) {
  .about-section {
    padding: 6rem 0 5.5rem;
  }

  .about-grid {
    grid-template-columns: 1fr 20rem;
    gap: 3.5rem;
  }

  .about-closing {
    margin-top: 4rem;
  }
}

@media (min-width: 1024px) {
  .about-section {
    padding: 7rem 0 6rem;
  }

  .about-grid {
    grid-template-columns: 1fr 22rem;
    gap: 4.5rem;
  }

  .about-quote {
    font-size: 1.2rem;
  }
}
</style>
