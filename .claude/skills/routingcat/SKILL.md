---
name: routingcat
description: RoutingCat runs experiments and adaptive routing on this website. Pages declare slots and variants, a contextual bandit routes each visitor to the variants most likely to convert, and a randomized control measures the gain. Use it for any work on the site's conversion, including trying or A/B testing headlines, copy, calls to action, sections, layouts, images or prices; showing a variant only to some visitors, devices or campaigns; optimizing for revenue, margin or what a visit is worth; suggesting what to try; reading how pages and variants are doing or where conversions come from; keeping, promoting, pausing or retiring variants; running the site's experiments for the person; wiring sign-ups, purchases and other conversions (track, identify, Stripe, Whop, Clerk, PostHog); editing routingcat/, slot markup or routingcat.config; finishing setup after `npx routingcat init`; and any routingcat command, doctor or build-log problem.
---

# RoutingCat

RoutingCat improves a website's conversion through experimentation and adaptive routing.
- The site declares the places on its pages that can vary and the alternatives for each.
- RoutingCat routes each visitor to the alternatives most likely to convert them. It is a contextual bandit, learning from the site's own conversions: once a day on Hobby, and on Pro as conversions mature, at most hourly.
- A randomized control measures what routing adds.

The person installed it because they want their site to convert better. Usually they already have ideas, precise ("I always hesitated between these two heroes") or vague ("I know the pricing page could do better"). They don't need to learn RoutingCat: you are how they use it. They say what they want, in their own words, with as much or as little direction as they like. You turn that into correct RoutingCat code and commands, and tell them what the evidence says.

Bring everything you know about copy, design, marketing, conversion, statistics and the site's own stack. This skill gives you what you can't know yet: how RoutingCat works, how to use it without mistakes, and how to read what it says.

**First:**
- **Read the site's own file before any change to its code.** This file holds what every site shares; the code is the stack's:

  | The site | Read |
  |---|---|
  | `routingcat.config` imports from `routingcat/next` | `nextjs.md` |
  | `routingcat.config` imports from `routingcat/vue` | `nuxt.md` |
  | `routingcat.config` imports from `routingcat/astro` | `astro.md` |
  | A Whop Website: `whop.app.json`, and `routingcat.config` imports from `routingcat/tanstack-start` | `whop.md`, and the Whop guide, the docs' `guides/whop-websites.md` |
  | `routingcat.config.json` names `"integration": "vercel"` or `"cloudflare"` | `html.md` |
  | `routingcat.config.json` names `"integration": "script"` | `script.md` |
  | Deploys on Vercel | `vercel.md` too |
  | Deploys on Cloudflare Workers or Pages | `cloudflare.md` too |

  A site on another stack reads the docs' copy for its kind of site, which `node_modules/routingcat/docs/index.md` lists.
- If the config declares no `objective`, setup is unfinished: read `setup.md` and follow it.
- When a command, `doctor`, a build log or a warning reports a problem, read `troubleshooting.md`.

## Where things are

- **The config,** `routingcat.config.ts`, or `routingcat.config.json` on a site whose templates carry its slots: the site, its public key, and its conversions, the `objective` and the `outcomes`. **The pages:** in code, one file per routed page in `routingcat/`, declaring its slots and variants; on a template site, in the JSON config, with each slot written in the templates' markup.
- **`init`'s plumbing,** which decides for each visit and reports what the browser showed. Routing and measurement depend on it. The site's file names it, and `npx routingcat init` restores it when a change drops it, or prints the edit.
- **`npx routingcat <command>`:** reads results and changes what's live.
- **The docs, matching the installed version:** the copy for the site's kind, such as `node_modules/routingcat/docs/nextjs/`, under the app's folder or the workspace's root. Its `index.md` maps the pages, which are online at `https://docs.routingcat.com/nextjs/<path>.md`. `npx routingcat docs <page>` prints one from the site's copy, a section with `<page>#<anchor>`, on a site with no `node_modules` too. Paths below are relative to that copy.
- **The person's dashboard:** `https://app.routingcat.com/<site>`; a Shopify store's opens from the RoutingCat app in its Shopify admin, with "Open full dashboard". It shows the same figures as the command; `guides/dashboard.md` reads it screen by screen, for when the person quotes it.
- **This skill's other files:** the site's own, above; `setup.md`, finishing setup; `experiments.md`, designing ideas, judging evidence and running experiments over time; `troubleshooting.md`, when something fails.

## How RoutingCat works

### What can vary

