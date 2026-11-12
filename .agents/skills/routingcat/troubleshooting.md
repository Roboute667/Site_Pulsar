# Troubleshooting

## Find the problem

**`npx routingcat doctor` names most problems.** It reads the project, the sign-in, the site's records and one request to the production page, and changes nothing.
- **After a deploy,** `--wait` waits up to 5 minutes, printing each check as it passes. Under Claude Code, give that Bash call a timeout of 360000 ms.
- **The checks, in order:**
  1. build registered;
  2. deployment registered;
  3. the runtime it reports;
  4. what decides, on `/`;
  5. `/_rc` reaches RoutingCat;
  6. records, which RoutingCat's edge accepts from the production address (D93: `npx routingcat domains add`);
  7. first arrival;
  8. the objective's first event, which waits for the first real conversion, a visitor's or the person's own;
  9. on Hobby, the card on file, which waits for the site's owner.
- **Once a page is routed:** page live, first decision, first render beacon.
- **Locally:** the framework's version, `init`'s edits, the site's public key and the skill's version. Whether `AGENTS.md` has RoutingCat's note is information, never a failure, and so is a framework newer than RoutingCat was tested with (D124).

**The site's file in this skill,** such as `nextjs.md`, lists the failures particular to its stack, and `vercel.md` those of Vercel.

**Every message prints its fix,** with an id such as `(D9)`. The full text of each is in the docs, at `reference/messages.md#d9` (the id in lowercase), and each symptom is at `operate/troubleshooting.md`.

**Exit codes:**
- **0:** done.
- **1:** failed or refused, with the message's id.
- **2:** the command or its arguments are wrong.
- **3:** waiting, on a person or on time. Relay what the person must do, or wait a little, then run the same command again.
- **4:** RoutingCat is unreachable from here. Allow network access for the command, or ask the person to run it.

With `--json`, a failure reads `{"exit": 1, "error": {"id": "A3", "code": "not_found", "message": "…"}}`.

## By symptom

### `init` stops

See `setup.md`, step 1. Running `init` again is always safe.

### The build registers nothing

Its log lacks RoutingCat's receipt (`routingcat  LIVE`, `NOT LIVE` or `registered`) and has a `routingcat:` line instead. The deployment then ships with the defaults and records nothing, conversions included. On a script site the push registers instead, and the site's file lists what stops it.

| The line says | Do this |
|---|---|
| No build token and no deploy key (D5) | On Vercel, turn on Settings → Security → Secure backend access with OIDC federation, then redeploy (`vercel.md`). Elsewhere, set `ROUTINGCAT_DEPLOY_KEY` from `npx routingcat keys deploy --branch <production branch>`. |
| RoutingCat unreachable (D5) | Redeploy once it is back. |
| The token or deploy key refused (A17) | The line gives the reason. The production deploy key serves only production builds of its branch, as their CI reports them: give every other build the preview key, from `keys deploy --env preview`, and rotate a key bound to no branch, or to a renamed one, with `keys deploy --rotate --branch <production branch>`. Otherwise check `ROUTINGCAT_DEPLOY_KEY`, or which site the Vercel project belongs to: a project the site was moved off registers it no more (A44). On the person's machine, for a site on Cloudflare, run the build with `ROUTINGCAT_ENV=production`. |
| The project is bound to another site (D45) | Set `site` in the config to the project's site. |
| No config (D54) | Run `npx routingcat init`. |
| A build on this machine (D46) | Without `ROUTINGCAT_ENV=production`, it writes development values and registers nothing, and a Worker deployed from them decides nothing. On a site bound to Cloudflare, run it with `ROUTINGCAT_ENV=production` to register production under the person's sign-in once they confirm its plan (D115). |

Once a build registers, its deployment registers at its first request. If none has after 10 minutes (D11), open the site or run `doctor`. If it still doesn't register, check the plumbing the site's file names.

### `plan` refuses, or the build fails on a declaration

