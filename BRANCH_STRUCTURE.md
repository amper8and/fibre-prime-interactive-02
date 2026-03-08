# Repository Branch Structure & Deployment Flow

## Two Branches, Two Different Things

```
GitHub Repository: fibre-prime-interactive-02
│
├── main branch          ← SOURCE CODE (where you edit)
│   ├── app/
│   │   ├── page.tsx              ← Home page source
│   │   ├── experience/page.tsx   ← Experience page source
│   │   ├── bundles/page.tsx      ← Bundles page source
│   │   ├── marketplace/page.tsx  ← Marketplace page source
│   │   ├── plans/page.tsx        ← Plans page source
│   │   ├── layout.tsx            ← Root layout
│   │   └── globals.css           ← Styles
│   ├── components/               ← React components
│   ├── lib/data.ts               ← All app data
│   ├── store/                    ← State management
│   └── next.config.js            ← Build config
│
└── gh-pages branch      ← COMPILED OUTPUT (what GitHub serves)
    ├── index.html                ← Compiled home page
    ├── experience/index.html     ← Compiled experience page
    ├── bundles/index.html        ← Compiled bundles page
    ├── marketplace/index.html    ← Compiled marketplace page
    ├── plans/index.html          ← Compiled plans page
    ├── _next/static/             ← All JS chunks + CSS
    ├── fonts/                    ← Font files
    └── og-image.png              ← Static assets
```

---

## The Flow

```
main branch (source)
     ↓  npm run build
out/ directory (compiled static HTML/JS/CSS)
     ↓  git push to gh-pages branch
gh-pages branch (what GitHub Pages serves live)
```

---

## Key Rules

- **Never edit the `gh-pages` branch directly** — it is always fully overwritten by a fresh build.
- **All edits happen in the `main` branch** source files only.
- Running `npm run build` compiles everything into the `out/` folder.
- The contents of `out/` are then pushed to the `gh-pages` branch to go live.
