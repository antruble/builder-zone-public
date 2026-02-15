# 🧗 Boulder Zóna – AI Development Project (CLAUDE.md)

Ez a dokumentum a projekt teljes kontextusát és szabályait tartalmazza.
Claude Code / AI agent köteles ezeket követni minden implementáció során.

------------------------------------------------------------
🎯 PROJEKT CÉL
------------------------------------------------------------

Modern, gyors, mobil-first marketing weboldal készítése
a debreceni Boulder Zóna falmászó terem számára.

A weboldal célja:
- új vendégek bevonzása
- árlista és nyitvatartás gyors elérése
- kapcsolatfelvétel megkönnyítése
- közösségi hangulat bemutatása
- profi, sportos, letisztult design

Ez NEM webapp, hanem egyszerű marketing + információs oldal.
Kerüld a túlkomplikált megoldásokat.

Prioritási sorrend:
1. Árlista
2. Nyitvatartás
3. Cím / térkép
4. Kapcsolat
5. Bemutatkozás
6. Segédlet
7. Galéria

------------------------------------------------------------
🧱 TECH STACK (kötelező)
------------------------------------------------------------

- Vue 3
- TypeScript
- Vite
- TailwindCSS
- Vue Router
- Composition API
- <script setup lang="ts">

Tilos:
- Options API
- indokolatlan külső library
- overengineering

------------------------------------------------------------
🤖 AI AGENT MUNKAFOLYAMAT (KÖTELEZŐ)
------------------------------------------------------------

Minden ticket esetén:

1. Rövid terv (max 10 sor)
2. Létrehozandó/módosítandó fájlok listája
3. Implementáció
4. Tesztelési lépések

Mindig csak az aktuális ticketen dolgozz.
Ne módosíts feleslegesen más részt.

------------------------------------------------------------
🎨 DESIGN IRÁNYELVEK
------------------------------------------------------------

Stílus:
- modern
- sportos
- világos
- sok whitespace
- nagy tipográfia
- kerekített sarkok
- card alapú layout

Layout filozófia:
- nagy hero kép
- lebegő információs kártyák
- szekciókra bontott oldal
- könnyen scannelhető tartalom
- kevés szöveg, jól strukturált blokkok

------------------------------------------------------------
🎨 SZÍNPALETTA (design tokenek)
------------------------------------------------------------

Primary (lila):
rgba(152, 111, 221, 0.8)

Accent (zöld):
rgba(158, 251, 123, 0.8)

Használat:
- primary → gombok, navbar, CTA
- accent → info cardok, highlight
- fehér/szürke → háttér
- sötétszürke → szöveg

Tailwind configban custom color néven:
- primary
- accent

------------------------------------------------------------
🧩 UI MINTÁK
------------------------------------------------------------

Hero:
- full width háttérkép
- overlay
- headline + CTA
- mellette info cardok

Info Card:
- rounded-2xl
- shadow-lg
- p-6 vagy p-8
- accent háttér

Section:
- py-16 vagy py-24
- max-w-6xl container
- cím + tartalom

Button:
- primary háttér
- rounded-xl
- hover darker
- focus state kötelező

------------------------------------------------------------
🧠 UX SZABÁLYOK
------------------------------------------------------------

- mobile-first
- minden fontos információ 2 kattintáson belül
- árlista könnyen összehasonlítható
- nagy számok, jó olvashatóság
- CTA minden oldalon
- accessibility: semantic HTML, alt, focus

------------------------------------------------------------
📁 KÖTELEZŐ PROJEKT STRUKTÚRA
------------------------------------------------------------

src/
  pages/
  components/
    ui/
    sections/
  layouts/
  content/
  assets/
  styles/

Jelentés:
- pages → route oldalak
- ui → újrahasznosítható UI elemek
- sections → nagy blokk komponensek
- layouts → layout wrapper
- content → statikus adatok

------------------------------------------------------------
📦 CONTENT STRATÉGIA
------------------------------------------------------------

Tilos szöveget hardcode-olni több helyen.

Minden adat külön fájlban:

src/content/site.ts

Példa:

export const site = {
  contact: {...},
  hours: {...},
  prices: {...},
  about: {...},
  help: {...}
}

------------------------------------------------------------
🧪 GLOBÁLIS DEFINITION OF DONE
------------------------------------------------------------

Minden ticket akkor kész, ha:

- build sikeres
- lint tiszta
- nincs console error
- mobilon jól néz ki
- reszponzív
- tiszta, olvasható kód
- nincs felesleges dependency

------------------------------------------------------------
🎟 FEJLESZTÉSI TICKET ROADMAP
------------------------------------------------------------

Ticket 0 – Projekt scaffold + dokumentáció
Ticket 1 – ESLint + Prettier
Ticket 2 – Tailwind + design tokenek
Ticket 3 – Router + layout skeleton
Ticket 4 – UI kit (Button, Card, Container stb)
Ticket 5 – Landing page
Ticket 6 – Árlista oldal
Ticket 7 – Nyitvatartás
Ticket 8 – Kapcsolat
Ticket 9 – Galéria
Ticket 10 – SEO + polish

------------------------------------------------------------
🧠 AGENT SZABÁLY
------------------------------------------------------------

Mindig:
- egyszerű megoldást válassz
- ne overengineer
- ne vezess be új library-t indok nélkül
- kövesd a design guideline-okat
- reszponzív kódot írj
