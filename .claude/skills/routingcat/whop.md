# RoutingCat on a Whop Website

This site is a Whop Website: a TanStack Start app, `whop.app.json` naming its app, built with Whop's own Vite plugin and served by Whop's hosting at `<name>.whop.site`, whether a developer deploys it with `whop apps deploy` or Whop's AI builder publishes it. RoutingCat runs in its own code. `SKILL.md` holds what every site shares; this file holds the code. The docs' guide is `guides/whop-websites.md`, in `node_modules/routingcat/docs/`, which holds the AI builder's install prompt and the rules it keeps in its memory.

## What `init` set up

- **`src/server.ts`, the server entry,** which `wrangler.jsonc` names as `main`: TanStack Start's handler wrapped by `whop(handler, { build })` from `routingcat/whop`, the build from `virtual:routingcat/values`. It decides each page before TanStack Start renders it, and answers RoutingCat's own paths, under `/_rc/`, itself. A wrapper of the site's own stays: it hands its requests to `whop()`'s `fetch`, as `npx routingcat init` prints it.
- **`routingcat()` from `routingcat/vite`** in `vite.config.ts`'s plugins, before `tanstackStart()`: each build registers what `routingcat/` and `routingcat.config.ts` declare.
- **The root route, `src/routes/__root.tsx`:** `beforeLoad: routingcatBeforeLoad`, which hands every route the page's decision, and `<RoutingCat />` in `<body>`, after the page, which reports what the browser showed. Beside a `beforeLoad` of the site's own, both contexts return together: `beforeLoad: async (options) => ({ ...(await routingcatBeforeLoad(options)), ...yours })`.
- **`routingcat.d.ts`,** which declares `virtual:routingcat/values`, the build `src/server.ts` imports.
- **`routingcat.config.ts`,** its `config` from `routingcat/tanstack-start`, naming the Website's address as `origin`, and beside it `export const deployKey = 'dk_…'`, the key for one Whop Website: Whop's builds see none of the Website's secrets, so the key sits in the code, and RoutingCat's build alone reads it. **Import `routingcat.config.ts` from no other file,** and write the key nowhere else: a build whose output, the browser's or the Worker's, holds the key stops before Whop deploys it (D132). The site's owner mints a new one in their own terminal with `npx routingcat keys deploy --whop`, and rotates it with `--rotate`.

When a change drops one of them, `npx routingcat init` restores it, or prints the edit. Whop's AI builder keeps them through its later edits by the rules the install prompt asks it to remember.

## Declare a page

One file per routed page, in `routingcat/`, with `page`, `slot` and `variant` from `routingcat/tanstack-start`:

<!-- source: examples/tanstack-start-site/routingcat/home.ts -->
```ts
// routingcat/home.ts
import { page, slot, variant } from 'routingcat/tanstack-start'

export const home = page('home', {
  routes: ['/'],
  slots: {
    hero: slot({
      default: 'current',
      variants: {
        current: variant({ fields: { headline: 'Edit photos like a pro' } }),
        oneclick: variant({ fields: { headline: 'Pro-level photo edits in one click' } }),
      },
    }),
  },
})
```

- **A variant is made of fields,** plain values the page renders. A version is a change to them; the page's markup and code make none, so keep what is tested in the fields.
- **Routes** are the pages' paths, a dynamic segment in brackets: `/pricing`, `/blog/[slug]`, as TanStack's `$slug` route reads; TanStack's own `$slug` in a route is refused. A path belongs to one page.
- **Each new variant also takes a `description`,** saying what it tries. `reference/declarations.md` has every option.
- **Where a variant may show:** `variant()` takes `only` and `never`, conditions over dimensions, as `only: { device: 'mobile' }`, and `expect`, where it is expected to do better, as `expect: { device: 'mobile' }`; `slot()` takes `only`, and `personalizeBy`, as `personalizeBy: ['campaign']`. The site's own dimensions and audiences go in `config()`: `dimensions: { campaign: { from: 'utm_campaign', levels: { spring: 'spring_*', brand: ['brand', 'brand_search'] } } }` and `audiences: { meta_mobile: { device: 'mobile', ad_network: 'meta' } }`, which a condition names as `only: 'meta_mobile'`. `guides/conditions.md` has the rules.
- **What an event is worth:** an `objective` with a value, in `config()` or a page's `page()`, as `{ value: { trial_started: 15, purchase: 'amount' }, unit: 'USD', name: 'gross profit', cap: 1000 }`, its events the value's keys. `reference/declarations.md#a-value` has every form, and `guides/value.md` the rules.

## Render it

`useSlots(page)` gives the page's slots, each rendering the variant its visitor gets, on the server and at hydration alike:

<!-- source: examples/tanstack-start-site/src/routes/index.tsx -->
```tsx
// src/routes/index.tsx
function Home() {
  const x = useSlots(home)
  return (
    <main>
      <x.hero>{(f) => <h1>{f.headline}</h1>}</x.hero>
      <Link to="/pricing">Pricing</Link>
    </main>
  )
}
```

