# RoutingCat on a script site

This site runs RoutingCat through its own script: the page decides, in the browser, from routing data RoutingCat publishes. `SKILL.md` holds what every site shares; this file holds the code. The docs' copy for this site is the `script` one: `npx routingcat docs <page>` prints a page of it, and a section with `<page>#<anchor>`. Paths below are relative to it.

## What `init` set up

- **`routingcat.config.json`:** the site, its public key, `"integration": "script"`, the RoutingCat version the site runs, the files its slots are written in (`sources`), its pages, and its conversions.
- **The head partial,** first in `<head>` after the charset and viewport tags, as `init` placed it, on every page that can vary, through each stack's own include line. Never edit it, but to give its script tags the page's `nonce`, which `push` keeps: `push` rewrites it. Plain HTML pastes it, and pastes it again after each push.
- **The version pin,** `"routingcat"` in the config, since each version writes its own partial. `npx routingcat` runs the pinned version itself for `push`, `plan`, `doctor`, `docs` and `init`, saying so in one line; where npx can't fetch or run it, the command stops with exit code 2 (D106). To move the site to the latest version, `npx routingcat@latest upgrade` sets it in the config; then set it in the CI's steps, run `push`, and commit.
- **Server helpers,** where the person chose them (`init --helpers`, PHP, Laravel, Rails and Django): a cookie helper that keeps the visitor's id for 400 days, where Safari would keep the script's for 7. On Laravel, `rc_vid` goes in `EncryptCookies`' exceptions, or the app reads it as null: `init` adds it, with the helpers or without, where `init` puts it, or prints the edit where it finds neither `bootstrap/app.php`'s `withMiddleware` nor `EncryptCookies.php`'s `$except`, or both (D32); `doctor` fails its cookie check until one of them holds it.

## Declare a page

A page is declared in `routingcat.config.json`, with its key, routes and URL, and its objective if not the site's. Its slots are written in the templates' markup, every variant in the page:

- **The container** carries `data-rc-page` and `data-rc-slot`, literal keys, never template expressions. It is a `div`, or a `span` inside a paragraph.
- **Every child is a variant,** with `data-rc-variant`. Only whitespace and comments go between them.
- **Exactly one variant has no `hidden`:** the default, today's content. Every other variant carries `hidden`, written alone, never `until-found`, and no `display` in its `style`.
- **`push` writes the rest:** each variant's `data-rc-hash`, `style="display:contents"` on the container and the default, and `data-nosnippet` on hidden variants. It never touches `hidden`. Commit what it changes.
- **Inside a variant:** no running scripts, styles or JSON-LD, no duplicate ids, at most one `h1`, and nothing per visitor. Images are `loading="lazy"`, never `fetchpriority="high"`, with `data-rc-lcp` on the one main image of each variant.
- **A `<template>` variant,** with `data-rc-as="span"` inside a paragraph, suits variants with many elements, on pages that don't hydrate.
- **A client-rendered app,** such as a React app built with Vite, writes its slots in HTML files its components render, and a component that depends on the pick waits on `window.routingcat.ready()`, then reads `variant()`: `guides/client-apps.md`.

Each new variant's `description`, saying what it tries, goes in the config's `variants`, under the variant's address, as `"home/hero:learns": { "description": "…" }`, beside its `parent` and `relation` where it has them. The rules, the example's markup and the head partial are in `guides/build-a-page.md`.

**Where a variant may show,** in the config: under `variants`, a variant's `only` and `never`, conditions over dimensions, as `"only": { "device": "mobile" }`, and its `expect`, where it is expected to do better, as `"expect": { "device": "mobile" }`; under `slots`, a slot's `only` and `personalize_by`, as `"personalize_by": ["campaign"]`; and at the top, the site's own `dimensions`, as `"campaign": { "from": "utm_campaign", "levels": { "spring": "spring_*", "brand": ["brand", "brand_search"] } }`, and `audiences`, as `"meta_mobile": { "device": "mobile", "ad_network": "meta" }`, which a condition names as `"only": "meta_mobile"`. `guides/conditions.md` has the rules.