- **A page** is a page of the site, declared with its routes.
- **A slot** is a place on the page that can change, such as the headline.
- **A variant** is one alternative for a slot: `fields`, plain values or images that the page renders; a component with its declared `content`; or markup in a template. The site's file says which its stack takes.
- **The default** is the variant the site shows today. Every slot has one. In A/B terms it is the baseline arm. Don't call it "the control": here the control is the 10% of visitors who always see the defaults, as below.
- **A version** is one state of a variant's content: an edit makes a new one, written `@v2`, and all are kept.
- **Keys** name pages, slots and variants. Addresses join them: `home`, `home/hero`, `home/hero:oneclick`, `home/hero:oneclick@v2`.
- **History belongs to the key.** A variant's evidence and scorecards stay with its key, whatever its content becomes.
- **Slots vary independently,** so every combination of a page's variants must render and read well.

### A visit

- **RoutingCat picks** each visitor's variants before the page shows, locally, from routing data it refreshes in the background.
- **A visit** is a visitor's window, 7 days by default, from their first routed page. A visitor is a browser, known by the `rc_vid` cookie. The visitor keeps the same variants on that page for the whole visit:
  - new variants and new routing reach them at their next visit;
  - a pause or a retirement switches them to the default at once.
- **The control** is 10% of visitors, chosen at random. They always see the defaults, on every page and every visit.
- **The random slice** is 5% of routed visits. They are split evenly between each slot's variants, whatever the model believes.
- **Rendering:** the page shows what was picked through RoutingCat's slots, rendered for the visitor or carried in the page and shown before it paints, and the browser reports what it actually showed.
- **On every page, routed or not,** RoutingCat records where the visit came from.

### How routing learns

Routing is a contextual multi-armed bandit, one per page and objective:
- **The model** is a hierarchical Bayesian logistic regression on whether each visit converted. A conversion counts when the objective happens within its window after the visitor first saw the page: 24 hours by default, once per visit.
- **With a value,** the objective says what each of its events is worth, and a second model, of the same hierarchy, learns from converting visits what a conversion is worth. Routing goes for value per visit (VPV), the conversion rate times the value per conversion, in the value's own unit, as the person defines it, so a variant can lead on VPV while trailing on conversions. A conversion of unknown value teaches only that it converted.
- **Pooling:** a slot's variants are partially pooled, so early extremes shrink toward the slot's spread.
- **Slots are additive in log-odds,** so routing doesn't learn that a headline works only beside one image.
- **Personalization:** differences between kinds of visitor are more strongly regularized, so routing personalizes only where the evidence earns it, for instance if phones respond better to a shorter headline. A slot's personalization, on by default, already covers RoutingCat's own dimensions but `ad_network`; its `personalizeBy`, in code alone, adds `ad_network` or the site's own dimensions, each multiplying the slot's routing data by its levels.
- **Adjustment:** once every deployment of the site runs routingcat 1.1.0 or later, both models of a slot with personalization on adjust for each visit's ad network, the campaigns that bring the most visits and every dimension the site declares: a shift every variant shares, so variants are compared among comparable visits and a variant launched during a strong campaign's burst isn't credited with it. A slot with personalization off adjusts only for the dimensions a condition on its page names, and for none without one. Adjusting routes no one differently by itself, though the predictions it corrects move routing with them.
- **The policy is Thompson sampling, per slot.** For each kind of visitor, each variant's share follows the posterior probability that it is the best, so uncertain variants keep being tried and worse ones fade. Automatic floors keep every variant in play.
- **It refits on matured visits only,** those whose window has closed: once a day on Hobby, and on Pro as conversions mature, at most hourly. With a 24-hour window, a visit shapes routing a day or two after it starts on Hobby, about a day later on Pro, and an early conversion waits like the rest.
- **A new key starts cautiously.** It starts from what the slot's other variants taught the model, never from a guess that it is better, and its share is capped until its own evidence builds.
- **A same-key edit builds on the variant's evidence** and isn't held back.
- **A parent:** a new key declared with `parent` and `relation` (`fix`, `refine` or `fork`) starts from part of its parent's evidence.
- **Only the objective steers routing,** with what its events are worth where it has a value. Outcomes, and revenue outside a value, are reported beside it, and never optimized.
- **Changing the events or the window of a page's objective restarts that page's learning,** whether the page's own objective or the site's that it uses. Giving it a value, changing its values or removing them keeps what routing learned; a change to the values alone also keeps its scorecards and its measured conversion gain, and restates the measured value gain at the new values.
- **Conditions are rules:** a variant's `only` and `never`, or a slot's `only`, over dimensions. A variant never shows outside them; the visitors it excludes are routed among the slot's other variants, the random slice and a fixed share included, and outside a slot's `only` everyone gets the default. The default takes none. A condition is checked at the visitor's first view of the page in the visit, which keeps its variants. A conditioned variant is predicted on the visits it may show to, against the default on those same visits, and the measured gain includes the conditions.
- **Expectations are beliefs:** a variant's `expect`, one place over dimensions its slot personalizes by, makes routing start favoring it there, and the evidence corrects it. A wrong one costs some early exploring, never the ability to learn.
- **What keeps learning:** a promote changes the default and what the control sees, never what was learned; `routing=off` serves the defaults everywhere and keeps what was learned.