`plan`'s line says what to fix, the same line the build would fail with:
- **No objective for a routed page (D33):** add the printed line to the config, or give the page its own.
- **A `when`, `requires` or `excludes` field, or a page keyed `site` (D8):** remove the field, or rename the page. Where a variant may show is a condition, `only` and `never` (`guides/conditions.md`); pieces that must show together belong in one slot.
- **A condition naming a dimension, a level or an audience the site lacks (D137, D138, D142):** the message lists what it has, as `npx routingcat dimensions` and `audiences` do. Fix the name, or declare the dimension or the audience; an audience names dimensions alone.
- **A condition on a default (D139), one no visitor can match (D140), or one too complex (D141):** move it to another variant, widen it, or write it with fewer `any`, `all` and `not`, declaring a dimension whose levels group what it lists.
- **An expectation that isn't one place, or over a dimension its slot doesn't personalize by (D143):** write dimensions and their levels, and a rule as `only` or `never`; add the dimension to the slot's `personalizeBy`, or keep its personalization on.
- **A dimension declared wrongly or too large (D144), or a `personalizeBy` naming a dimension the slot's personalization already covers, or on a slot with personalization off (D148):** as the message says; patterns keep a dimension small.
- **A value's unit, cap, property or items (D149 to D152):** as the message names; `guides/value.md` has the forms. D153 and D154 are information: no valued event can carry a value yet, from a server or a connection, or no connection sends the costs a margin needs.
- **The stack's own refusals,** such as a Next.js page's wrapper route: see the site's file.
- **A limit (D36):** retire variants, merge slots, or turn personalization off for a slot. `reference/limits.md` has the limits.
- **Floors and caps that can't all hold (A28):** keep each floor at most its cap, the floors together at most 100%, and the caps together at least 100%.
- **Two pages claim one path (A24):** remove the route from one of them.
- **An objective's window longer than the visit (A29):** shorten the window, or first raise `episode_window`.
- **A retired variant declared again (A30):** that is information, not an error. It comes back live with its history; a new idea takes a new key.

### No decisions on a routed page

- **What decides didn't run (D9):** the site's file says what to check. `npx routingcat init` restores dropped plumbing, or prints the edit.
- **The page isn't live yet:** it takes a production deploy, and about 2 minutes after the first one.
- **Routing waits for a card on file:** on a new Hobby site, the build log or the push says `NOT LIVE routing waits for a card on file: add one at …, nothing charged`, and `doctor`'s `card on file` check waits. The site's owner adds a card in the dashboard's Settings → Billing, or starts Pro's trial. Routing starts within about 2 minutes, with no new deploy.
- **Routing is off:** the build log or the push says `NOT LIVE … routing is off`. `status --since` shows who turned it off.
  - **Someone turned it off:** `npx routingcat set routing=on` turns it back on.
  - **The site's plan turned it off,** past Hobby's visitors a second month running or at Pro's cap: `set routing=on` is refused (A31). Routing comes back by itself when the cause ends:
    - a Hobby site's only when its owner subscribes to Pro, in the dashboard's Settings → Billing;
    - a Pro site's when the month ends, or when the owner raises or removes the cap there.

    See the docs' `guides/billing.md`.
- **A slot has one variant (D21):** add a second to route it.
- **A cache serves the page without running RoutingCat (D16):** stop caching routed pages' HTML there.
- **Nothing recorded for hours from what decides (D20):** first check that it still runs, as `doctor`'s check of it (D9) does. If it runs, it lost access: redeploy, which gives it a fresh credential.
- **Decisions without render beacons (D13):** the component that sends them is missing; the site's file names it. In the person's own browser, an ad blocker also stops beacons.

### A variant never shows

- **The browser keeps its variants for the whole visit,** and may be in the control. Look with `?rc=` in development, or a `preview` link in production.
- **It is paused or retired:** `show` says so.
- **It is held back (D147):** `status` and `show` read `held back until your deployments run a routingcat that honors conditions`. A deployment of the site that built, started or recorded visits in the last 72 hours, previews included, runs a routingcat older than 1.1.0: upgrade, deploy every one in use, and it goes live with routing's next update once the last older one stops counting (`operate/upgrade-to-1-1.md`).
- **Its conditions exclude the visitor,** or its slot's `only` does, which leaves the default. `status` warns when no visit of the last 28 days matched (D145): check its `only` and `never` against `npx routingcat dimensions`, and the campaign's tags against the condition's levels.
- **The plan holds it (A33):** on Hobby, past the 10 live variants the account's sites share, or a Shopify store's own 10, it is registered but not served. `status` reads `held` on its row, and `show` says `held by the plan`. It goes live in declared order, within about 2 minutes:
  - when a live variant is retired or paused;
  - or when the account moves to Pro or its trial, a store on the app's Plan page.

  Promoting it makes it its slot's default, which is never held.
