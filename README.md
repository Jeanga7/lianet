# Lianet Frontend

Application Next.js (App Router) pour le site Lianet.

## Demarrage rapide

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`.

## Architecture actuelle

- Localisation par route: `/{locale}/...` (`fr`, `en`)
- Redirection racine: `/` -> `/fr`
- Layout principal:
  - `src/components/layout/SiteLayout.tsx`
  - `src/components/hero/*`
  - `src/components/sections/*`

## Internationalisation (i18n)

Fichiers cles:

- `src/i18n/config.ts`
- `src/i18n/messages.ts`
- `src/lib/locale.ts`
- `src/lib/useI18n.ts`
- `src/middleware.ts`

Comportement:

- Le switch FR/EN est fonctionnel dans le header desktop et le full menu mobile/desktop.
- Le switch conserve le chemin courant et applique la locale cible.

## Routes centralisees

Toutes les routes applicatives sont centralisees dans:

- `src/lib/routes.ts`

Exemples:

- `/solutions`
- `/solutions/talent`
- `/solutions/strategy`
- `/solutions/lab`
- `/experts`
- `/about`
- `/contact`
- `/insights`
- `/careers`
- `/case-studies`
- `/page-tracker`

## Pages scaffoldees (structure modulaire)

Composants reutilisables:

- `src/components/pages/PageScaffold.tsx`
- `src/components/pages/PageTrackerBoard.tsx`

Copie placeholder:

- `src/app/[locale]/_pageCopy.ts`
- `src/app/[locale]/_pageTracker.ts`

Pages creees:

- `src/app/[locale]/solutions/page.tsx`
- `src/app/[locale]/solutions/talent/page.tsx`
- `src/app/[locale]/solutions/strategy/page.tsx`
- `src/app/[locale]/solutions/lab/page.tsx`
- `src/app/[locale]/experts/page.tsx`
- `src/app/[locale]/about/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/insights/page.tsx`
- `src/app/[locale]/careers/page.tsx`
- `src/app/[locale]/case-studies/page.tsx`
- `src/app/[locale]/page-tracker/page.tsx`

## Suivi des pages a developper

Board de suivi disponible sur:

- `http://localhost:3000/fr/page-tracker`
- `http://localhost:3000/en/page-tracker`

Le board affiche:

- le statut (`todo`, `in_progress`, `done`)
- les notes par page
- l'avancement global
- les liens directs vers chaque page locale

### Mise a jour automatique

Le board est maintenant auto-genere a partir des routes de:

- `src/lib/routes.ts` (`appRoutes`)

### Ce que vous pouvez modifier manuellement

Pour tout ce qui n'est pas auto-detectable (statuts metier, notes, ordre, masquage, labels), editez:

- `src/app/[locale]/_pageTracker.overrides.ts`

Champs disponibles:

- `hiddenPaths`: masquer certaines pages du board
- `order`: forcer l'ordre d'affichage
- `perLocale.fr` / `perLocale.en`: override par page:
  - `status`
  - `notes`
  - `title`
  - `area`

## Sitemap et SEO

Fichier:

- `src/app/sitemap.ts`

Le sitemap inclut des routes reelles FR/EN (plus d'ancres `#...`).

## Liens et CTA

Les liens et CTA qui pointaient vers des ancres/routes inexistantes ont ete raccordes aux routes reelles centralisees.

Fichiers principaux impactes:

- `src/components/hero/Navigation.tsx`
- `src/components/hero/FullMenu.tsx`
- `src/components/hero/HeroSection.tsx`
- `src/components/sections/ExpertiseSection.tsx`
- `src/components/sections/ManifesteSection.tsx`

## Validation

Commandes utiles:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Notes techniques

- Warning connu Next.js: convention `middleware` (migration future vers `proxy`).
- Warning possible en local: detection multi-lockfiles (configurer `turbopack.root` si necessaire).
