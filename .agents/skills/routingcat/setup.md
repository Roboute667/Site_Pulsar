# Setting up RoutingCat

`npx routingcat init` made the mechanical changes:
- the `routingcat` package, or on a script site the version its config pins;
- the plumbing that decides each visit and reports what the browser showed, which the site's file in this skill names, such as `nextjs.md`;
- the config, `routingcat.config.ts` or `routingcat.config.json`, with the site and its public key;
- this skill;
- where the person chose it, a note in `AGENTS.md`.

What remains takes judgment:
- what counts as a conversion;
- wiring it so every conversion reaches its visit;
- checking the change and verifying it in production;
- leaving the person oriented.

Setup is unfinished while the config declares no `objective`, and done once the conversions are declared and deployed. One real conversion confirms it end to end: recommend it, and let the person choose (step 7).

This is the person's first experience of RoutingCat. They should end knowing three things: their site is safe, RoutingCat works, and using it from here is as easy as asking you. The docs' tutorial, `get-started/setup.md`, shows each step with real output.

The person may come from the dashboard's onboarding screen, which has them start you in their repository with a request that runs `init`. The site starts on Hobby, at no cost. A plan they chose on routingcat.com applies at the card's step, below: Hobby's card, or Pro's trial.

## 1. Read what `init` did

Read the end of `init`'s output, or run `npx routingcat init` again. It marks with ✓ what is done, does only what is missing, and never overwrites an edit.

| `init` ended with | Do this |
|---|---|
| A printed edit, for a file too unusual to edit safely | Make the edit exactly as printed, then run `npx routingcat doctor`, which checks it. |
| `Ask the person: "Add a two-line note to AGENTS.md…"` | Ask it with the conversion questions in step 3, and say it is recommended. Agents read `AGENTS.md` in every session, but may open this skill only when a request matches its description. If the person agrees, run `npx routingcat init --agents-md`. |
| Exit 3 and a sign-in link | Give the person the `https://app.routingcat.com/device?code=…` link. Once they approve it, run the same command again, which continues with the same code. |
| Exit 3, from a read-only sandbox that can't keep a sign-in | The person runs `npx routingcat login` in their own terminal, then you run the command again. |
| Exit 4 | RoutingCat can't be reached from here, as in Codex's default sandbox. Allow network access for the command, or ask the person to run it. |
| `This folder is not linked to a Vercel project`, in a Next.js app | Ask the person where it runs. On Vercel, run `npx vercel link`, then `init` again. On their own Node.js server, with `next start`, run `npx routingcat init --host node --origin <its production address>`: `npx routingcat docs operate/node-server` shows the build's credential, how to serve, and Cloudflare in front. |
| `Next:` naming `keys deploy` or a key to set | Give the person the command: the site's owner mints the key in their own terminal and sets it where it goes. Never run `keys` yourself. |

**`init` stopped before changing anything:** its message gives the fix, such as a framework's upgrade command, a host's link or sign-in, the app's own folder, or the install command. The site's file, and the host's, list the cases. A framework upgrade or a rename changes the person's app beyond RoutingCat, so treat it as you would any such change. Once it is done, run `init` again.

Show the person what `init` changed, `git diff`, in a sentence or two:
- RoutingCat's plumbing, nothing else;
- nothing reaches visitors until a deploy;
- visitors see no change at all until a page is routed;
- their site now shows in their dashboard, at the address `init` printed, `https://app.routingcat.com/<site>`; a Shopify store's opens from the RoutingCat app in its Shopify admin, with "Open full dashboard".

## 2. Find how the business converts

Read the code, starting from the tools `init` detected: auth, such as Clerk, NextAuth, Supabase or the framework's own; payments, such as Stripe, Whop or Paddle; PostHog. Where sign-ups or payments happen in another app or repository, such as an app on a subdomain, note it: you will hand the person what to add there. Look for:
- where accounts are created, and where the app first loads the signed-in user;
- where checkouts start, plain links to `https://whop.com/checkout/` included, and where payment webhooks run;
- the `posthog.capture` calls;
- forms: waitlists, demo bookings, contact.

From these, understand the funnel: what a visitor does that matters to this business, and where in the code it happens.

## 3. Choose the conversions