### What is measured

Three kinds of number, which the output labels:
- **Measured:** from randomization, without the model. The **measured gain** is a page's extra conversions of its objective from routed visits, compared with showing everyone the defaults, estimated against the control, with a 95% range, over matured visits. It includes the cost of exploring, since weak variants and cautious new ones pull it down. It is kept through a promote, as measurement continues against the new defaults. It is the only figure to call a gain. Under a value, it is the value routed visits added, a total in the value's name and unit, with its relative change in VPV and the measured conversion gain beside it, which often leaves zero first.
- **Predicted:** the model's posterior: a variant's rate and its difference from the default, relative and in points, each with a 95% range.
  - **Signal** goes from 0 to 100: New, Early, Building, Strong. It measures how much evidence is behind a prediction, not a chance of being best.
  - **Labels** say what routing does now: `favored` (shown most), `learning`, `prior` (no evidence of its own yet), and `capped` or `floor-supported` when a bound holds its share.
- **Counted:** what happened: visits, conversions, rates, revenue, shares served. It is exact, but routing showed each variant to different visitors at different times, so counted rates are no fair comparison between variants.

**Scorecards** open when a change goes live: a new variant's against its slot's default, at the same time; a same-key edit's against the version it replaced, over the two periods, so not at the same time; and for a slot with a fixed share, a measured comparison over its even split.

**Timing:**
- Deploys and acts reach visitors within about 2 minutes, and live activity shows within a minute.
- Counts and most warnings refresh every hour, and every 15 minutes on Pro.
- Learning refreshes once a day on Hobby, and on Pro as conversions mature, at most hourly. Predictions refresh after each fit, and soon after a deploy or an act.
- The measured gain refreshes once a day.

### Code, deploys and acts

- **The build registers** what the declarations say, or on a script site, the push right after each deploy, as the site's file says. A production deploy makes it live within about 2 minutes; a preview deploy registers new versions and changes nothing live; a local build or the dev server registers and records nothing, but on Cloudflare a build the person runs with `ROUTINGCAT_ENV=production` registers production once they confirm its plan.
- **The first RoutingCat line** of the build log, or of the push, reads `routingcat  LIVE …`, `NOT LIVE …` or `registered …`. A line starting `routingcat:` instead means nothing was registered: the deploy ships with the defaults and records nothing (`troubleshooting.md`).
- **Acts change what's live within about 2 minutes, without a deploy:** `pause`, `resume`, `promote`, `retire`, `revert` and `set`.
- **A production deploy applies only what its code changed since the previous production deploy,** field by field. So an act holds until a deploy changes that same field in code: after an act, make the code agree. `status` and `show` list drift, where live and code differ. Here "code" includes the config and the templates' slot markup.
- **Removing a variant:** deleting it from code retires it at the next production deploy, keeping its history. Declaring a retired key again brings it back, with its history.

### The site's plan

The plan is the site's owner's, and covers every site they own: their visitors, live variants and sites count together. A new owner starts on Hobby, and manages the plan in the dashboard's Settings → Billing; `guides/billing.md` has every detail.

| | Hobby | Pro |
|---|---|---|
| Price | $0 | $100 a month or $960 a year, after a 14-day trial once per owner |
| Sites | Up to 3 | Any number |
| Visitors on routed pages, each UTC month, people only, across the owner's sites | 10,000 | 100,000 included, then $0.001 a visitor, with an optional cap |
| Live variants, the slots' defaults not counted | 10 across the owner's sites | 100 a page |
| Counts, and learning | Every hour, and once a day | Every 15 minutes, and as conversions mature, up to every hour |
| Card | On file before routing starts, nothing charged | Charged for the plan |

