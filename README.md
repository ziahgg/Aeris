# AERIS — Homepage

A static, responsive build of the **AERIS** fashion homepage, made from the Figma file
[`ziahdesign` → "Homepage — Desktop 1440" (node 79:42)](https://www.figma.com/design/BaGGNADHasoA3oYRZ1L3mv/ziahdesign?node-id=79-42)
and its companion frame "Homepage — Mobile 390" (node 86:417).

Built with **Vite 8 · React 19 · TypeScript · Tailwind CSS 4**. There is no backend, database or
external service. Everything ships as static files and runs on GitHub Pages.

## Getting started

Requires Node.js 20.19+ (22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload           |
| `npm run build`     | Type-check (`tsc -b`) and build into `dist/`   |
| `npm run preview`   | Serve the production build locally             |
| `npm run lint`      | ESLint (TypeScript + React Hooks rules)        |
| `npm run typecheck` | TypeScript only                                |

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`
(or manually from the Actions tab).

1. Push this project to a GitHub repository.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The site publishes at `https://<user>.github.io/<repo>/`.

### Base path

Project sites are served from a subpath (`/<repo>/`). `vite.config.ts` reads the base from the
`BASE_PATH` environment variable, and the workflow sets it automatically from the repository
name. Nothing needs editing if you rename the repo. Locally the base is `/`.

To test a production build under a subpath:

```bash
BASE_PATH=/aeris-homepage/ npm run build
npx vite preview --base /aeris-homepage/
```

Then open `http://localhost:4173/aeris-homepage/`. For a user/organisation site
(`<user>.github.io`) or a custom domain, set `BASE_PATH: /` in the workflow.

## Project structure

```
src/
  assets/images/    30 WebP images exported from the Figma file (design crops baked in)
  components/       Button, Icon, ProductCard, Drawer (reusable UI from the Figma component set)
  content/          site.ts (copy, products, links), images.ts, format.ts
  hooks/useShop.tsx Wishlist + bag state (localStorage only)
  sections/         One component per Figma section, in page order
  index.css         Design tokens (@theme) and text-style utilities
```

Design tokens come from the Figma variable collection "AERIS Tokens": ink `#141414`,
ink-80 `#3b3b3b`, muted `#6f6b65`, line `#e3e0da`, ivory `#f6f4f0`, stone `#ece9e4`,
sand `#d7ccbc`, sky `#9db6d1`, sky-deep `#4a6a8f`. Type is **Jost** (300/400/500), self-hosted
via `@fontsource/jost`. Each Figma text style is a `t-*` utility in `index.css`.

## Responsive behaviour

- **≥ 1024px** follows the 1440 desktop frame. Content is capped at 1440px with 64px gutters.
- **< 768px** follows the 390 mobile frame: hamburger menu, horizontal snap rails for categories,
  new arrivals, campaign chapters and reviews, a 2-up product grid, stacked bento tiles and an
  accordion footer.
- **768–1023px** (no tablet frame exists) uses the mobile structure with 40px gutters, a
  4-column product grid and the desktop hero image.

## What works

- Navigation links scroll to their sections. A skip link and visible focus rings are included.
- Announcement-bar chevrons rotate the messages.
- Best-seller filter tabs filter the product grid. "View all" expands it to the full catalogue.
- Quick add (on hover/focus of a best-seller card) adds a size to the bag. Hearts toggle the wishlist.
  Header counts and the bag/wishlist drawers update, and both persist in `localStorage`.
- Search drawer filters the product catalogue.
- Autumn-edit tiles pre-select the matching filter. The new-arrivals arrows scroll the rail.
- Newsletter form validates the email address and confirms. Nothing is sent anywhere.
- Footer accordion on mobile. Social links open the platforms in a new tab.

## Known limitations and deviations

These are deliberate, and each is easy to change in `src/content/site.ts`:

- **Placeholder content from the design is kept as is**: review cards and rating text, the
  `+1 (000) 000-0000` phone number and "Offer ends [date]" are placeholders in Figma.
- **No destination pages exist** for Gift cards, Help & FAQ, Track your order, Care guide, Stores,
  Careers or the legal links. They render as plain text, not dead links. Add an `href` to make them links.
- **Social URLs** point to the platforms' home pages because the design names no handles.
- **"Watch the film"** has no video in the Figma file. It stays inactive until `campaignFilmUrl` is set.
- **Checkout** is out of scope for a static site. The bag shows a subtotal only.
- **The account icon** links to the footer's customer-service area, because accounts need a backend.
- **Newsletter placeholder**: the design styles the "Email address" placeholder white on a white
  field, which would be invisible. It uses the muted token instead.
- **Mobile community grid**: the mobile frame has six empty square placeholders, so they are
  filled with editorial photos from the same file. Desktop shows the five designed social posts
  (exported as images).
- **Mobile filter tabs**: inactive tabs have a dark underline in the mobile frame but none on
  desktop. The desktop treatment is used everywhere so the active tab stays clear.
- **Hover states** are not defined in Figma (apart from the product card's Quick add). Buttons and
  links use subtle colour and arrow-nudge hovers.
- **Added icon**: a "close" (×) icon was added for the drawers. Every other icon is the Figma `icon/*` set.