**The objective** is the main conversion, the one thing routing learns to get more of. It defines what RoutingCat optimizes, so confirm it with the person, unless they already told you. Recommend one, with the reason:
- **Soon and often.** It counts only within its window after the visitor first saw the page, 24 hours by default, and routing learns only from visits whose window has closed. An event that happens soon after a visit, and often, teaches fastest.
- **Recorded by the server.** It is the one to trust, since browser events can be forged.
- **For a SaaS with trials, sign-up or trial start,** with purchase tracked beside it. A payment at a trial's end comes days or weeks after the visit: the default window misses it, and a longer one delays learning by as much. A longer window, up to the visit's 7 days, reads `{ events: 'signup', window: '48h' }`.
- **Several events where any one counts,** once, such as any plan start: `objective: ['trial_started', 'monthly_started']`.

**The outcomes** are tracked beside it: counted and reported, never steering routing. Revenue comes with an outcome's `value`.

**A value,** where the site's variants can change what is bought, as plans, prices, products or offers: the objective then says what each of its events is worth, and routing optimizes value per visit (VPV), the conversion rate times the value per conversion, in the value's own unit, as the person defines it (`guides/value.md`). Where every conversion is worth the same, as a waitlist's, propose none: it would only add noise. Propose one as an expert would:
- **Walk the person through what it counts:** what a conversion leaves the business. For orders, where margins aren't at hand, go down this ladder, taking the first step you can:
  1. **Real margins.** Look for costs where they live, the product catalog, the code or a file the person has, or ask for them. A table of each product's margin values them, and on a Shopify store's purchases, `'margin'` counts each item's price less its cost, which RoutingCat's Shopify app records.
  2. **An average margin:** one rate for the products without a cost, applied to their revenue, less shipping, which is `otherwise` with `plus`, as `{ margin: true, otherwise: 0.4, plus: -6 }`, or an items table's. Say why it comes before the next step: revenue less shipping counts every dollar of sales as profit, so shipping weighs too little. At a 40% margin, a $50 order earns $20, and $6 of shipping takes a third of it; revenue less shipping scores it $44 and takes off about a tenth.
  3. **Revenue less shipping,** `{ amount: true, plus: -6 }`, where no margin can be estimated: a partial correction, in the right direction.
  4. **Revenue, conversions or another value** the person chooses.

  Shipping is always what it costs net of what customers pay for it. No acquisition cost goes in a value: costs already paid for the visit stay out, since ad spend is paid before routing acts, and a cost per order for it would only penalize conversion gains. A cost per order, `plus`, is what fulfilling the order costs.
- **Values from what you find.** On Stripe, a `purchase` within the window is worth its amount, `'amount'`, or each plan's lifetime value by its price's id, `{ items: { 'stripe:price_…': … } }` with the price ids the checkout code names; Whop's plans are `whop:plan_…` the same way. A trial's start carries no amount. Stripe's names its plan by the same price ids, each at what one unit charges per period once the trial ends, so a table values each trial by what a trial of its plan is worth, and `otherwise` a plan the table leaves out at a share of its price. Whop's names no price, so it takes a number: what a trial is worth on average. On a Shopify store, the orders' history gives what an order is usually worth.
- **Plans with a trial:** the payment comes after the trial, past the default window and the visit's 7 days, so value the trial's start: on Stripe by its plan, `trial_started: { items: { 'stripe:price_…': … } }`, as above, except a plan whose prices all charge by usage or by tiers, whose trials name no items and take a number. On Whop, a number counts every trial alike, which steers as conversions do: say so.
- **Fill in lifetime values with the person,** from their numbers, with these formulas, showing the arithmetic:
  - a monthly plan's lifetime value ≈ its price × the gross margin ÷ the monthly churn;
  - an annual plan's ≈ its price × the gross margin × (1 + its expected renewals), in the same unit as the monthly one;
  - a trial's ≈ its trial-to-paid rate × its plan's lifetime value.

  A value is what the business keeps, so a lifetime value or a margin beats a price where they know it. Never invent a number: theirs, or the prices as they are.