- **It is new, or routing favors others:** `show` gives its share.
- **It was added mid-visit:** it reaches that visitor at their next visit.
- **Its build failed after registering (D10):** visitors keep the previous version. Fix the build and redeploy, or `npx routingcat revert <page>`.
- **Browsers report it shown less than the slot's others (D128):** make it render as fast as they do, and unconditionally. That is a render to fix, not a variant to pause.

### Conversions don't join their visits

The tracking line of `status` gives the shares:

| Share | Means |
|---|---|
| no routed visit (D15) | Nothing to fix: the conversion counts once its visitor sees a routed page. |
| no key (D25) | The event carries neither a visitor nor an account. Send `visitorId` from the `rc_vid` cookie, or `accountId`. |
| unlinked (D26) | The account was never linked to a visitor. Call `identify` at sign-up and at every sign-in. |
| outside window | Nothing to fix. A longer window costs learning speed. |

Related messages:
- **`identify` without a visitor id (D24):** often a sign-in callback posted from another site, with no cookie. Identify at the next page load instead.
- **Events sent with the preview server key (D37):** production results leave them out. Use `npx routingcat keys server --env production`.
- **Events under an undeclared name (D38):** declare the name if it matters.
- **No event for the objective yet (D14):** expected until the first real conversion, and nothing else waits on it. One the person makes on the production site, as `setup.md` recommends, shows within a minute. If the conversion happens in another app or backend, track it there.
- **Whop purchases with no visitor id (D61):** those of the last 7 days cannot be credited to a visit. A plain plan link, `https://whop.com/checkout/plan_…`, as Whop's AI website builder puts on every buy button, carries none; nor does a checkout configuration created without `metadata: { rc_vid }`, or an embedded checkout whose own `metadata` leaves it out. Put `rc_vid` in the metadata of the checkout configuration the server creates, and of the embedded checkout where it sets its own, and replace each plain link with such a checkout, as the site's file says.

**Silence (D27), or a drop after a deploy (D28):** these are errors. Check that `track` is still called, fix it, then record the gap, so those visits count as unknown rather than as no conversion: `npx routingcat gap <outcome> --from <time> --to <time> --note '…'`. Leave out `--to` while it is still broken, and close the gap later with the same command and `--to`.

### Conversions without a known value

`status` and `doctor` warn when more than a quarter of a value page's conversions of the last 28 days have no known value, or when that share differs between routed and control visits (D155). Each still counts as a conversion, but routing learns nothing from it of what a conversion is worth, and the measured value gain counts it at the mean of its visits that day. The message names the cause behind most of them:
- **Products without a cost,** under `margin`: ask the person for the missing values, in this order, taking the first they can give:
  1. **Their real costs,** where they live: in Shopify, each variant's Cost per item, which its bulk editor fills in from Inventory. On a store with RoutingCat's app, Settings lists the products without one that sold most, each linked to it in Shopify.
  2. **An average margin** for the products without a cost: `otherwise`, as `{ margin: true, otherwise: 0.4, plus: -6 }`, or the app's margin for products without a cost in Settings.
  3. **Revenue less shipping,** `{ amount: true, plus: -6 }`, where no margin can be estimated.
- **Events without an amount:** send `value` with each from the server.
- **Events from browsers:** track them from the server, or through the provider's connection: an amount a browser sends never counts.
- **Another currency than the value's unit:** send amounts in the unit, or value the event by a table of its items: RoutingCat converts no currency.
- **A property without a number, or items a table doesn't value:** send the property with each event from the server; add the items to the table, or value them with `otherwise`.

Costs filled in count from the next orders on, so the warning clears as older conversions leave its 28 days. An average margin or any other new value is a change of values, which values the earlier visits too.

### A Whop connection waits or fails

