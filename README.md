# HebrewLingo

A Duolingo-style web app for learning **Hebrew**, **Koine Greek**, and **Aramaic** —
built with React + TypeScript + Vite + Tailwind CSS.

## Features
- Three languages, each with its own lessons (Hebrew: 10 units, Greek: 2, Aramaic: 2 — expandable)
- Six exercise types: multiple choice, tap-the-image, fill-the-blank, true/false, word match, word bank
- **Text-to-speech** via the browser's Web Speech API (Hebrew & Aramaic use the `he-IL` voice; Greek uses `el-GR`)
  - Auto-play on each exercise, tap-to-hear on tiles, normal + slow (🐢) replay, mute toggle (persisted)
- Gamification: XP, levels, hearts, gems, combos, daily goal, streaks, league, shop, achievements

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```

## Build
```bash
npm run build    # type-checks then bundles to dist/
npm run preview  # preview the production build
```

## Project structure
```
src/
  main.tsx              app entry
  App.tsx               root component + all state/wiring
  index.css            Tailwind directives + global resets
  lib/
    data.ts            types, lesson data (Hebrew/Greek/Aramaic), COURSES map, helpers
    speech.ts          Web Speech API text-to-speech engine
  components/
    tabs.tsx           TopBar, Tabs, Learn/League/Shop/Profile
    exercises.tsx      all six exercise components + feedback/check
    screens.tsx        language select, lesson, complete, game over
```

## Notes
- The Greek voice uses **modern** Greek pronunciation, not reconstructed Koine.
- Lesson IDs are namespaced per language (`g1-1`, `a1-1`) so progress never collides across courses.