**What an event is worth:** an `objective` with a value, the site's or a page's, as `"objective": { "value": { "trial_started": 15, "purchase": "amount" }, "unit": "USD" }`, its events the value's keys. `reference/declarations.md#a-value` has every form, and `guides/value.md` the rules.

## Look at every variant

On a host the config lists in no environment, such as `localhost`, the script runs in development mode: `?rc=hero:learns` shows a variant, `?rc=home/hero:learns,subhead:short` several, and `?rc=off` the defaults, for the tab, with a badge. Run `push` after each edit, since the partial carries the declarations. Nothing is recorded, and `track` logs to the console. A host listed under `environments.preview`, such as staging, records to the preview environment instead, out of results, and a push from another branch, through the GitHub link or with the preview key, registers that preview's markup.

## Ship

A script site registers with `push`, which needs a credential. Run `push` after any change to the markup or the config, the objective included, and commit what it changes: the partial names them all, so a stale one fails `push --check` (D71). From a deploy that changed the templates until about 2 minutes after its push, those pages show their defaults and record no decision, and `doctor` names them (D89).
- **In CI:** `push --check` before the deploy, which asks nothing of RoutingCat; then `push` right after it. CI's steps name the pinned version, `npx routingcat@<version> push`, as `init` prints them, and move with the config's pin. A push before the deploy could publish variants that never ship if the deploy fails.
  - **On GitHub Actions, `npx routingcat link github`,** the owner's, links the repository its `origin` remote names, so its runs prove themselves with no secret. It stays pending until, within a day, a run calls `push` in a job with `permissions: id-token: write` (D116). Production registers on the production branch's `push`, `workflow_dispatch`, `schedule` or `repository_dispatch` runs; other runs register a preview.
  - **Otherwise, the deploy key,** `ROUTINGCAT_DEPLOY_KEY`, which the site's owner mints in their own terminal with `npx routingcat keys deploy --branch <production branch>`. It serves that branch only, which `push` reads from the CI's own variables, on GitHub Actions, GitLab, Bitbucket, CircleCI, Jenkins' multibranch pipelines, Azure Pipelines, Buildkite, Cloudflare's builds, Netlify and Vercel, and elsewhere from `ROUTINGCAT_BRANCH`, which a CI RoutingCat reads ignores: a Jenkins job outside a multibranch pipeline, or Azure over TFVC, names no branch. Another branch's run, or one that names none, is refused (A17); previews take the preview key, `keys deploy --env preview`.
- **On a host that deploys on its own,** such as Forge, Ploi or a deploy hook on the server: `push` at the end of the host's deploy script, once the server serves the new templates, with the deploy key and `ROUTINGCAT_BRANCH` in its environment, as `ROUTINGCAT_BRANCH=$FORGE_SITE_BRANCH npx routingcat push` on Forge. `push --check` stays before the deploy, in CI or before the commit.
- **From a machine,** with no CI or deploy script that pushes, right after each deploy: `npx routingcat push --env production` prints the edits and the plan, then ends with exit 3 and the plan's digest. Show the person the plan as it printed, even when they already said to go ahead, and only once they agree to it run it again with `--confirm <digest>`: the plan can hold what neither of you expected. A plan that changed since has another digest, and nothing is pushed.

What each push makes live, and the preview links, are in `guides/ship-changes.md`.

## What the page decides, and its limits

