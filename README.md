# Folio3 Managed IT: Home page

Next.js 15 + Framer Motion build of the Figma "Desktop - 1" frame (node 1:2), responsive down to 360px.

```bash
npm install
npm run dev   # http://localhost:3000
```

Motion follows the animate skill: transform/opacity only, ease-out-quint for entrances, springs for interactive
elements, and `MotionConfig reducedMotion="user"` plus a CSS `prefers-reduced-motion` block that stops the marquee
and floating badges.

Notes
- Images in `public/images` were exported from Figma at 2x/3x.
- FAQ: only the second answer exists in Figma. The other six are draft copy in `components/Faq.tsx`.
- Links point to `#` placeholders until the other pages are built.
