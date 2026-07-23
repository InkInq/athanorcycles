# ATHANOR CYCLES — Dev Log & Patch Notes

> A magical academia roguelite incremental game.
> Canonical build: `athanor_cycles_va1.html`.
> Historical entries below are kept for archaeology; if they conflict with the HTML or with `athanor_cycles_todo.md`, trust the code / synced todo.

---

## Doc sync — July 19, 2026

`athanor_cycles_todo.md` rewritten against the live HTML (not prior notes). Notable corrections vs stale todo claims:

- **Arcane Node Compendium** — present (`comp-ar`); no longer “missing”
- **Necromancy** — current per-node decay-bar design is live; remove “needs full redesign” as current-build status
- **Elemental Adjacency tray** — live via `adjPairData` / effect tray (pair chips + hover highlight)
- **Mana Reversal / Create** — META unlock stubs only; `consume()` has Infusion / Surge / Amplify / Cleanse only
- **Rank I–III** — display from `reforgeCount`; no rank abilities
- **Economy** — formulas in code: run-end `cycle×3`, level `lv×50`, board 500/1000/1500, Arcane shop 1M with duo/tri discounts, row AU `(lv+1)×150`. Player feel: soft locks OK; full retune still optional
- **Screen shake** — implemented (`SETTINGS.screenShake`)
- Still absent from build: Freeplay / Unending, Tier II bases, Mana Reversal/Create effects, #43 abilities

---

## v0.1 — Foundation
*Initial prototype. Core loop established.*

- Title screen with New Grimoire / Continue
- Run structure: placement phase → active run → cycle advance → results
- Arcane as primary resource (health bar + currency)
- Pulse drain system: base 7.5s interval, scales with cycle and pulse count
- Low-health pulse intervals: 3.5s / 5.0s / 7.5s based on Arcane %
- Diamond grid board with pan and zoom
- Cardinal node defaults: Terra=top, Ignis=bottom, Ventus=right, Aqua=left
- Basic AU (meta currency) earned per run: `(cycle × 3) + (cards × 2)`
- Save/load via localStorage

---

## v0.2 — Base Nodes
*Four elemental nodes with distinct mechanics.*

**Ignis 🜂** — Click to generate Arcane bursts. Overloads after sustained use; cooldown required before next use.

**Terra 🜃** — Passive accumulation over time. Click to harvest the stored amount. Cap scales with level.

**Ventus 🜁** — Timed crit windows. Clicking during a crit window generates a bonus Arcane burst.

**Aqua 🜄** — Passive generation and mitigation every tick. Always running.

- Nodes have independent state objects (heat, stored, crit timer, etc.)
- Inventory state preserved when nodes are pulled off the board and replaced
- Node state hints shown in inventory strip (COOLING, ⚡CRIT, stored amount, BURNOUT)
- Double-click placed node during placement phase to return to inventory
- Pan and zoom on board canvas (scroll to zoom, drag to pan)

---

## v0.3 — The Grimoire (Hub)
*Meta progression between runs.*

**Hub Tabs:**
- **Record** — Run stats, tendency radar, owned nodes, run history (last 50), owned cards
- **Preparation** — Node levels, meta upgrades, discovered cards, combined node upgrades, board planner
- **Tendency Tree** — Canvas-based upgrade tree with pan/zoom; 5 branches (Ignis, Terra, Ventus, Aqua, Arcane/Harmonic)

**Meta Upgrades:**
- Board Expansion: unlocks additional grid range — cost `50 × 2.2^(range-1)` AU
- Expanded Offering: up to 5 card slots per cycle — 15 AU per slot
- Elemental Attunements (×4): boosts card weight toward an element — `12 + 8×lv` AU, max lv 3

**Node Purchasing & Levels:**
- Buy additional copies of owned node types (Hub pricing: `10 × 1.8^owned`)
- Level up nodes: logarithmic scaling `lvMult(lv) = 1 + ln(lv)`, cost `8 × 1.6^(lv-1)` AU
- Node levels persist permanently across all runs

**Board Planner:**
- Plan your board layout before the next run
- Drag nodes from inventory strip onto the board
- Drag to reposition placed nodes; double-click to return to inventory
- Pan and zoom on planner canvas
- Consumption Furnace: drag any node chip onto the furnace to permanently increase Arcane Max (+25 base, +100 combined)
- Whatever layout is in the planner carries into the next run

**Settings:**
- Tooltip opacity and float text opacity sliders
- Accessible from the bottom bar (⚙ Settings) and from the pause menu during runs

---

## v0.4 — Overflow & Graduation
*Secondary resource layer and cycle advancement.*

- **Overflow** — When Arcane bar is full, excess routes to Overflow (cap: 50% arcMax). Acts as a pulse shield (absorbs damage before Arcane). Decays to AU. Resets each cycle.
- **Graduation** — Cycle advancement requires: generation threshold met + Arcane above 28% + 3.5s stability window
- Graduation % shown in topbar during runs
- AU earned passively from Overflow mid-run

---

## v0.5 — Grimoire Card System
*Cards discovered during runs, owned permanently via AU.*

