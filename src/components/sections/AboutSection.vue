<script setup lang="ts">
import { site } from '@/content/site'
import Container from '@/components/ui/Container.vue'
</script>

<template>
  <section id="rolunk" class="scroll-mt-28 about-section section-neutral">
    <!-- Subtle ambient blobs (echoing hero, much softer) -->
    <div class="about-ambient about-ambient-primary" aria-hidden="true"></div>
    <div class="about-ambient about-ambient-accent" aria-hidden="true"></div>

    <Container class="relative z-10">
      <!-- Section header -->
      <div class="about-header">
        <span class="about-kicker">Rólunk</span>
        <h2 class="about-title">
          {{ site.about.mission }}
        </h2>
      </div>

      <!-- Two-column: narrative + founders card -->
      <div class="about-grid">
        <!-- Left: narrative text -->
        <div class="about-narrative">
          <p class="about-body">
            {{ site.about.vision }}
          </p>

          <!-- Bullet highlights -->
          <div class="about-features">
            <div
              v-for="(bullet, i) in site.about.bullets"
              :key="i"
              class="about-feature"
            >
              <span class="about-feature-dot" aria-hidden="true"></span>
              <span class="about-feature-text">{{ bullet }}</span>
            </div>
          </div>
        </div>

        <!-- Right: founders glass card -->
        <div class="founders-card">
          <div class="founders-accent" aria-hidden="true"></div>

          <!-- Founders badge -->
          <div class="founders-badge">
            <span class="founders-badge-icon" aria-hidden="true">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H9m6 0a5.97 5.97 0 00-.786-3.07M9 19.128v-.003c0-1.113.285-2.16.786-3.07M9 19.128H3.375a4.125 4.125 0 01-1.121-8.09A9.375 9.375 0 0112 2.25a9.375 9.375 0 019.746 7.788 4.125 4.125 0 01-1.121 8.09M9 19.128a5.97 5.97 0 01.786-3.07" />
              </svg>
            </span>
            <span class="founders-badge-label">Alapítók</span>
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

      <!-- Closing statement — pull quote -->
      <div class="about-closing">
        <div class="about-closing-line" aria-hidden="true"></div>
        <blockquote class="about-quote">
          {{ site.about.closing }}
        </blockquote>
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
  opacity: 0.35;
}

.about-ambient-primary {
  width: 28rem;
  height: 28rem;
  top: -8rem;
  left: -10rem;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(152, 111, 221, 0.3) 0%,
    rgba(152, 111, 221, 0) 70%
  );
}

.about-ambient-accent {
  width: 24rem;
  height: 24rem;
  bottom: -6rem;
  right: -8rem;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(158, 251, 123, 0.25) 0%,
    rgba(158, 251, 123, 0) 70%
  );
}

/* Section header */
.about-header {
  max-width: 38rem;
  margin-bottom: 3rem;
}

.about-kicker {
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

.about-title {
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.35;
  color: #111827;
  letter-spacing: -0.01em;
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

/* Feature bullets */
.about-features {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.about-feature {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
}

.about-feature-dot {
  flex-shrink: 0;
  width: 0.42rem;
  height: 0.42rem;
  margin-top: 0.5rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(158, 251, 123, 1),
    rgba(152, 111, 221, 0.8)
  );
  box-shadow: 0 0 0 3px rgba(158, 251, 123, 0.1);
}

.about-feature-text {
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.55;
  color: #374151;
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

  .about-title {
    font-size: 1.75rem;
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

  .about-title {
    font-size: 1.85rem;
  }

  .about-quote {
    font-size: 1.2rem;
  }
}
</style>