- **The core is inline in the partial;** its post part and the routing data come from RoutingCat's CDN. Routing data is kept for a day and refreshed after 60 seconds.
- **A first view waits** up to `wait_ms`, 1,000 ms by default, for routing data, then shows the defaults for the visit.
- **A blocked script shows the defaults,** unrecorded, and an old browser the defaults, uncounted.
- **Each page's routing data has a limit,** 128 KB, with a warning at 96 KB. Past it, the page serves its defaults, unrouted (D118).
- **A condition over `ad_network` or the site's own dimension, and `personalize_by`, multiply a slot's routing data by that dimension's levels:** keep such dimensions to very few levels here, and read `plan`'s sizes.
- **Routing data is public.** An arm a backend honors, such as a price or a discount, can be picked by a determined visitor: say so before varying one, then do what the person chooses (`experiments.md`).
- **A visitor's id lasts 7 days in Safari** without the cookie helper.
- **Decisions are replayed** to check them, and results from the page carry `verification: unverified` (D98).
- **Acts reach a returning visitor from their next page.** Routing off swaps pages whose routing data is over 5 minutes old.

## Track conversions

- **In the page:** `window.routingcat.track(name, …)`, `identify(accountId)` and `link(url)`, from the partial. They queue until the post part loads, post to RoutingCat's ingest, which accepts them only from the site's domains (D93), and are never retried.
- **From the server:** the HTTP events API, with the server events key from `npx routingcat keys server`, the `rc_vid` cookie's value as the visitor, and an `id` on every event. Its fields are the API's own, `visitor_id` and `occurred_at`, never `visitorId`: it refuses an event with a field it doesn't take, naming the field meant, and the site's own data goes in `properties`.
- **PostHog:** `before_send: window.routingcat.routingcatProperties` in PostHog's `init` puts the visitor id and the slots the page shows on every event. A page view's first `$pageview` can still go without them, captured before RoutingCat's post part loads. A page whose layout leaves out the partial has no `window.routingcat`, so its `init` takes no hook: `guides/posthog.md`.
- **Stripe:** the owner runs `npx routingcat connect stripe` once, or Connect Stripe in the dashboard, and installs RoutingCat in Stripe themselves, choosing the account, with no webhook code. The server, in whatever language, creates each Checkout Session with `metadata: { rc_vid }` from the request's cookie, on the session and in `payment_intent_data` or `subscription_data`, and `rc_return=stripe` on `success_url`, with a signed-in buyer's account id beside it as `account_id`, which `npx routingcat connect stripe --account-key account_id` names to the connection. A Payment Link takes `?client_reference_id=` and the cookie's value: `guides/stripe.md`.
- **Whop:** the owner runs `npx routingcat connect whop` once, in their own terminal, with no webhook code. The server, in whatever language, creates each checkout configuration through Whop's API with `metadata: { rc_vid }` from the request's cookie and `rc_return=whop` on `redirect_url`, then sends the buyer to its `purchase_url`. For Whop's embedded checkout, the server hands the configuration's id to the page, whose script creates it with `WhopElements().checkout.create({ checkoutConfiguration, returnUrl })`, `rc_return=whop` on `returnUrl`; an element `metadata` of its own replaces the configuration's, so it carries `rc_vid` too. A plain `https://whop.com/checkout/plan_…` link, which Whop's AI website builder puts on every buy button, carries no visitor id, so its sales can't be credited; replace each one with such a checkout: `guides/whop.md`.

The calls and their rules are in `guides/tracking.md`.

## When something fails

- **`init` stops:** D74, where a server-rendered site names no host, or D88, the production address. D87 says why a site is a script site, and stops nothing. A site moved here from Vercel or Cloudflare with `--host none` is bound to no host once its plan is applied, as a site set up here is, and its old host's builds register it no more (A44).
- **The markup or a push:** `push` names the file and line (D66 to D70); D71 means stale stamps or partial; D72, no credential; A17, a credential refused, with its reason, such as a link expired or another branch's key; D106, the pinned version that npx can't fetch or run; D83, a deployment no push registered. D116, a link still pending, comes from `link github` and `doctor`.
- **The served pages:** the partial missing or stale (D89, D106), its policy (D92: the page's `nonce` on the partial's script tags, or the core's hash, which an upgrade can change), domains (D93, D94), replay (D98), caches and Cloudflare's features (D105, D113), the limit (D118), and the browser forms of D13, D19 and D20.
- **Each check `doctor` runs,** and what it means, is in `operate/troubleshooting.md`.