- **A new Hobby site routes once its owner has a card on file.** Until then, deploys register and every visitor sees the defaults; the build log or the push reads `routingcat  NOT LIVE routing waits for a card on file: add one at …, nothing charged`, and `doctor`'s `card on file` check waits. Once the owner adds it, or starts Pro's trial, routing starts within about 2 minutes, with no deploy.
- **Past Hobby's 10 live variants, the newest are held:** registered and kept, but not served, and the build succeeds. `plan` counts them before a deploy; the build log or the push names them, `HELD …`; `status` reads `held` on the row and `· N held` on the slot; `show` reads `held by the plan`. They go live in declared order when room frees, by a retire or a pause, or on Pro or its trial. A promoted held variant becomes the default, which is never held.
- **The plan turns routing off** for a Hobby site waiting for its card, or past its visitors a second month running, and for a Pro site at its cap. Everyone then sees the defaults, and recording continues. Routing comes back by itself when the cause ends: the card or Pro, a subscription to Pro, the month's end or a higher cap. Meanwhile `set routing=on` is refused with the way out, and `status --since` shows the plan's act.
- **The owner is emailed** on Hobby at 80% and 100% of the visitors and at the 9th and 10th live variant, and whenever the plan turns routing off or on.

## Working with the person

Work the way the person works, as with any code:
- some dictate the exact headline;
- some give you a goal, such as "get more sign-ups from the pricing page";
- some hand you the whole program, such as "check in weekly and try what you think will help most". `experiments.md` covers running it.

Propose ideas when they would help. When you decide something on your own, say what you did and why. Say it in the person's terms, as an expert would, never by quoting this skill or the docs: they are how you know, not reasons to give.

What's consequential here, so you can judge what to surface:
- **A production deploy puts newly declared variants in front of real visitors** within about 2 minutes, once registered. `npx routingcat plan` shows exactly what will go live.
- **An act changes what real visitors see** within about 2 minutes, with no deploy and no code review. `--dry-run` shows what it will change.
- **Changing the events or the window of a page's objective restarts its learning.** A change to its value keeps it.
- **On Hobby, the owner's sites serve 10 live variants together.** A new variant past them is held rather than served, so plan the set within the budget, or retire before adding. The person may upgrade instead.
- **Variants are public copy on a live business.** Facts, numbers, testimonials, guarantees, prices and legal text must be true and the business's own. Reuse what the site already says, anywhere on it; anything new comes from the person. Never invent one. A claim must also hold where it shows: a paid plan's feature, headlining a free sign-up, promises more than the sign-up gives.
- **On a page the browser decides,** an arm a backend honors, such as a price, a discount or an offer, can be picked by a determined visitor, though most browse normally. Say so before varying one, then do what the person chooses (`experiments.md`).
- **Commits, pushes and deploys follow the repository's own agent instructions,** as for any change.

Leave a trail, since the next agent works from RoutingCat's records and the repository: RoutingCat labels each change with its deploy's commit message, which `show` prints, and a variant's `description` says what it tries.

## Reading results

**The commands:**
- `npx routingcat status` is the orientation, and `status <page>` shows one page.
- `show <address>` shows one variant, slot, page or version.
- `status --since <day>` shows what changed since that day.
- `sources` shows where conversions came from. It is accounting, not cause.
- `download cells --filter page=home since=2026-10-06` writes the counts by day and variant to a file, for a window such as the last 7 or 28 days. Predictions, signal and the measured gain are always the latest, whatever the window.

A page block of `status`:

<!-- source: apps/cli/test/__snapshots__/commands/status/day-9.txt -->
```text
home · objective signup, 24 h · control: the defaults, 10% · live since 10-02 · publication pb_01m4k57yc0fa9vhrhd9qpf2dm2
  gain     +9 conversions (signup) vs defaults, no range: too few visits · measured · 341 routed / 47 control visits · maturity 0.88
  hero  default write-daily · 4 live
    write-daily  default    2.2% [0.5, 3.9] · signal 3 Early · served 28% · 96 visits
    streaks      favored    2.6% [0.7, 4.5] · +19% [−100, +145] vs default · signal 3 Early · served 40% · 135 visits
```

- **`gain`** is the measured gain, with its range once there are enough visits, and the visits behind it. `maturity` is the share of those visits that have matured.
- **Each variant line** gives its label, then its predicted rate and range, its predicted difference from the default and range, its signal, its share of the slot's routed visits, and its visits.
- **Below the pages:** `tracking`, how the objective's conversions joined their visits; `visitors`, this month's on routed pages, as the plan counts them; on Hobby, `variants`, the live ones against the 10 the account's sites share, and those held; `sources`, conversions by channel; `drift`, where live differs from the code; and `warnings`. Fix any error first, since a figure built on broken tracking means nothing.