**Card Economy:**
- Cards discovered mid-run cost Arcane — active for that run only, lost at run end
- Purchase cards permanently in Hub (Preparation tab) using AU
- `META.ownedCards` = permanent. Cards rebuild each run from owned cards.

**Card Pool (19 base cards):**
- 4 per element (Ignis, Terra, Ventus, Aqua)
- 3 Arcane/Harmony cards (Resonance, Equilibrium, Attunement)

**Tendency System:**
- Tracks investment via card unlocks (+30) and node level purchases (+15)
- Drives card weighting — elements you invest in appear more often
- Opposition pairs: Ignis/Aqua and Terra/Ventus reduce each other's weight
- Harmonic tendency unlocks Arcane card path
- Radar visualization: Terra=north, Ventus=east, Ignis=south, Aqua=west

**AU Reroll:**
- Costs `5 × (rerollCount+1)` per cycle, increments each reroll

---

## v0.6 — Temporary Reward Cards
*Instant one-time effects in the card offering pool.*

Temporary cards fire immediately on selection, cost nothing, and can repeat each cycle. Visually distinct with gold border and "REWARD" label.

- **Arcane Source** ✦ — Immediately gain 200–500 Arcane
- **Conjuration Fissure** ✦ — Immediately gain 8–20 AU
- **Mana Expulsion** ✦ — Randomly gain Arcane, AU, or both
- **Clarity's Momentum** ✦ — A random placed node gains +1 level for the rest of this run (stackable)
- **Meditation** ✦ — +5 Arcane Max for the rest of this run (stackable)

---

## v0.7 — The Athanor Shop
*In-run shop accessible via a chanced card pull.*

- **Shop card** — appears in the regular card offering pool (weight 0.10). Free to pick.
- Opens a darkened overlay during card selection phase
- Game remains paused while shop is open

**Shop contents:**

*Left column — Available Nodes:*
- Buy any node type you already own at least one of (Hub pricing)
- Purchased nodes go directly to inventory

*Right column — Consume Nodes:*
- Drag node chips (board nodes or inventory nodes) onto the furnace
- Base nodes: +25 Arcane Max for this run
- Combined nodes: +100 Arcane Max for this run
- Node is removed from board/inventory and `nodeOwned` decremented

---

## v0.8 — Combined Nodes (2-Element)
*Fusion nodes discovered through sustained elemental play.*

Each combined node requires two unlock conditions tracked persistently in META:
1. **10 runs** with both parent nodes on the board simultaneously
2. **Element-specific achievement** threshold

| Node | Icon | Parents | Achievement |
|------|------|---------|-------------|
| Vapor | 🜎 | Ig+Vt | 150 Ignis clicks |
| Salt | 🜿 | Aq+Tr | 20 pulses with Aqua |
| Ferrum | 🜑 | Ig+Tr | 200 Ignis clicks |
| Anima | 🜊 | Ig+Aq | 50 pulses with both |
| Cinis | 🜇 | Tr+Vt | 50 Ventus crits |
| Glacii | 🜈 | Vt+Aq | 30 Ventus crits with Aqua |

**Mechanics:**

- **Vapor 🜎** `#c06820` — Click generates Arcane + opens crit window. Overloads faster (thresh 75). Heat bar, overload cooldown visual.
- **Salt 🜿** `#7898c0` — Passive gen+mitigation scales with stored amount. Harvest resets. Fill bar shifts to bright at high capacity.
- **Ferrum 🜑** `#a05020` — Passive amplifier for Ig+Tr nodes. Heats from Ignis clicks. Burnout at 100 heat (resets next cycle). Heat bar shifts red.
- **Anima 🜊** `#a03878` — Click gen; idle bonus builds over 15s; clicking resets idle timer.
- **Cinis 🜇** `#788028` — Passive accumulation + crit window doubles harvest.
- **Glacii 🜈** `#38a8c8` — Crit window crystallizes into a timed mitigation+gen buff (~8s). Ice-blue crystal state visual.

**Discovery tracking** visible in Tendency Tree (after run 2): dual progress bars per node showing run progress and achievement progress.

**Unlock path:** Once both conditions met, a combined node unlock card surfaces in the regular card offering (cost 120 Arcane). After picking, the node type becomes permanently purchasable in the Hub.

---

## v0.9 — Tri-Element Combined Nodes
*Advanced fusion nodes requiring deep multi-element investment.*

Require **41 runs** with all three parent nodes on board + achievement threshold. The achievement counter advances only while the parent nodes are placed adjacent during a run (this is what older notes vaguely called "combined node events").

| Node | Icon | Parents | Achievement |
|------|------|---------|-------------|
| Impetus | 🜒 | Ig+Tr+Vt | 300 Ignis clicks + Ventus crits (parents adjacent) |
| Aestus | 🜍 | Ig+Tr+Aq | 100 pulses survived with all 3 (parents adjacent) |
| Juncus | 🜔 | Ig+Vt+Aq | 250 Ignis clicks + Ventus crits (parents adjacent) |
| Ceptus | 🜐 | Tr+Vt+Aq | 500 damage blocked (parents adjacent) |