- **Propose a cap,** the most one visit counts for, so that a wholesale order, an enterprise deal or a value sent in cents as dollars never steers the page. Before any value has counted, propose one near the largest ordinary order or plan, or none. Once enough visits have converted with a known value under the objective's current values, across the pages that use it, `npx routingcat status <page> --json` proposes one from the site's own history, one figure for the objective, `results.progress.value.proposed_cap`: its `value`, the percentile its `quantile` names of what those visits were worth before any cap, and the `visits` it rests on. Offer it, saying that a new cap is a change of values: routing keeps what it learned, and the measured value gain is restated at the new cap.
- **Say the window's trade-off:** the default 24 hours misses a purchase on day three, and a longer window, up to the visit's length, delays learning by as long.
- **Name it** as the business does, `gross profit` or `lifetime value`, in its currency's code as `unit`, or a word such as `points`.
- **Check that values can arrive:** amounts, properties, items and margins count only from the server or a connection, so the valued events must come from there. `plan` says when none has yet (D153), or when no connection sends the costs a margin needs (D154). Once they arrive, `status` and `doctor` warn when too many of a page's conversions have no known value, naming the cause (D155): for products without a cost, ask the person for the missing values down the ladder above, real costs first, as `troubleshooting.md` says.
- **Give it before the first page routes, where you can:** the measured value gain starts from the deploy that gives an objective its value. Routing keeps what it learned when a value is given or changed later.

**Ask in one go, before wiring anything,** since the answers decide what you wire, with the note's question when `init` left it. Ask as an expert would, with the reason in the person's terms, never by citing these instructions.
- **With a question tool that allows several answers,** such as Claude Code's `AskUserQuestion` with multi-select, ask there, with at most four choices per question. Where you propose a value, ask in the same go for what the formulas need and you can't find: their margins, churn and share of trials that pay.
- **Otherwise, a numbered list:** `Main conversion, pick one: 1 Sign-up (recommended) 2 Trial started 3 Waitlist. Also track, pick any: 4 Trial started 5 Purchase 6 Waitlist 7 Demo booked. Reply like "1, 4, 5".`

Name each choice by what happens and where its code is. The person may answer in their own words, with outcomes the list lacks.

## 4. Wire each one

Two calls: **identify** links the visitor to an account, where the account is created and where the app first loads the signed-in user, at every sign-in, so a conversion on another device still counts; **track** reports the event. The site's file gives them and where each situation puts them, under "Track conversions", with the docs' recipe for each. Copy the recipes' code from the docs: it is the example apps' tested code.

**The rules,** each of which loses or corrupts conversions when broken:
- **The account id** is the app's own record id, or the SHA-256 of the trimmed, lowercased email where there is no record. Never an email.
- **A server event needs an `id`** naming the conversion itself, such as `signup:<account id>`, or the key RoutingCat's Stripe mapping gives each payment. A server event without one is dropped. Events are kept once per name and `id`, so retries are safe.
- **`value` with `currency`** is money in major units, `29.99`. An amount in minor units, such as cents, goes through `fromMinorUnits(amount, currency)` in JavaScript, or the currency's own division elsewhere; the Stripe mapping's values come in major units.
- **What Stripe knows,** its payments and its subscriptions' trials, renewals and cancellations, comes through RoutingCat's Stripe connection, whose mapping gives each the key that keeps it counted once: never send it as the server's own events, a trial's start included. Offer the connection wherever the site takes payments with Stripe, as `init` does when it finds Stripe's package (D114): it needs no webhook code. The owner connects it: give them `npx routingcat connect stripe` to run in their own terminal, or Connect Stripe under Payment connections in the site's settings on the dashboard. Either opens Stripe's page, where they install RoutingCat and choose the account themselves; never install it or choose the account for them. Your part is the checkout, which carries the visitor id, as the site's file says. On Next.js, a site that would rather run that mapping in its own webhook takes the docs' Stripe recipe instead: one or the other, never both.
- **What Whop knows,** its purchases, renewals and refunds, and its memberships' trials and cancellations, comes through RoutingCat's Whop connection: never send it as the server's own events, a trial's start included. Offer the connection wherever the site sells through Whop, whether `init` found Whop's package (D114) or you found its checkout links: it needs no webhook code. The owner connects it: give them `npx routingcat connect whop` to run in their own terminal, with a Whop API key they make in Whop's dashboard with `developer:manage_webhook`, typed when the command asks or in `ROUTINGCAT_WHOP_KEY`, RoutingCat's own variable, apart from the key the site's code uses for Whop. The key is the seller's: never ask for it, handle it or print it. RoutingCat checks it once with Whop to prove the account is theirs, and keeps it only with `--reconcile`. An exit 3 from `connect whop` run without the key, or from `doctor` on the connection (D58), waits on the owner: relay what it asks of them. Your part is the checkout, which carries the visitor id, and replacing every plain checkout link, whose sales can't be credited, as the site's file says.
- **In development** RoutingCat's calls log, record nothing, and say so. A server calling the HTTP events API records with the key it holds, so its development and staging take the preview key.
- **The objective comes from the app's own code,** even when PostHog captures the event too: a server event, which doesn't wait on PostHog's delivery. Other outcomes the app already captures in PostHog come through a destination, as below, rather than a second call.