**Say each figure plainly,** with its kind and its range, the way an expert explains to a founder who knows A/B testing but not statistics: "the model predicts 16% more sign-ups, somewhere between 1% and 33% more". A range that spans zero means the direction isn't known yet. When the measured gain's range spans zero, say it is too early to tell, with its range, as the dashboard does, rather than leading with its value. RoutingCat's numbers are built to be honest, so claim nothing the range doesn't support. The traps all follow from how the data is made:
- **Compare variants by their predicted difference from the default,** never by their counted rates.
- **Predicted figures move with each fit of the model,** and early extremes shrink.
- **`favored` and signal describe routing and evidence,** not a verdict.
- **The measured gain is recomputed daily and is not a sequential test,** so acting on its first good day overstates it.
- **Pages' gains don't add up,** since one visitor sees several pages.
- **A missing value says why,** as `not matured`, `no range: too few visits` or `no_control`, and none of them means zero.

**A page with a value** leads with its measured value gain, in the value's name and unit, and the measured conversion gain beside it:

<!-- source: apps/cli/test/__snapshots__/commands/status/a-value-page.txt -->
```text
  gain     +$5,084 lifetime value [−8,421, +18,589] · +37% [−43, +192] VPV vs control · measured · 2,648 matured routed visits since 09-15 · maturity 0.98
           +25 conversions (pricing/trial_started) vs defaults [−59, +110] · measured · 5,647 routed / 654 control visits · maturity 0.98
  routed   VPV (lifetime value) $7.23, control $5.45 · conversion rate 4.0%, control 3.6% · $179 per conversion, control $152 · counted
  unknown  5.9% of conversions had no known value, each imputed at the mean per conversion of its visits that day, routed or control
  restated at the current definition, the visits of pricing/trial_started@2 valued again from their events
```

- **Read the decomposition** under each variant, as `+25% VPV (lifetime value): −9% conversions, +37% per conversion`: it says whether a variant brings more buyers or bigger baskets. Say which, with each part's range from `show`, and that a part whose range spans zero isn't known yet.
- **`unknown`** is the share of conversions whose value is unknown, each counted at the mean value per conversion of its visits that day, routed or control. A `!` on that line means the share differs between routed and control visits: a variant may be losing values, as through a checkout that drops the amount, so the value gain may be off. Find the cause before you read the gain: where too many values are missing, `warnings` names it (D155, `troubleshooting.md`).
- **`restated`** means the values changed alone, so the whole gain now reads at today's values: say so when you compare it with an earlier reading.
- **Say VPV with the value's own name,** as "VPV (gross profit)", once you have told the person what it is: value per visit, the conversion rate times the value per conversion, as they defined the value. Never say "revenue" unless it is revenue; spell out "per conversion". The measured gain stays a total in the value's name, its relative change in VPV beside it: "+$1,240 gross profit, +6% VPV against the control". A value gain whose range spans zero is too early to tell, as any gain.

**Conditions** show on a variant's line under its row, `only`, `never` and `expect`, and a slot's on its own line. A row ending `held back until your deployments run a routingcat that honors conditions` is shown to no one: one of the site's deployments still runs an older routingcat. `status` warns of a conditioned variant that no visit of the last 28 days matched (D145).

**The dashboard states no verdict** on any screen, its Analytics screen included. When the person quotes one of its figures, give them the reading, with its kind, its range and its count, as you would for `show --by`.

The detail of every line is in `guides/results.md` and `guides/value.md`; judging the evidence is in `experiments.md`.

## Tasks

### Try an idea

On a page that is already routed, first read `npx routingcat status <page>`: what is live, the evidence so far, and any drift.

1. **Shape it.** One slot per thing that varies on its own. Pieces that must match go in one slot, as parts of one variant, since routing learns no interactions between slots and every combination must render. A redesign is one slot whose variants each hold the whole layout. `experiments.md` has more shapes, and how many variants the page's traffic supports.
2. **Declare it,** as the site's file shows.
   - Today's content becomes the default, under its own key such as `current`, so the control keeps seeing today's site. A number the person names counts the ideas to try beside it: three headlines are three new keys and the default.
   - Each idea gets a NEW key: lowercase letters, digits, `-` and `_`, at most 40 characters. Give it a `description`.
   - A page with two or more live variants needs an objective, the site's or its own.
