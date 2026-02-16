<script setup lang="ts">
import { site } from '@/content/site'
import { formatHuf } from '@/lib/format'
import Container from '@/components/ui/Container.vue'

const categoryColors: Record<string, { bg: string; pill: string; border: string }> = {
  Felnőtt: {
    bg: 'rgba(152, 111, 221, 0.06)',
    pill: 'rgba(152, 111, 221, 0.12)',
    border: 'rgba(152, 111, 221, 0.18)',
  },
  Diák: {
    bg: 'rgba(158, 251, 123, 0.07)',
    pill: 'rgba(158, 251, 123, 0.15)',
    border: 'rgba(158, 251, 123, 0.22)',
  },
  Gyerek: {
    bg: 'rgba(0, 0, 0, 0.02)',
    pill: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.08)',
  },
}
</script>

<template>
  <section id="arlista" class="scroll-mt-28 section-accent pricing-section">
    <Container>
      <!-- Section header -->
      <div class="pricing-header">
        <span class="pricing-kicker">Árlista</span>
        <h2 class="pricing-title">Válaszd ki a neked megfelelő jegyet vagy bérletet.</h2>
        <p class="pricing-note">Áraink forintban értendők.</p>
      </div>

      <!-- Desktop table — glass card -->
      <div class="pricing-table-card hidden md:block pt-2">
        <div class="pricing-table-accent mt-2" aria-hidden="true"></div>
        <table class="pricing-table">
          <thead>
            <tr>
              <th class="pricing-th pricing-th-name"></th>
              <th
                v-for="category in site.pricing.categories"
                :key="category"
                class="pricing-th"
                :style="{ backgroundColor: categoryColors[category]?.bg }"
              >
                <span
                  class="pricing-category-pill"
                  :style="{
                    backgroundColor: categoryColors[category]?.pill,
                    borderColor: categoryColors[category]?.border,
                  }"
                >{{ category }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in site.pricing.items"
              :key="item.name"
              :class="['pricing-row', item.highlight && 'pricing-row--highlight']"
            >
              <td class="pricing-td pricing-td-name">
                <span class="pricing-item-name">{{ item.name }}</span>
                <span v-if="item.highlight" class="pricing-badge">Ajánlott</span>
              </td>
              <td
                v-for="category in site.pricing.categories"
                :key="category"
                class="pricing-td pricing-td-price"
                :style="{ backgroundColor: categoryColors[category]?.bg }"
              >
                {{ formatHuf(item.prices[category] ?? 0) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="flex md:hidden pricing-mobile">
        <div
          v-for="category in site.pricing.categories"
          :key="category"
          class="pricing-mobile-card"
        >
          <div
            class="pricing-mobile-accent"
            aria-hidden="true"
            :style="{ background: `linear-gradient(90deg, ${categoryColors[category]?.border ?? 'rgba(0,0,0,0.06)'}, transparent)` }"
          ></div>
          <h3 class="pricing-mobile-category">{{ category }}</h3>
          <ul class="pricing-mobile-list">
            <li
              v-for="item in site.pricing.items"
              :key="item.name"
              :class="['pricing-mobile-item', item.highlight && 'pricing-mobile-item--highlight']"
            >
              <span class="pricing-mobile-name">
                {{ item.name }}
                <span v-if="item.highlight" class="pricing-badge">Ajánlott</span>
              </span>
              <span class="pricing-mobile-price">
                {{ formatHuf(item.prices[category] ?? 0) }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Addons -->
      <div class="pricing-addons-header">
        <span class="pricing-kicker">Extrák</span>
        <p class="pricing-addons-sub">Kiegészítő szolgáltatások</p>
      </div>

      <div class="pricing-addons-grid">
        <div
          v-for="addon in site.pricing.addons"
          :key="addon.name"
          class="pricing-addon"
        >
          <span class="pricing-addon-dot" aria-hidden="true"></span>
          <div class="pricing-addon-content">
            <span class="pricing-addon-name">{{ addon.name }}</span>
            <span class="pricing-addon-price">{{ formatHuf(addon.price) }}</span>
          </div>
          <p v-if="addon.note" class="pricing-addon-note">{{ addon.note }}</p>
        </div>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.pricing-section {
  position: relative;
  padding: 5rem 0 4.5rem;
}

/* Header */
.pricing-header {
  margin-bottom: 2.5rem;
}

.pricing-kicker {
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

.pricing-title {
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.35;
  color: #111827;
  letter-spacing: -0.01em;
  margin: 0;
}

.pricing-note {
  margin: 0.5rem 0 0;
  font-size: 0.82rem;
  color: #9ca3af;
  font-weight: 500;
}

/* ── Desktop table card ── */
.pricing-table-card {
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
}

.pricing-table-accent {
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

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

/* Table header */
.pricing-th {
  padding: 1.15rem 1.25rem;
  text-align: right;
  vertical-align: middle;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.pricing-th-name {
  text-align: left;
}

.pricing-category-pill {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #374151;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* Table rows */
.pricing-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: background 0.15s ease;
}

.pricing-row:last-child {
  border-bottom: 0;
}

.pricing-row:not(.pricing-row--highlight):hover {
  background: rgba(0, 0, 0, 0.015);
}

/* Highlight row */
.pricing-row--highlight {
  background:
    linear-gradient(
      90deg,
      rgba(158, 251, 123, 0.06) 0%,
      rgba(158, 251, 123, 0.1) 40%,
      rgba(152, 111, 221, 0.04) 100%
    );
}

.pricing-row--highlight:hover {
  background:
    linear-gradient(
      90deg,
      rgba(158, 251, 123, 0.08) 0%,
      rgba(158, 251, 123, 0.13) 40%,
      rgba(152, 111, 221, 0.06) 100%
    );
}

/* Table cells */
.pricing-td {
  padding: 1rem 1.25rem;
  vertical-align: middle;
}

.pricing-td-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pricing-item-name {
  font-size: 0.92rem;
  font-weight: 600;
  color: #111827;
}

.pricing-td-price {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

/* Badge */
.pricing-badge {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(50, 87, 24, 0.85);
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  background: rgba(158, 251, 123, 0.18);
  border: 1px solid rgba(158, 251, 123, 0.25);
}

/* ── Mobile cards ── */
.pricing-mobile {
  flex-direction: column;
  gap: 1.5rem;
}

.pricing-mobile-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.96), rgba(248, 245, 252, 0.9));
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  padding: 1.25rem;
}

.pricing-mobile-accent {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    rgba(158, 251, 123, 0.4),
    rgba(152, 111, 221, 0.35)
  );
}

.pricing-mobile-category {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.85rem;
}

.pricing-mobile-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.pricing-mobile-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.pricing-mobile-item:last-child {
  border-bottom: 0;
}

.pricing-mobile-item--highlight {
  margin: 0.15rem -0.75rem;
  padding: 0.7rem 0.75rem;
  border-radius: 0.75rem;
  border-bottom: 0;
  background:
    linear-gradient(
      90deg,
      rgba(158, 251, 123, 0.06),
      rgba(158, 251, 123, 0.1),
      rgba(152, 111, 221, 0.04)
    );
}

.pricing-mobile-name {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  color: #374151;
  font-weight: 500;
}

.pricing-mobile-price {
  font-variant-numeric: tabular-nums;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
}

/* ── Addons ── */
.pricing-addons-header {
  margin-top: 3rem;
  margin-bottom: 1.25rem;
}

.pricing-addons-kicker {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(50, 87, 24, 0.75);
  margin-bottom: 0.3rem;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  background: rgba(152, 111, 221, 0.1);
  border: 1px solid rgba(152, 111, 221, 0.18)
}

.pricing-addons-sub {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: #9ca3af;
  font-weight: 500;
}

.pricing-addons-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.pricing-addon {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.85);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.pricing-addon-dot {
  flex-shrink: 0;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(158, 251, 123, 1),
    rgba(152, 111, 221, 0.8)
  );
}

.pricing-addon-content {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.pricing-addon-name {
  font-size: 0.88rem;
  font-weight: 500;
  color: #374151;
}

.pricing-addon-price {
  font-variant-numeric: tabular-nums;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
  margin-left: auto;
}

.pricing-addon-note {
  width: 100%;
  margin: 0;
  padding-left: 1.03rem;
  font-size: 0.75rem;
  color: #9ca3af;
  line-height: 1.4;
}

/* Responsive */
@media (min-width: 640px) {
  .pricing-addons-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .pricing-addon {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem 1.1rem;
  }

  .pricing-addon-content {
    flex-direction: column;
    gap: 0.15rem;
  }

  .pricing-addon-price {
    margin-left: 0;
    font-size: 1.35rem;
  }

  .pricing-addon-note {
    padding-left: 0;
  }

}

@media (min-width: 768px) {
  .pricing-section {
    padding: 6rem 0 5.5rem;
  }

  .pricing-title {
    font-size: 1.75rem;
  }
}

@media (min-width: 1024px) {
  .pricing-section {
    padding: 7rem 0 6rem;
  }

  .pricing-title {
    font-size: 1.85rem;
  }
}
</style>