`connect whop` and its fixes below are the owner's, in their own terminal, with a Whop API key they make in Whop's dashboard: give them the command, and never ask for the key, handle it or print it.
- **`connect whop` needs a Whop API key (D58, exit 3):** one with `developer:manage_webhook`, set in `ROUTINGCAT_WHOP_KEY` or typed at a terminal, so from your session it stops here. It is never written to disk. `doctor` says the same of a Whop setup that never created its webhook.
- **Whop not connected yet (D58, exit 3):** a setup the key didn't prove, as one run with `--keyless`, waits for its webhook's first real delivery, such as a sale, since Whop's test event names no account. The owner runs the command the message prints to prove it with their key now, or `doctor` passes after a sale.
- **Payments with a signature RoutingCat cannot verify (D60):** they are refused, since the webhook's secret changed. The owner runs `npx routingcat connect whop` again, with `--sandbox` for the sandbox's connection, which creates a new webhook and deletes the old one.
- **On a Whop Website, its own connection disconnected (D59) or its signatures failing (D60):** the Website repairs it itself within minutes of its next visit, making its webhook again, with no command, and `connect whop` refuses there (D135). Nothing waits on the owner: `doctor` shows when the repair is done.
- **Whop refused, or could not be reached (D64, exit 1):** a refusal names what the key needs: `developer:manage_webhook`, and with `--reconcile` the read permissions too, `payment:basic:read`, `member:basic:read` and `plan:basic:read`. The owner makes such a key in Whop's dashboard, then runs `connect whop` again. When Whop could not be reached, nothing was connected: they run it again.
- **The account can't be bound (D65, exit 1):** one Whop account feeds one site for now.
  - `whop_account_held`: a delivery alone bound it to another site. If the account is the owner's, the command the message prints proves it with their key and moves it here; RoutingCat checks the key once with Whop and keeps it only with `--reconcile`.
  - `whop_account_proven_elsewhere`: the other site's own key proved it. The owner removes that connection there, with `npx routingcat disconnect`, or connects another account.
  - `account_mismatch`: the key is another account's than this site's Whop connection. The owner runs the `disconnect` the message prints, then connects again.
  - `account_unproven`: Whop didn't show the owner's key the webhook as the account's, so nothing was connected, and the webhook is gone. The owner runs the command the message prints again; if it repeats, with a new key from Whop's dashboard, or with `--keyless`, so that a first sale proves the account.
  - `setup_expired`: the setup expired or was used already. The owner runs `connect whop` again.

### Other warnings

- **The control's share of new visitors drifts from its setting (D49):** the measured gain may be biased. Check that page for a cache, or a matcher that skips it for some visitors.
- **A deployment serves content no registered version matches (D12):** its build didn't register (D5). Fix that, then deploy.
- **Cloudflare in front without its visitor location headers (D57):** turn them on in Cloudflare: the domain → Rules → Settings → Managed Transforms → "Add visitor location headers".
- **The skill is older than the package (D35):** `npx routingcat@latest upgrade`, or `npx routingcat init`, updates it; an edited one is kept.
- **A framework newer than RoutingCat was tested with (D124):** information, in the build log and `doctor`: nothing refuses it, and the build goes on. Never downgrade the framework for it. If a build or a page looks off, run `doctor`; the person updates RoutingCat once a release tested with that version is out.

### An act is refused

- **Pausing or retiring a default (A8):** promote another variant first.
- **The site changed since you read it, with `--expect` (A4):** read it again, then decide again.
- **An idempotency key reused for a different request (A5):** use a new key.
- **A setting out of range, or bounds that can't hold (A7):** use a value in range, with floors and caps that leave room for every live variant.
- **Variants of several pages in one promote or preview (A15), or several of one slot (A16):** one page at a time, one variant per slot.
- **Owner-only (A2):** members, keys and domains are the owner's.
- **Routing held off by the site's plan (A31):** `set routing=on` is refused while the plan holds routing off. The way out is the owner's, in the dashboard's Settings → Billing:
  - add a card, for a new Hobby site;
  - subscribe to Pro, for a Hobby site past its visitors;
  - raise the cap, for Pro.

  Routing then comes back by itself.
- **A variant held by the plan (A33):** this is a warning, not a refusal. The deploy or the act succeeded, and the variants past Hobby's 10 live variants wait, as "A variant never shows" says.
- **Billing not set up yet (A32, exit 4):** an act that needs Stripe is unavailable. Nothing on the site's side causes it: retry later.

### A preview link fails

- **The production deployment doesn't serve the version (A14):** deploy it first. Right after a deploy, open the site, then ask again.
- **The page has no path yet (A13):** pass `--path /pricing`.
- **A link lasts one hour:** make a new one.
- **The badge names another variant right after a deploy:** reload a few seconds later.

### In a sandbox

- **No network:** exit 4.
- **A read-only sandbox can't keep the sign-in:** exit 3. The person runs `npx routingcat login` in their own terminal, then you run the command again.
- **A sign-in link waits for approval:** exit 3. Give the person the link; once they approve it, run the same command again.
- **A failure inside the command (D55):** run it again. If it repeats, give the person the line to report.