3. **Render each slot through RoutingCat,** as the site's file shows, so the browser reports what it showed. A slot read without it is served but never measured.
4. **Look at every variant before it ships,** as the site's file shows, with `?rc=` where its stack takes it: `?rc=hero:oneclick` shows a variant, `?rc=home/hero:oneclick,cta:demo` several, and `?rc=off` the defaults.
5. **Run `npx routingcat plan`,** after `push` on a site whose templates carry its slots, with what it stamped committed. It checks the code as the build or the push will, against production, and prints what will go live. Exit 0 means it will be accepted; exit 1 names what to fix. On Hobby, it also counts the site's live variants, the defaults not counted, toward the 10 the account's sites share, and marks each variant the deploy would hold.
6. **Deploy as the repository does,** with the push right after it on a script site. The `routingcat  LIVE …` line of the build log, or of the push, confirms it. On Hobby, `NOT LIVE routing waits for a card on file …` means the variants are registered and routing starts once the owner adds the card, and a `HELD …` line names variants past the account's 10.
   - After a page's first deploy, `npx routingcat doctor --wait` confirms the page is live, decided and rendered.
   - `npx routingcat preview home/hero:oneclick` prints a signed link, valid for one hour, that shows a variant in production without counting in results.
7. **Once it is live, tell the person, also when they only ask whether it is:**
   - what is live, and what the control keeps seeing;
   - how to look at each variant, with one `preview` link each in production;
   - when evidence comes: routing starts learning from a visit a day or two later on Hobby, about a day later on Pro; new variants start with a limited share of visits; the measured gain shows no range while visits are few, then a wide one. Ask them not to judge from the first good day, which overstates gains.

### Fix or refine a variant

- **Edit under the SAME key** to fix or polish. Each edit makes a new version that builds on the variant's evidence. Its scorecard compares it with the version before, over the two periods.
- **Give a different idea a NEW key,** so it is compared with the default at the same time. That is the fair comparison.
- **To run a refinement beside its original,** give it a new key declared with `parent` `oneclick` and `relation` `refine`.
- **What makes a version:** for a field variant, its fields and the images they reference; for a component variant, its own code and its declared `content`; for markup, the markup as the template writes it.
- **What doesn't:** shared styles and components, data fetched at run time or filled in by a template, and a data file the variant reads without declaring it in `content`. Keep what you test inside the variant.

### Show a variant only to some visitors

When the person asks to show a variant only to some visitors, or never to some, ask first, in their terms: **"Is this a rule, or an expectation?"**
- **A rule must hold:** the sticky bar breaks on desktop; the hero promises one campaign's offer; a claim must never reach search traffic. A rule is a condition.
- **An expectation is a belief:** "this headline should work better on mobile". As a condition, it would stop routing from ever finding out whether it is true. Recommend `expect` for it.

**A condition:**
1. **Pick the dimension and its levels** that say what the person means: `npx routingcat dimensions` lists them, the site's own included. Read the levels exactly: tablets are `other`, so "never on desktop" is a `never` naming `desktop`, which keeps tablets, while an `only` naming `mobile` leaves them out; an iPad whose browser presents itself as a Mac reads `desktop`. For a campaign, an ad or a source, declare the site's own dimension; for Meta's ads, check that their links carry a Meta source and a paid medium, as `utm_source=facebook&utm_medium=paid_social`: Meta's click id alone counts as unpaid, and a paid medium without a Meta source reads `other`.
2. **Declare it,** as the site's file shows: a variant's `only` and `never`, a slot's `only`, or an audience under `audiences` for a condition reused. Never on the default, the fallback and the control (D139).
3. **On a live variant, the act does it without a deploy:** `npx routingcat set home/hero:sticky --only device=mobile`, `--never`, and `none` to remove one, safely as any act, then write the same condition in the declaration. A condition reaches the visits that start after it: a visitor already shown the variant keeps it until their visit ends, 7 days by default. Where it must stop at once, as for a variant broken on desktop, pause it as you set the condition, and resume it once the visits under way have ended, since a variant resumed sooner returns to the visitors who had it.
4. **Run `npx routingcat plan`.** It refuses a dimension, a level or an audience the site lacks (D137, D138, D142) and a condition no visitor can match (D140), prints the conditions under each variant, and gives a slot's routing data where a condition on the site's own dimension or `ad_network`, or `personalizeBy`, multiplies it by their levels.
5. **Tell the person when it holds.** Until every deployment of the site that built, started or recorded visits in the last 72 hours runs routingcat 1.1.0 or later, previews included, a variant with a condition is held back, shown to no one (D147), and a slot's `only` shows its default to everyone. Afterwards, `status` warns of a variant no visit of the last 28 days matched (D145): a typo in a campaign's tag, or a campaign that ended.