**Mechanics:**

- **Impetus 🜒** `#c83030` — Charges from Ig clicks, Tr harvests, Vt crits → auto-burst when full. Escalating glow as charge builds.
- **Aestus 🜍** `#207890` — Absorbs pulse damage → decaying gen bonus to all 3 parent nodes. Flashes on absorption.
- **Juncus 🜔** `#3060a0` — Each pulse extends crit windows of all crit-capable nodes. Bar pulses and decays on each pulse event.
- **Ceptus 🜐** `#389870` — Blocked damage fills a reserve → releases as Arcane burst + passive boost.

Tri-nodes require all three corresponding dual-element combined nodes to be unlocked first. Unlock card costs 200 Arcane.

---

## v0.10 — Visual Systems
*Node state visualization pass.*

All nodes (base and combined) have state-reactive visuals:
- **Glow intensity** scales with active state (crit, near-burst, crystal)
- **Fill gradient** changes for overloaded, crystal, near-burst states
- **Border color** shifts to indicate state
- **Icon size** grows during active states
- **Status bar** below each node — color shifts with urgency (green → orange → red for heat, etc.)
- **Status text** — live readout of key state values (cooldown timer, stored amount, boost multiplier, charge %)

Combined nodes route through `drawCombinedNodeDiamond` — separate draw function from base nodes with full per-node state logic.

---

## Pending / In Design *(historical — May 2026; superseded)*

Many items below shipped in later versions (Graduation, Arcane Node, Tendency Path B, AU tooltips). See **Doc sync — July 19, 2026** and `athanor_cycles_todo.md` for current open work. Still accurate as *design intent* only:

- **Mana Reversal / Create** — designed; unlock stubs exist; effects not wired
- **Freeplay / Unending Mode** — still not in build
- ~~Graduation / Arcane Node / Tendency Tree / AU tooltips~~ — shipped (see v0.11–v0.13)

---

*Section originally dated May 2026; annotated July 19, 2026*

---

## v0.11 — Consolidation Patch
*Generation Consolidation, Tooltip Accuracy & Debug Tools — June 2026, playtest-driven bug pass.*

**Canonical generation amplifier (`genAmp(el)`)**

Three divergent amplitude definitions were consolidated into a single helper used by base clicks, combined clicks, and passive generation alike:

- Base-node clicks previously had the dominant-element bonus but not Necromancy efficiency.
- Combined-node clicks had *neither* — no arcane bonus bundle at all.
- Passive gen had Necromancy efficiency but not the dominant-element bonus.

`genAmp(el)` now applies one rule everywhere: Amplify (AU power) × (1 + Confluence + Resonant Field + Harmonic Surge + Transmutation + dominant-element bonus) × (1 − arcaneBleed) × Necromancy efficiency. Consequences: combined-node clicks now receive the full arcane bonus bundle (and are correctly penalized by arcaneBleed); the dominant-element +10% now applies to passive gen as well as clicks; Necromancy efficiency applies uniformly to clicks and passive.

**Engine bug fixes (3)**

- **Terra ceptus double-count** — passive rate multiplied by `(1 + ceptusMult)` where `ceptusMult` was already `1 + 0.3`, inflating Terra ~2×. Corrected to `ceptusMult`, matching Aqua/Salt/Anima.
- **Aqua crystal-growth precedence** — `*(1+(R._crystalGrowthT||0)>0?0.2:0)` evaluated to `×0.2` *always* (Aqua passive permanently at 20%). Corrected to `*(1+((R._crystalGrowthT||0)>0?0.2:0))` → ×1.0 normally, ×1.2 when active.
- **Combined-click amp omission** — folded into the genAmp consolidation above.

**Tooltip accuracy pass**

All yield/rate tooltips (ig, tr, vt, aq, vp, sl, an, gl) now compute their headline number from the same `genAmp` the engine uses, decomposed into base (naked level) / buff (all active multipliers: card level, Ferrum, Forge Heat, Eternal Flame, Tectonic, arcane bonus bundle, Surge, Ceptus, etc.) / effective (after disturbances). Displayed value is provably equal to applied value (unit-tested). Helper `ampBuff(el)` divides arcaneBleed back out so disturbances show in the effective tier. Fixed two latent tooltip crashes: Glacii referenced undefined `lvm`/`amp`; Salt's cap line used `lv_sl` before declaration (TDZ).

**Evocation lesson fix**

`stepLessons()` was overwriting Evocation's per-frame pulse-timer decrement with a stale pre-tick value every frame, so the countdown never reached zero and the lesson never progressed. Removed the round-trip line.

**Stacked-lesson state corruption (disturbance vanish / mis-count)**