**The PostHog destination** forwards one event to `https://ingest.routingcat.com/v1/events`. It carries the production server events key as a bearer token, and is filtered to that event and to the production hosts through `$host`. Its JSON body and settings are in `guides/posthog.md`. Create it the way your session allows:
- **Through PostHog's MCP server, if connected:**
  1. Create it with `"enabled": false`, since PostHog refuses an agent's destination enabled before it is tested.
  2. Run its test invocation, which sends nothing to RoutingCat.
  3. Enable it. If PostHog keeps it as a draft, ask the person to publish it.
- **With a personal API key holding `hog_function:write`,** if your session has one: post the body to `https://us.posthog.com/api/projects/<project id>/hog_functions/`, or `eu.posthog.com`.
- **Otherwise,** print its settings for the person to add in PostHog, about two minutes of their time. Don't ask them to make a key for it. Tell them to skip PostHog's test, which RoutingCat would record as a real event.

Declare the outcome under PostHog's name for the event.

## 5. Declare them

Add the objective and the outcomes to the config, beside what `init` wrote, keeping its import. Never change `site` or `publicKey`, `public_key` in `routingcat.config.json`. The example app's, in `routingcat.config.ts`; `routingcat.config.json` takes the same fields, as `"objective": "waitlist"`:

<!-- source: examples/nextjs-site/routingcat.config.ts -->
```ts
// routingcat.config.ts
export default config({
  site: 'routingcat-example',
  publicKey: 'pk_routingcat-example_NcMQQWyZ', // public: names the site; write-only
  objective: 'waitlist', // the main conversion: joining the waitlist, on the home and pricing pages
  // tracked beside it: a paid first month, from Stripe's checkout webhook; "Talk to us" on /pricing,
  // captured in PostHog and forwarded by a PostHog destination
  outcomes: ['purchase', 'contact_sales'],
})
```

- **Names** are 1 to 64 characters, without `+`, `/` or a control character.
- **An undeclared name's events** are recorded, but not analyzed until declared.
- **No page yet:** a page comes with the first idea.
- **Declare every outcome you wired,** those a PostHog destination or a Stripe or Whop connection the person is adding will send included, and none that nothing will send, as a provider's where the person doesn't connect it.
- **A value** replaces the objective's events with its value's keys: in code, `objective: { value: { trial_started: 30, purchase: 'amount' }, unit: 'USD', name: 'lifetime value', cap: 1000 }`; in `routingcat.config.json`, the same in JSON. `npx routingcat plan` prints the value it read, an event a line, and refuses a unit, a cap, a property or an item that is not one (D149 to D152): show the person that block.

## 6. Check and deploy

**Check the change as you would any other:** the project's typecheck, lint and tests, and a local build where the project builds locally. A local build registers nothing without `ROUTINGCAT_ENV=production`, and its RoutingCat line says so. On a script site, run `push` after declaring the conversions and commit what it changes, since the head partial carries them, as the site's file says.

**Tell the person in a few lines:**
- what changed;
- anything that waits on them, such as Stripe's connection to install, `connect whop` to run, a destination to add in PostHog, a webhook endpoint, a snippet for another app, a host's setting or a CI secret;
- where to follow it: their dashboard, `https://app.routingcat.com/<site>`, or for a Shopify store "Open full dashboard" in the RoutingCat app in its Shopify admin.

Commit as the repository's rules say. The person deploys the usual way, or you do where the rules allow.

**The production build log, or on a script site the push after the deploy, confirms it registered:**

```
routingcat  registered ch_1 · objective signup · outcomes newsletter · no page routed yet
```

A line starting with `routingcat:` instead means the build registered nothing: visitors get the defaults and nothing is recorded, though the build ships. `troubleshooting.md` gives the fix.

A site on Vercel behind a Cloudflare zone turns on the zone's visitor location headers: the domain → Rules → Settings → Managed Transforms → "Add visitor location headers". On Workers and Pages, Cloudflare gives the location with no setting.

## 7. Verify in production