**An expectation** is `expect`, one place, dimensions with their levels or an audience written so, never `any`, `all` or `not`. It names dimensions its slot learns by: while the slot's personalization is on, it already covers RoutingCat's own dimensions but `ad_network`, and its `personalizeBy` adds `ad_network` or the site's own (D143). `set --expectation` sets it on a live variant. Tell the person that routing starts favoring the variant there, and that the evidence corrects the belief.

**A price:** a condition or an expectation on a slot with a fixed share makes visitors see prices by who they are, which `plan` says (D146): see "Prices and plans" in `experiments.md`, then do as the person decides.

### Change what's live

| Act | Effect |
|---|---|
| `promote <variant>` | It becomes its slot's default, so the control sees it. The measured gain so far is kept, and measurement continues against the new defaults. |
| `retire <variant>` | Stops it for good, keeping its history. |
| `pause <variant>`, `resume <variant>` | Stops it, and serves it again. A pause holds through every deploy until `resume`. |
| `revert <page>` | Returns the page to what it served before its last change; `--to <pb_…>` goes back further. Conditions and expectations stay as they are. |
| `set <variant> --only`, `--never`, `--expectation` | Sets where the variant may show and where it is expected to do better; `none` removes one. |

A default can't be paused or retired: promote another variant first. A variant with a condition or an expectation can't be promoted, since the default shows to everyone: remove them first, if the person wants it everywhere. On Hobby, a pause or a retire frees room, and the variants the plan holds go live in the order they were declared; a resume or a revert past the 10 holds what it brings back.

**To act safely:**
1. Run the act with `--dry-run`. It writes nothing and prints the change and `registry version N`.
2. Run it with `--expect N`, so it refuses if the site changed meanwhile.
3. Pass your own `--idempotency-key` whenever you might retry.

**Then make the code agree,** as the site's file shows:

| After | Edit the page's declaration |
|---|---|
| `promote` | Make the promoted key the slot's default: its `default`, or in markup, the variant without `hidden`. |
| `retire` | Delete the variant. |
| `revert` | Return it to what is live. |
| `pause`, `resume` | Nothing. |
| `set` on a slot | Write the same value in the slot's settings, if they declare it. |
| `set` on a variant | Write the same `only`, `never` or `expect` in its declaration, if it declares them. |

### Routing settings

Set them with `npx routingcat set <slot or page> name=value`, or in the slot's declaration: in code, or in the JSON config's `slots`; the site's settings take no address.

| Setting | What it does |
|---|---|
| `fixed_share`, `fixedShare` in code, and `weights` | That share, 0 to 1, of the slot's routed visits is split evenly, or by `weights`, and each visitor keeps their variant across visits, even as variants are added, paused or removed. At 1, it is a classic A/B test, with a measured comparison, recommended for prices: a bandit on conversions drifts toward the cheapest (`experiments.md`). `weights` are set in code, one of them positive; a variant they leave out weighs 0 and stays out of the split. |
| `personalization=off` | One answer for everyone: no learning for whom. Refused while the slot's `personalizeBy` or its variants' expectations need it on (D148, D143); its conditions still hold. |
| `personalizeBy`, `personalize_by` in the JSON config, in code alone | `ad_network` or the site's own dimensions, at most 4: the slot learns which variant works in each of their levels. Each multiplies the slot's routing data by its levels, so prefer few; it needs personalization on (D148). |
| `floor`, `cap`, or `auto` | Bound each variant's share of routed visits. They limit exposure and guarantee nothing. |
| `control_share`, site | The control's share, 0.1 by default. |
| `random_control_share`, site | The random slice, 0.05 by default. |
| `episode_window`, site | The visit's length, `7d` by default. |
| `routing=on\|off`, site | Routing on or off for the whole site. When the site's plan turned it off, `routing=on` is refused with the way out: see "The site's plan". |

**Never lower the control or the random slice below 5% without the person's explicit agreement,** once you have told them what it costs: the measured gain compares routed visits with the control, so below 5% it is slow to come, and at 0 it can't be computed; the random slice splits routed visits evenly whatever routing believes, so every variant keeps being tried, and below 5% routing is slower to find out it misjudged a variant. `set` asks for `--confirm` before it lowers either there: `npx routingcat set control_share=0.02 --confirm`, run only once they agreed.