`stepLessons()` copied every active lesson's `_lessState` into a single shared slot on `R`, then copied that one slot back into *every* lesson after each step — so with two or more lessons active, their state objects cross-contaminated every frame. Symptoms: Conjuration's `distId` could be overwritten, causing the wrong (or a legitimately-active) disturbance to be removed on completion; generation-tracked lessons (Transmutation, Divination, Illusion, Conjuration) mis-accumulated because `addArc` was incrementing a shared object; Abjuration's drain zeroed out when not last in the array. Fix: removed the round-trip entirely — each lesson now uses only its own instance state (seeded at accept time). Abjuration's drain repointed from shared `r._lessDrainRate` to instance `ls._lessDrainRate`.

**Null Zones (Terra Graduation Challenge) — instant-fail & spread fixes**

The challenge seeded 2 nulled nodes on init; on small boards (≤2–3 nodes, common when forced via the debug picker) that nulled everything immediately, triggering an instant fail. Reduced seeding to 1. Also reworked the spread topology: the board is an isometric diamond grid (`gridToPixel`: x∝q−r, y∝q+r), and the spread now propagates only to the four *visual* cardinal directions — top `(-1,-1)`, bottom `(1,1)`, left `(-1,1)`, right `(1,-1)` — instead of all 8 surrounding cells, matching the intended cross/plus growth pattern. Expansion interval kept at 8s, growth uncapped, 60s survival win condition unchanged. (Note: general adjacency elsewhere — placement, forging, discovery — remains 8-way; Null Zones intentionally spreads through a narrower set.)

**Shop cadence — every 5th cycle**

The shop was a weighted-random card (~10% per cycle), so it surfaced unpredictably. Removed it from the random card pool entirely and inject it deterministically into the card offer when `R.cycle % 5 === 0` (cycles 5, 10, 15…). On a shop cycle it takes the last offer slot (or appends if room); on all other cycles it can't appear.

**Pause-on-blur toggle**

The simulation previously kept running when the window lost focus. Added a `windowBlurred` flag driven by window `blur`/`focus` and `visibilitychange`, and gated the step loop so the run pauses on blur unless opted out. New "Keep Running When Unfocused" checkbox in the pause-menu Settings (persisted in `SETTINGS`, default off = pause on blur). Uses a separate flag so it never clobbers a manual pause, and resets the frame timer on refocus to avoid a dt catch-up jump.

**Card-hover highlight shape + tooltip removal**

The card-hover node highlight drew a square-proportioned diamond ring (`r=42*zoom` in all directions), which didn't fit the node's flatter iso diamond (`hw=0.52cz`, `hh=0.36cz`) — it looked too tall/pointy. Reshaped the ring to match the node's aspect ratio with a slight outward pad. Separately, removed the redundant card hover tooltips (they repeated the card-face description; numeric effects aren't stored in a readable field — magnitudes live inside `apply` functions and many cards are pure boolean flags). The in-run card hover keeps only the (now-correct) node highlight; the hub card tooltip was removed outright (no board to highlight in the hub).

**Results screen — two-column layout + run recap + graduation module**

Restructured the single-column results box into two columns (box widened 520→760px, stacks below 640px for mobile). Left: stat tiles, Cards Discovered, Keep-Cards. Right: a new Graduation Reward module (shown only when a graduation was completed this run, naming the reward(s) claimed — reward names are now captured in `pickGradReward`), the graduation progress tracker, the tendency radar, and a new Run Recap panel (cycles reached, disturbances weathered, lessons completed, total mastery X/8). Added an `R._disturbancesFaced` counter in `rollDisturbance` to feed the recap.