Once the deploy is live, run `npx routingcat doctor --wait`. It requests the production page, so the new deployment starts, then waits up to 5 minutes, printing each check as it passes. On a script site, whose pages decide only in a browser, it names a page for the person to open. Under Claude Code, give that Bash call a timeout of 360000 ms; Codex and Cursor move long commands to the background.
- **Exit 0:** every check passed.
- **Exit 3:** a check still waits, usually for the objective's first event, for the card on file, or for a payment connection the owner hasn't finished, Stripe's install or Whop's `connect whop` (D58).
- **Exit 1:** a check failed, with its message: see `troubleshooting.md`.

**Recommend one real conversion; the person chooses.** It is the only end-to-end proof that a conversion reaches RoutingCat and joins its visit. It is recorded as a real one, and until a page routes, it is credited to no variant. Where converting costs money, as an order does, say so plainly, and that it is optional.
- **If they make one,** they convert once on the production site, starting from a page RoutingCat runs on, as a visitor would, such as signing up with a second address. Where sign-up lives in another app, they start from the site's link to it: a sign-up opened straight from the app's address carries no visitor, and joins no visit. It shows within a minute: run `npx routingcat doctor` again. A conversion taken from PostHog arrives once its destination is in place.
- **If they skip it,** nothing waits on it but the objective's check, which passes with the first real conversion, a visitor's included: `doctor` exits 3 on it until then, which is expected.

**On Hobby, routing waits for a card on file,** and nothing is charged. `doctor`'s `card on file` check waits for the site's owner, with the link to the dashboard's Settings → Billing.
- The owner adds it there, or starts Pro's 14-day trial. Only the owner can, so a member asks them.
- Recording works without it, so setup's checks of the conversions don't wait on it. But no page routes until it is there.
- Once the card is on file, routing starts within about 2 minutes of it, with no new deploy.

Until a page is routed, conversions read as not yet credited to a variant: that is expected. After the next counts refresh, the tracking line of `npx routingcat status` shows how conversions join their visits.

## 8. Close

Close once the conversions are declared and deployed: in the reply where `doctor` shows the objective's first real event, or, if the person skips it, in your reply to that. Use your own words and the person's terms, with no glossary and no menu of commands. The close carries each of these:
- **That it works,** naming the conversion that came through. Without one, say what `doctor` confirmed, and that the objective's check passes with the first real conversion: until then `doctor` exits 3 on it, which is expected, and nothing else waits on it.
- **That their visitors see no change,** and won't until a page is routed and deployed. On Hobby without a card on file yet, add that routing will start once the owner adds one in the dashboard, with nothing charged.
- **What RoutingCat now records:** where visitors come from, and the conversions you wired. Say which one routing will optimize and why; it is easy to change now, and later a change restarts learning on routed pages.
- **How it goes from here.** They tell you what they would like to try, at any level of detail, or ask you for ideas, or hand you the whole thing. You write the variants, check each one renders, and show what will go live, the way they like to work. Then RoutingCat sends more visitors to what converts better.
- **The control,** in one sentence, since it touches what they see on their own site: 10% of visitors keep seeing the current site, which is how the gain is measured honestly.
- **That early numbers are noisy,** and you will always say how sure they are.
- **Their dashboard:** `https://app.routingcat.com/<site>`; a Shopify store's opens from the RoutingCat app in its Shopify admin, with "Open full dashboard".

If you have seen something worth trying first, offer it concretely. For example: "your home page's headline is a good first candidate; I can draft three alternatives that lead with what's different about Lumen".

Lumen's close, for instance:

> RoutingCat is set up on your site, and it works: the sign-up you made at 14:32 came through.
>
> Nothing has changed for your visitors. RoutingCat now records where each visit comes from, every sign-up, and every newsletter subscription. It will learn to get you more sign-ups, since they happen soon after a visit and your server records them; subscriptions are counted beside them.
>
> From here, tell me what you'd like to try, or ask me for ideas: a sharper headline, a different order for the pricing page, a new hero image. I'll write the variants, check that each one renders, and show you what will go live before you deploy. RoutingCat then sends more visitors to what converts better, while 10% keep seeing your current site, so we can measure honestly what the changes add. Early numbers are noisy, and I'll always tell you how sure they are.
>
> Your dashboard: https://app.routingcat.com/lumen

Had the person skipped the sign-up, it would open:

> RoutingCat is set up on your site: the deploy registered, and RoutingCat runs on your pages. Your first real sign-up will confirm that sign-ups reach it; until one comes, its check of sign-ups waits, which is expected, and nothing else waits on it.
