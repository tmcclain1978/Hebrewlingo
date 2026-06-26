# Bringing HebrewLingo into the Apocrypha app (as a /learn route)

This repo is already in Lovable's native dialect: **Vite + React + TypeScript + Tailwind**.
Goal: a single Apocrypha app with a language-learning section at `/learn`.

## Recommended path

1. **Push this repo to GitHub** (see commands you were given).
2. In your **Apocrypha Lovable project**, add a route for `/learn`.
3. Copy these folders from this repo into the Apocrypha project's `src/`:
   - `src/lib/data.ts`
   - `src/lib/speech.ts`
   - `src/components/tabs.tsx`
   - `src/components/exercises.tsx`
   - `src/components/screens.tsx`
   - `src/App.tsx` → rename to `src/pages/Learn.tsx` (or a component name Apocrypha uses)
4. In `Learn.tsx`, change `export default function App()` to `export default function Learn()`.
5. Mount `<Learn />` at the `/learn` route in Apocrypha's router.

## Things that should "just work"
- Tailwind: Apocrypha already has Tailwind, so the utility classes render as-is.
- The custom `animate-slideUp` class needs the keyframes — copy the `keyframes`/`animation`
  block from this repo's `tailwind.config.js` into Apocrypha's `tailwind.config.js` `theme.extend`.

## Things to check
- If Apocrypha uses a global font or design tokens, the inline RTL `fontFamily: "Arial"` on
  Hebrew/Aramaic text can stay — it's intentional for legible vowel-pointed script.
- `localStorage` key `hl_sound` is used for the mute setting; rename if it collides.

## Optional: let Lovable import the repo directly
You can instead connect this GitHub repo to its **own** Lovable project to iterate on it in
isolation, then copy the finished components into Apocrypha. One repo per Lovable project.