**Crystalline Growth rework (#7)**

The card was silently broken: it only fired with the Geode card (the only thing that made the harvest bonus reach 1.4) and, despite "board-wide," only boosted Aqua passive gen by +20%. Reworked: (a) triggers on any full-stack Terra harvest (`wasFull` captured before the stack is zeroed, Geode-independent); (b) genuinely board-wide via a new `passive` flag on `genAmp` &mdash; a +20% `crystalMult` applies to all seven passive gen sites (Terra/Aqua/Salt/Anima/Cinis/Glacii) while active, and never to active clicks; (c) an active indicator: a teal "Crystalline Growth" badge in the board's top-left while the timer runs; (d) honest description stating the +20%, the full-stack trigger, and the rest-of-cycle duration.

**"Combined node events" clarity (#8)**

The term was internal jargon (a code comment + a vague devlog column), never shown in-game. It refers to the achievement counter that gates combined/tri-node discovery: one "event" = a qualifying action (per the node's achLabel, e.g. Impetus = Ignis click or Ventus crit) performed *while the base parents are adjacent*. Fixes: the discovery tracker's hover tooltip now states that progress only accrues while the parents are adjacent during a run; the code comment was clarified; and the devlog requirements table was corrected to use the real achLabels (Impetus "300 Ignis clicks + Ventus crits (parents adjacent)") with the run requirement fixed (36 &rarr; 41).

**Vapor + Ferrum heat-economy rework (#9)**

Vapor read as a strictly-better Ventus (higher crit, an off-crit floor Ventus lacks, weak heat cost). Reworked into a *steam catalyst*: crit clicks now run cool (bypass Vapor's own heat) while off-crit clicks heat it; overload cooldown 3.0s &rarr; 5.0s; and every click spreads +7 heat to adjacent heat-nodes (Ignis/Ferrum/Vapor) via a new shared `spreadHeat` helper. Ferrum redesigned (2a): its boost now scales *with* its own heat (`1 + 0.5·lvl·(heat/60)`, up to ~+50%) instead of inverse; overload threshold lowered to 60; burnout is now *recoverable* (~4.5s cooldown, then resets) instead of a cycle-long lockout; and it heats only from *adjacent* Ignis clicks (+ Vapor steam) rather than globally. Together the fire lineage is one heat economy: Ignis/Vapor pump heat into Ferrum, Ferrum converts it to a boost, overload is the shared ceiling. Board state text, tooltip, heat bar, and both Compendium entries updated.

**Onboarding pacing rework (#4)**

Restructured early-game pressure. Setup grace (cycles 1-4, no events); introduction (5-11) with lessons on 5/8/11 and disturbances offset on 6/9 so they alternate without colliding; escalation (12+) with disturbances ramping every-3 (12-17) &rarr; every-2 (18-23) &rarr; every-cycle (24+) instead of a hard cliff at 10. Added a one-cycle-ahead disturbance telegraph banner ("A disturbance gathers") that fires when the next cycle has a disturbance and the current one doesn't &mdash; auto-suppressed during the every-cycle phase where it would be noise. First lesson moved from cycle 3 to 5.

**Economy gate &mdash; first pass (balance)**

Began the AU-as-soft-gate balance pass. Diagnosis found the gate was loose at early node levels: leveling 1&rarr;5 cost ~74 AU total for a ~3× output gain (about one run), letting meta power outrun the challenge curves. Fixes: node level-up cost changed from `8×1.6^(lv-1)` to a linear **`lv × 50`** (→L2=50, →L3=100, →L5=200; cumulative L3=150, L5=500), so tripling a core node now takes ~4 runs instead of <1; and the run-end AU reward dropped the `cards × 2` term, leaving **`cycle × 3`** so income rewards depth reached rather than card hoarding. Level-up remains uncapped (linear cost, logarithmic power = soft self-cap). lvMult and all per-node/card generation formulas left untouched &mdash; the gate is entirely cost/income.

**Node descriptor text overlap**

Each node draws a state readout (heat/stored/timer/mitigation) below its diamond at `+0.56·cz`, which landed inside the directly-below screen neighbor (top vertex at `+0.44·cz`) when nodes were placed adjacent. Added a `_hasBelowNeighbor(node)` helper (checks for a node at `(q+1,r+1)` on the iso grid) and guarded the state-text draw in both `drawNodeDiamond` and `drawCombinedNodeDiamond` — the readout is suppressed only where a below-neighbor would be overlapped, and shown everywhere else. The progress bar (at the diamond edge) and the in-diamond name are kept; full stats remain available on hover.

**Aestus crash — `amp is not defined`**

The Aestus step-loop block (adjacent-node bonus generation) referenced `amp`, a local that only exists in the `tapNode` click handler, not in the passive step loop. It threw a ReferenceError whenever an Aestus node had an active (pulse-fed) bonus with any adjacent neighbour. Removed the `*amp` factor, which both fixes the crash and matches the deliberate "no amp multiplier" design already used for Ceptus (prevents runaway scaling). Pre-existing latent bug, not introduced this session.

**Lesson completion notification**

Lesson completion previously only wrote a line to the activity log. Added a gold completion banner (mirroring the disturbance-banner mechanism, offset to `top:74px` so the two never stack) that flashes the school, AU reward, and graduation progress for ~3.4s. First-time masteries get an extra `★ New Mastery — X/8` line and a longer 4.2s hold so win-condition milestones register. Captures new-mastery state before pushing to `lessonsCompleted`; clears on run end.

**Node Compendium (glossary)**

Added a new "Compendium" glossary category (between Nodes and Grimoire) with a dedicated reference page for all 14 nodes. Each page is sectioned: a role tag, How it works (the real generation mechanic), Amplified by (every modifier that affects it), Synergies, Vulnerable to (which disturbances target it), and — for combined/tri nodes — a Forged from line naming the parents. Copy is drawn from the actual handlers, so synergy/modifier claims are accurate (Terra's full stack enabling Tectonic, Glacii needing an Aqua neighbour, the 80% Aqua mitigation cap, etc.). Base-node entries gate on ownership (`nodeOwned[el]>0`); combined/tri gate on discovery (`unlockedCombined`, permanent — so an entry never vanishes if the node is later consumed in a forge). Pure data in the GLOSSARY array; renderGlossary picks it up via GLO_CATS with no other wiring. Section headers lightened from `--gold-dim` to `--gold`; Terra's SVG relaid to stop the bar/label overlap.

**Lesson icon disambiguation**

Abjuration, Transmutation, and Conjuration were reusing base-node element symbols (Aqua 🜄, Terra 🜃, Ventus 🜁). Reassigned to distinct unused alchemical glyphs (🜞, 🜛, 🜡). Verified all 14 node + 8 lesson icons are now collision-free.

**Hub load-refresh bug**

Switching saves sometimes left the hub showing the previous game's data, tab-dependent. Two causes: `refreshHub` (billed as the single entry point for hub views) omitted `renderRunLog`, and `goHub` never re-asserted the active tab — so Run History, Tendency Tree, and Glossary kept stale content until a tab was clicked. Added `renderRunLog` to `refreshHub`, and `goHub` now detects the active tab and re-runs its render path. Covers all three `goHub` callers (return-from-run and both load paths).

**Starting-hand placement bug (random hand was masked)**

After adding the random starting hand, the first-run board was still seeded with a hardcoded `['ig','tr','vt']` cardinal placement (independent of `nodeOwned`), so every new game *looked* like it started ig/tr/vt regardless of the rolled hand. Fixed the first-run default to place the actual starting hand at distinct cardinal positions, expanding duplicates (e.g. ig/ig/aq → two Ignis + one Aqua on three corners). Only the first run uses cardinal defaults; subsequent runs restore `lastBoard`.

**Lesson mastery tracker**

Lesson completion was tracked in `META.lessonsCompleted` and drove the Mastery win condition but had no UI. Added two views: (1) in-run — a "Lessons Mastered: X / 8" header at the top of the collapsible lesson contract panel, updating on completion; the panel tab now stays available for the whole run so the counter is always reachable (also closes the "lessons-completed count missing from collapsible" note). (2) Hub — a "Lessons Mastered" section in the Record tab with an 8-chip grid (one per school), lit with the school's alchemical icon when mastered, dimmed otherwise, with hover tooltips. `renderLessonMastery()` fires on Record-tab open and on `refreshHub`.

**Onboarding pass: random starting hand + generalized glow tutorial**

`newGame()` now seeds the starting hand as Ignis (always present) + 2 random picks from all four bases with duplicates allowed — replacing the fixed `ig/tr/vt` opening. Ignis is pinned as the click-teaching anchor; the other two slots provide per-playthrough variance (~12% per common hand, ~6% for double-passive). Verified across 20k rolls: Ignis always ≥1, never exceeds cap of 3, total always 3, no all-passive hand possible. Ownership plumbing (`META.nodeOwned` counts, `nodeMax` caps, inventory build) required no changes — duplicates were already a supported concept.

The tutorial was rewritten to match. The old chain (prep tab → buy Aqua → begin run → place Aqua from run inventory) was element-specific and brittle: if Aqua was already placed via the hub board, the run-phase inventory glow waited on an impossible action and hung forever. The new flow is element-agnostic and hub-centric: glow the Prep tab → then *all four* base buy buttons + the hub inventory space simultaneously → complete on any node placed (hub or run). A new `node-placed` trigger fires from both placement paths so completion can't deadlock. The fixed-condition `runs===1 && nodeOwned.aq===0` start check dropped to just `runs===1`. Net effect: brittle scripted tutorial replaced with a self-healing nudge that teaches "buy or place a node" rather than "buy this specific node."

**Record-tab loadout refresh**

`hubTab('record')` refreshed owned nodes and the run log but never called `updHubUI()`, so the card loadout list and SLOTS/CAPACITY bar went stale after buying a card in Prep and returning to Record. Added the `updHubUI()` call on Record-tab open. (Related feature suggestions — a dynamic glossary codex of acquired cards/nodes, and saved loadout presets — were reviewed and deliberately cut: the codex duplicates the Record/Prep tabs, and presets add tracking burden without solving a real problem given random lesson/graduation pacing.)

**Debug picker (ATHANOR)**

Typing `ATHANOR` now reveals a 🛠 DEBUG button (bottom-right) opening a modal with three sections — Lessons, Graduation Challenges, Disturbances — each forcing a specific effect into the active run. `rollLesson`, `startGraduationChallenge`, and `rollDisturbance` gained optional force-id parameters. Also fixed the keydown handler so the `R` in ATHANOR no longer triggers end-run (cheat detection now runs first and suppresses single-letter hotkeys while the buffer is a live prefix), and a CSS specificity bug where the modal's inline `display:none` blocked the `.show` class.

---

## v0.12 — Adjacency, Audit & The Forge (July 2026)

**Elemental Adjacency system (design Q #45).** Base nodes now react to neighbors: 2 opposed pairs (Ignis–Aqua, Terra–Ventus: both −5% gen/stack + a board dividend — mit, faster overflow→AU) and 4 allied pairs (mutual specialty feeds; Ignis pairings carry risk riders). ±5%/adjacent stack, cap 3/pair, base nodes only. 12 engine hooks (`/*adj:*/` comments), Aqua aggregate gen/mit converted to per-node effective sums. Per-pairing ⚭ tooltip rows, Glossary entry, and an "EA" tray token whose hover lists active pairings AND highlights participating nodes (new `_highlightNodes` set alongside `_highlightEls`). Companion nerf: Vapor overload 5.0→7.0s, Ferrum burnout 4.5→7.0s.

**Eternal Flame → Smolder (design Q #7).** Overload now happens normally under EF, but the node stays clickable at 40% output while cooling. Restores Backdraft/Forge Heat/Conflagration triggers and closes the EF+Conflag runaway. Removed the dead `R._eternalHeat` overflow-drain flag (set, never consumed).

**T3 placement cards (#33) — pool now 10/element.** Calcify (Ig: +5% click/adj Terra; Terra −5% fill/adj Ig), Nourish (Tr–Aq bonuses doubled; Terra −5% fill/adj Aq), Accelerate (Vt crits kindle adj Ignis +5%/1s stacking; Terra −5% fill/adj Vt), Sanctify (per endured pulse +5 Arc/Aq–Tr board stack + 2s Terra fill boost; Ig clicks −5%/adj Aq). Combined Terra fill cuts capped at 45%. Deferred at the time: Arcanum placement card, auto-collection — **both addressed in v0.13** (auto-collect via Observance; placement card still open).

**Tendency sharpened (#41).** Element weights exponentiated ^1.7 (40/20/20/20 → 52/16/16/16), dominant-snapshot bonus 1.15→1.35, "⚖ Drawn by your X tendency" label on boosted offers, one-time explainer modal at first snapshot freeze, glossary updated.

**The Forge tab (History replaced).** *Superseded in v0.13 — see below.* At v0.12: discovery tree as centerpiece; sidebar with per-combined-node Rank tracks (Rank II at 2 re-forges, III at 4 — `META.reforgeCount` increments on Transmutation; abilities sealed pending #43). Run log removed from Record (`META.lastRunStats`); pulse damage on results recap. Tendency trajectory graph moved to Record.

**Full grimoire audit (49 cards).** Found and fixed: Crosswind Boost DEAD (multiplier computed, never consumed — now applies +40% to Aqua/Terra fill/Salt/Anima/Glacii during crit windows); Tidewall & Moondancer NEGATED (second mitigation computation overwrote the first without them — unified into one authoritative expression, Moondancer 95% cap live); Ember Bulwark partial (now triggers on Ferrum burnout, per-node max cooldowns, Anima dropped from absorb list); Sediment Layers overflow uncapped (now capped at 25% cap — closes Pressure Seal banking exploit); Tectonic scoped to Ig/Vt/Aq base nodes per decision (Ventus crits added, desc rewritten). Left as documented quirks: Conflagration chain persistence, Chain Ignition's narrow trigger. New Ember Bulwark+Anima rider: with EF equipped and an Anima placed, overload/burnout cooldowns +0.5s but other Ignis-derived nodes +5% gen (all cooldown sites + Ig/Vp clicks + Ferrum boost).

**Prep→Forge restructure + Board Dock.** Board Planner + Available Nodes + Furnace moved from Prep into a persistent collapsible right-side dock visible on ALL hub tabs (state persists, ids unchanged so all drag/purchase/furnace logic untouched). Forge action panel (slots/re-forge) moved from Prep into The Forge sidebar — full chip→slot flow now on one screen. Prep is now the base-node/economy tab. All hub pages wrapped in a new flex container (structural CSS change — playtest all tabs).

**Fixed this session:** game-breaking `n`→`node` scope error in the Terra bar display (killed the raf loop every frame a Terra node drew); EA/effect-tray tooltips now open top-right of cursor.

---

## v0.12b — Polish, Clarity & Traitor Rework (July 2026)

**Visual/clarity batch (audit #10–#19, #24 — complete).** Backdraft recovery floats "🔥 Backdraft +N". Sediment Layers shows a thin gold second bar (overflow vs 25% cap, Nourish-adjusted). Four new tray tokens: IN Inversion, HS Harmonic Surge, TR Transfiguration, FH Forge Heat (max stacks, live) — tray entries can now carry explicit labels. Divination: pulsing purple threshold tick on the Arcane bar tracking the next foreseen threshold (hover-titled; clears on fail/complete/run-end). Necromancy: per-decay "🜏 Decay — X%" float + purple vignette deepening with lost efficiency. Mit readout shows EFFECTIVE mitigation (Ebbing-reduced, purple + hover note when active); per-pulse drain estimate includes Ebbing. Forge-slot "Lv?" placeholders removed. Graduation rewards: picking one shows a ~1.7s "✓ RECEIVED" reveal module; earned reward identities persist (`META._gradRewardsSeen`) and appear face-up in future offers (unearned stay "? SEALED"). #24 verified: rewards DO stack — but the four Surge rewards permanently incremented META.nodeLevels despite saying "this run" → now tracked per-run (`R._gradSurgedEls`) and reverted at run end.

**Balance numbers.** Cycle-1 gen target 800→600 (×1.30 growth unchanged; cycle-5 now 1714 vs 2285). Board expansion: 50×2.2^n → explicit 500/1000/1500 schedule, and **board range cap raised 3→4** so the 1500 ring is purchasable. Null Zones survive duration 60s→40s. #32 investigated: Conflagration does NOT modify overload cooldown anywhere — the perception is from high-heat play causing more frequent overloads. No change.

**Evocation spikes now respect the defense stack.** Full pulse mitigation chain (stacked mit → Undertow → Attenuation → Ebbing) + overflow shielding absorbs first. Abjuration/Inversion charges remain pulse-only by design. Earlier: spikes got a distinct "🜲 Evocation spike −N" float and count into pulse-damage stats; confirmed spikes are EXTRA pulses every 2.5s at 1.5×, not a pulse-timing change.

**#42 — Enchantment traitor rework.** Passive-output traitors now betray automatically: Aqua/Salt/Anima/Glacii-crystal generation reverses into a siphon (floored at 0 Arcane), Terra's stack erodes at fill rate, and defensive traitors (Aqua/Salt/Glacii) contribute NEGATIVE mitigation — total mit can go to −50%, amplifying pulses. Clickable traitor behavior unchanged; lesson desc rewritten for both modes.

**Cleanup.** Inert "Reset zoom" button + orphaned resetGraphView removed from the Forge tab (graph lives in Record). Dock header's "N nodes planned" status line restored (id was lost in the dock rebuild) and now refreshes from renderHubInventory on every tab.

**Decisions.** #44 Free-Play/Crucible-drain mode: parked until post-polish. Hotkeys: dropped from the active list. #43 Attunement + 20-rank-ability proposal: on the table, paused.

---

## v0.13 — Arcanum Node & The Forge Rework (July 2026)

**Canonical build:** `athanor_cycles_va1.html` (successor to `dlgv4`).

**The Forge tab — full rework.** The discovery tree canvas and pan/zoom graph are retired. The tab is now a three-column layout: **left** — all 10 combined nodes as scrollable cards (undiscovered = progress bars with run/achievement counters; discovered = inline forge cards with feed slots, forge/transmute, rank summary); **center** — Arcanum Node panel (shop before ownership, diamond + live stats + last-run log after); **right** — five elemental upgrade rows. Combined-node forging removed from Preparation entirely; The Forge is the single home for discovery progress and forging.

**Arcanum Node (α) — automation centerpiece.** New 15th node type (`ar`), one per board (`nodeMax.ar = 1`). Not forged — acquired via: Grimoire shop (1,000,000 AU base, multiplicative discounts ×0.5 per duo discovered / ×0.4 per tri, floor ~400 AU at full collection), Graduation blind-reward pool ("Arcanum Node", +50 AU fallback if owned), or Cycle 50 milestone. Identity: observes adjacent base nodes and triggers their obvious action at reduced efficiency — hands-on play always wins.

**Observance (in-run).** Base radius covers 4 adjacent cells on the iso grid; Observation row expands with cardinals (+1/level, 8 cells at L4) and distance-2 cardinals at L5 (12 cells total). Base nodes only. Auto-actions are plain (no card combo flags, no discovery achievements, no Impetus charge): Ignis auto-clicks every ~3s when not overloaded; Terra auto-harvests at full stack; Ventus clicks only during open crit windows. Static disturbance silences observance (auto-actions + Aqua adjacency gen bonus); baseline Aethergy gen, Constitution mit, and Alchemy still operate.

**Five Forge rows (meta upgrades).** Fed by elemental nodes + AU (`150 × level` per row level; level *n* costs *n* fuel nodes). Opposition raises fuel cost on paired rows (Aethergy↔Efficiency, Observation↔Constitution; Alchemy neutral). Tri nodes count as super fuel (one tri fills an entire level's fuel). Rows: Observation (Ventus), Efficiency (Aqua, 50%→75% auto-yield), Aethergy (Ignis, baseline passive gen), Constitution (Terra, +3% mit/level + stress overload), Alchemy (any combined, blocked pulse → Arcane + rare capped AU trickle).

**Constitution stress.** Mitigation absorbed builds stress; at 100% the Arcanum Node overstresses (~10s cooldown, interference-scaled). While stressed, everything the automaton provides stops — observed nodes keep working manually.

**Last Run panel.** `META.arcane.lastRunStats` saved at run end when the node was placed: cycle, total Arcane generated, baseline portion, auto-action counts (Ig/Tr/Vt breakdown), mitigated damage share, Alchemy transmuted, stress overloads.

**ATHANOR cheat extended.** Grants Arcanum ownership, maxes combined discovery progress, unlocks Transmutation, adds node to mid-run inventory if active; Forge tab refreshes on activation.

**Minor fixes.** Board Expansion UI cap display corrected (1/4). In-run stats "AU earned so far" projection aligned with run-end formula (`cycle × 3`, Crucible ×1.5; `cards × 2` term removed).

**Deferred / not in v0.13 (at ship time).** Inscription/directives cut (Forge rows carry all customization). Combined-node observance. Rank abilities on combined nodes still sealed (#43). Economy pass numbers for row costs / shop price / alchemy rates still placeholder-tunable.

**Post–v0.13 (as of July 19, 2026 code):** Arcane Node Compendium entry (`comp-ar`) is in the build. Necromancy and EA tray chips updated. See Doc sync above.

---

*Last updated: July 19, 2026 — doc sync against `athanor_cycles_va1.html`*