- **Every page renders its visitor's variants alone,** from the decision `whop()` made for its request; a click to another routed page asks RoutingCat for that page's, within a second, else shows its defaults.
- **A page TanStack Start prerenders** is a file Whop serves before RoutingCat runs, so it shows its defaults to everyone: the build warns of each (D130). Leave routed pages out of its prerender option.
- **Server functions and API routes,** under `/_serverFn/` and `/api/`, reach TanStack Start undecided.
- **A slot is routed on its own page's routes only,** so a slot of another page, as in a layout every page shares, shows its default there.

## Buy buttons

Link every buy button to the Website's checkout route, `/_rc/whop/checkout/<plan>`, never straight to `https://whop.com/checkout/plan_…`, which carries no visitor id, so that its sales are credited to no visit. Whop's AI builder writes plain links; `npx routingcat doctor` names each, with its route (D133).
- **A plain `<a href="/_rc/whop/checkout/plan_…">`,** never the router's `<Link>`, whose client navigation would never reach the route.
- **The route** creates a checkout for the plan that carries the visitor's id, then sends the buyer to Whop's checkout; back from it, the buyer lands on the route's `return`, a page of the same site, as `/_rc/whop/checkout/plan_…?return=/thanks`, else on the page they came from. The affiliate's code, `?a=`, goes with the checkout; a link with any other parameter, as a discount's `d`, goes to the plain link, uncredited. A bot, a prefetch, a visit with no visitor id, and any failure of Whop's within 3 seconds go to the plain link too, so buying never breaks.
- **No `affiliate_code` or `?a=` in a variant:** it pays a commission and changes Whop's attribution.

## Ship

The deploy is the Website's own: `whop apps deploy` from a terminal, or publishing in Whop's AI builder.
- **The build registers with the key,** `deployKey` in `routingcat.config.ts`, else `ROUTINGCAT_DEPLOY_KEY`; without either, it stops before anything else (D129), since a build without its key would decide nothing on Whop.
- **RoutingCat checks each build at the Website's address** before it counts: its build log says `HELD`, and its first visit has RoutingCat ask `https://<name>.whop.site/_rc/v1/deployment`, which `whop()` answers itself. Until the address answers with that build, the Website serves its defaults and records nothing; then its changes go live within about 2 minutes. `npx routingcat doctor` shows the check, and an address that answers with nothing of RoutingCat's (D134).
- **Its Whop payments connect themselves:** at its first visit once checked, the Website makes its webhook to RoutingCat with the credential Whop's hosting gives it, with no API key and no `npx routingcat connect whop`, which is for sites outside Whop and refuses here (D135), since a second webhook would send the account's sales twice. The connection waits for a first real sale to prove the Whop account is the owner's, since Whop's test event names no account (D58). A connection that breaks, disconnected (D59) or its signatures failing (D60), the Website repairs itself within minutes of its next visit, with no command: `doctor` shows when it has.

- **Upgrading RoutingCat:** from a terminal, `npx routingcat@latest upgrade`, then the deploy. In Whop's AI builder, which has no terminal, set `routingcat` in `package.json` to the version the docs' `changelog.md` names, install the packages again, and publish: `node_modules/routingcat/` then holds that version's skill and docs.

Check a change with the project's typecheck and a local `vite build`, which stops without the key.

## Track conversions

- **Purchases** come from the Website's Whop connection, with no code: declare `purchase` in `routingcat.config.ts`, as `objective` or among `outcomes`. `guides/whop.md` lists what the connection reports.
- **On the server,** in a server function or a server route, whose `context` is the request's, or a server `loader`, through its `serverContext`: ``routingcat.track(context, 'signup', { id: `signup:${user.id}` })``, and `await routingcat.identify(context, user.id)` where the account is created and at every sign-in, `routingcat` from `routingcat/tanstack-start`.
- **In the browser,** `routingcat.track(…)`, `routingcat.identify(…)` and `routingcat.link(…)`, without the context.
- **The calls never throw,** and never delay the response.

## When something fails

**`init` stops before changing anything** when it finds:
- TanStack Router not installed, or below 1.170.46 (D131): install the Website's packages; an upgrade is the person's call;
- no Website's address and account (D88, exit 2): the person signs Whop's CLI in, `npx @whop/cli login`, or you run `npx routingcat init --origin https://<name>.whop.site --whop-account biz_…` once they name both.

**A Whop Website's own failures:**
- **The build stops, D129:** `routingcat.config.ts` exports no `deployKey`. Ask the site's owner to mint it in their own terminal, `npx routingcat keys deploy --whop`, and put it there.
- **The build stops, naming an output that holds the key:** a file of the site's code imports `routingcat.config.ts`. Remove that import (D132).
- **Every page shows its defaults:** the Website live at its address runs no `whop()` (D134), or its build is not checked yet; `npx routingcat doctor` says which.
- **RoutingCat didn't run on a page, or a deployment never registered (D82, D83):** `src/server.ts` exports `whop(handler, { build })` from `routingcat/whop`, and `wrangler.jsonc`'s `main` names it.
- **Sales credited to no visit:** a buy button links straight to Whop's checkout (D133): link the checkout route instead.
