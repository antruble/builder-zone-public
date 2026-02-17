<script setup lang="ts">
import { site } from '@/content/site'
import Container from '@/components/ui/Container.vue'
import DifficultyLegend from '@/components/sections/DifficultyLegend.vue'
</script>

<template>
  <section id="segedlet" class="scroll-mt-28 help-section section-accent">
    <Container>
      <!-- ═══ Intro: Mi az a boulderezés? ═══ -->
      <div class="help-intro">
        <div class="help-intro-text">
          <span class="help-kicker">{{ site.help.intro.kicker }}</span>
          <h2 class="help-headline">{{ site.help.intro.headline }}</h2>
          <div class="help-intro-paragraphs">
            <p
              v-for="(p, idx) in site.help.intro.paragraphs"
              :key="idx"
              class="help-intro-p"
            >
              {{ p }}
            </p>
          </div>
        </div>

      </div>

      <!-- ═══ Markings / Rules ═══ -->
      <div class="help-markings">
        <div class="help-markings-header">
          <span class="help-kicker">{{ site.help.markings.kicker }}</span>
          <h2 class="help-headline">{{ site.help.markings.headline }}</h2>
          <p v-if="site.help.markings.description" class="help-markings-desc">
            {{ site.help.markings.description }}
          </p>
        </div>

        <div class="help-rules-grid">
          <div
            v-for="(rule, idx) in site.help.markings.rules"
            :key="idx"
            class="help-rule-card"
          >
            <div class="help-rule-accent" aria-hidden="true"></div>
            <div class="help-rule-number">
              <span>{{ String(idx + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="help-rule-title">{{ rule.title }}</h3>
            <p class="help-rule-text">{{ rule.text }}</p>
          </div>
        </div>
      </div>

      <!-- ═══ Difficulty Legend ═══ -->
      <div class="help-difficulty">
        <div class="help-difficulty-header">
          <span class="help-kicker">Nehézségi szintek</span>
          <h2 class="help-headline">Hat szint a kezdőtől az elitig</h2>
          <p class="help-markings-desc">
            Minden út jelölve van – keresd a szimbólumokat a startfogásoknál.
          </p>
        </div>
        <DifficultyLegend :levels="site.help.difficultyLegend" />
      </div>
    </Container>
  </section>
</template>

<style scoped>
.help-section {
  position: relative;
  padding: 5rem 0 4.5rem;
}

/* ── Shared kicker / headline ── */
.help-kicker {
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

.help-headline {
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.35;
  color: #111827;
  letter-spacing: -0.01em;
  margin: 0;
}

/* ═══════════════════════════════════════════════
   Intro section — two-column on md+
   ═══════════════════════════════════════════════ */
.help-intro {
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
}

.help-intro-text {
  display: flex;
  flex-direction: column;
}

.help-intro-paragraphs {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.help-intro-p {
  font-size: 0.92rem;
  line-height: 1.7;
  color: #4b5563;
  margin: 0;
}

/* ═══════════════════════════════════════════════
   Markings / Rules section
   ═══════════════════════════════════════════════ */
.help-markings {
  margin-bottom: 4rem;
}

.help-markings-header {
  margin-bottom: 2rem;
}

.help-markings-desc {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: #9ca3af;
  font-weight: 500;
}

.help-rules-grid {
  display: grid;
  gap: 0.75rem;
}

/* Rule card */
.help-rule-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.96), rgba(248, 245, 252, 0.9));
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  padding: 1.25rem 1.35rem 1.25rem 1.35rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.35rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.help-rule-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.07),
    0 2px 8px rgba(152, 111, 221, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.help-rule-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(
    180deg,
    rgba(158, 251, 123, 0.5),
    rgba(152, 111, 221, 0.4)
  );
}

.help-rule-number {
  grid-row: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: rgba(152, 111, 221, 0.06);
  border: 1px solid rgba(152, 111, 221, 0.08);
}

.help-rule-number span {
  font-size: 0.8rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: rgba(91, 57, 148, 0.6);
  letter-spacing: 0.02em;
}

.help-rule-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  align-self: center;
}

.help-rule-text {
  font-size: 0.82rem;
  line-height: 1.55;
  color: #6b7280;
  margin: 0;
  align-self: start;
}

/* ═══════════════════════════════════════════════
   Difficulty section
   ═══════════════════════════════════════════════ */
.help-difficulty {
  /* no extra spacing needed, DifficultyLegend handles grid */
}

.help-difficulty-header {
  margin-bottom: 2rem;
}

/* ── Responsive ── */
@media (min-width: 768px) {
  .help-section {
    padding: 6rem 0 5.5rem;
  }

  .help-headline {
    font-size: 1.75rem;
  }

  .help-rules-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .help-section {
    padding: 7rem 0 6rem;
  }

  .help-headline {
    font-size: 1.85rem;
  }

  .help-rules-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .help-rule-card {
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  }
}
</style>