**A slot with `fixedShare: 1` is already a clean A/B test.** The control's visitors never enter its comparison, and the random slice applies only to routed slots. So leave the site's `control_share` and `random_control_share` as they are: changing them is the person's site-wide decision, never a step in setting up a test. In `show`, a variant's served share counts routed visits only, as the test's comparison does, so an even split reads about 50/50; where every visitor counts, as in the site's own analytics, the control's visitors add to the default, and it reads about 55/45.

See `guides/settings.md`.

### Conversions

- **Identify** where an account is created and at every sign-in, so another device's conversion still counts. Use the app's own record id, never an email.
- **Track** where the conversion happens. A server event needs an `id`, since providers deliver some events twice: the provider's event id, or `signup:<account id>`. A server event without one is dropped. Send the objective from the server where you can, since browser events can be forged.
- **Money** is `value` with `currency`, in major units: an amount in minor units goes through `fromMinorUnits` in JavaScript, or the currency's own division elsewhere, and the Stripe mapping's values come in major units.
- **Declare every name** in the config. A new outcome is a tracked event plus its name in `outcomes`.
- **A value** makes the objective say what each of its events is worth, in one unit: a number, `'amount'`, `{ property }`, `{ items }` or `'margin'`, each but a number taking `plus` for a cost per event. A number counts from any source; every other form only from the server or a connection, so a browser's or PostHog's event counts at its number or as a conversion of unknown value. Give a value to pages whose variants can change what is bought, before the page routes where you can, since the measured value gain starts with it; routing keeps what it learned when a value is given or changed. `setup.md` proposes the values, and `guides/value.md` has the rules.
- **The calls and the recipes** are in the site's file and the docs' tracking guides; `setup.md` wires the first ones.
- **When tracking broke,** fix the call, then record the interval, so its visits count as unknown rather than as no conversion: `npx routingcat gap signup --from 2026-10-10T08:00:00Z --to 2026-10-11T09:30:00Z --note 'a deploy dropped the call'`.

## Commands

| Group | Commands |
|---|---|
| Setup | `init`, `login`, `doctor [--wait]`, `keys server` or `keys deploy` `[--rotate]` (the production deploy key with `--branch <production branch>`; `--revoke` stops the environment's deploy keys at once, as for a leak), `link github`, `members`, `domains`; the last four are the owner's |
| Read | `status [page] [--since]`, `show <address or id> [--by device\|traffic_source\|visit\|time_of_day\|day_type\|ad_network\|<the site's own dimension>]`, `sources [page] [--since] [--by]`, `download <report>`, `dimensions`, `audiences`, `docs [page]` |
| Act | `pause`, `resume`, `promote`, `retire`, `revert <page> [--to]`, `set` (on a variant, `--only`, `--never` and `--expectation`), `gap` |
| Deploy | `plan [page]`, `push [--check]` on a site whose templates carry its slots, `preview <variant> [--path]` |

- **Writes:** every write takes `--dry-run`, `--expect` and `--idempotency-key`.
- **Keys are secrets.** The person runs `keys` in their own terminal and puts the value where it goes, so a key never passes through the conversation, a file of the repository or a template. A deploy key shows only when minted or rotated.
- **JSON:** `--json` gives every field, such as `registry_version`, the ranges, drift and each warning's id. Read the text for orientation and the JSON for exact values.
- **Exit codes:** 0, done; 1, failed or refused, with a message id; 2, usage; 3, waiting on a person or on time, so relay what is needed, then run the same command again; 4, RoutingCat unreachable from here, as in a sandbox without network.
- **The rest:** `reference/cli.md`.

## Read more

- `experiments.md`, before you design what to try, judge results or run experiments for the person.
- **The docs,** whose `index.md` maps every page: `how-it-works.md`; `concepts/numbers.md` and `guides/results.md` for every figure; `guides/build-a-page.md` and `guides/ship-changes.md`; `guides/conditions.md` and `guides/value.md`; `guides/acting.md` and `guides/settings.md`; the tracking guides; `operate/upgrade-to-1-1.md`; and `reference/declarations.md`, `reference/sdk.md`, `reference/limits.md` and `reference/messages.md`.
<!-- routingcat skill 1.1.0 sha256:b2c7f256fe1888ab4cdae74af4cb9eaa2594649f5852342938f85af2f8b1f4c8 -->
