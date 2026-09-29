# Athanor Cycles — Design Document
*Magical Academia Roguelite Incremental · v3.0*

**Synced to build:** `athanor_cycles_va1.html` (v0.13 demo)  
**Last updated:** July 2026  
**Status:** Living design doc — update when mechanics change in the canonical HTML build.

---

## Name & Identity

**Athanor Cycles** — an athanor is an alchemist's self-sustaining furnace, used for long slow transformations. The name carries the game's core promise: you tend the flame, the flame transforms you. "Cycles" names the roguelite structure directly.

Athanor Cycles is a short-run roguelite incremental game set in a magical academic world. Players manage elemental nodes arranged in a living sigil formation to sustain Arcane — simultaneously their health and currency — while the sigil grows outward through progression. Meta-progression lives in the Living Grimoire, which evolves based on playstyle across runs.

**Core influences:**
- *Feeding Black Hole* — survive-or-lose tension, short self-contained runs
- *Cookie Clicker* — unlock-as-reward progression, discovery as the hook
- *Wild Growth TD* — central visible nodes as primary interaction points
- *Opus Magnum* — diamond grid board aesthetic, intimate spatial feel

---

## The Core Loop

```
Title Screen — open the Grimoire to begin
  → Hub — review Grimoire, spend AU, plan board, forge nodes
  → Run begins — nodes placed, pulse drain, Arcane as health and currency
  → Click nodes to restore Arcane
  → Spend Arcane to unlock Grimoire cards (trial for this run)
  → Spend AU to level nodes and use consumables
  → Advance Cycles via generation threshold + stability window
  → Disturbances stack as Cycles progress (phased escalation)
  → Accept or decline randomized Lesson encounters
  → Completed Lessons progress toward Graduation
  → Run ends (Arcane depleted or voluntary)
  → Results Screen — summary, AU earned, tendency snapshot captured
  → Hub — updated with new AU and cards, prepare again
```

---

## Save System

Three **Grimoire slots** (`athanor_slot_0/1/2`) — each slot is an independent save. **Crucible Mode** unlock and active toggle are **per slot**, not global.

---

## Screen Flow

**Title Screen**  
The athanor furnace glowing on a worktable. The Grimoire sitting closed beside it. One prompt — *"Open the Grimoire"* — begins everything.

**Hub — The Expanded Grimoire**  
The Grimoire open on a desk. Navigation feels like turning pages. A collapsible **Board Planner** dock sits on the right on all hub tabs — drag owned nodes onto a preview grid to plan the next run's layout.

**Hub pages (four tabs):**

| Tab | Purpose |
|---|---|
| **Record** | Run history, AU balance, card loadout (equip slots/capacity), tendency snapshots |
| **Preparation** | Node purchases, level-ups, consume nodes for permanent Arcane threshold, meta upgrades, Begin Run |
| **The Forge** | Combined-node discovery progress, forging/transmutation, Arcane Node shop & row upgrades |
| **Glossary** | Unlockable compendium entries (mechanics, nodes, tips — including Crucible when unlocked) |

**Run**  
Pulse rhythm, nodes, cycles, card selection overlays between cycles, lesson/graduation UI.

**Results Screen**  
Cycles reached, cards unlocked, AU earned (`cycle × 3`, ×1.5 in Crucible), tendency radar, graduation progress, snapshot capture. *Return to Grimoire* → Hub.

**Pause Modal**  
Mid-run overlay: settings, End Run, Return to Title, quick reference. Board visible behind.

**Return to Title (suspended run):** suspends the run for this session only. The title screen then offers **Resume** (costs `cycle × 1` AU; lands in the pause menu) or **End Run** (pays the normal run-end AU but permanently lowers the Arcane maximum by 2). The Grimoire stays closed until one is chosen; closing the game ends the run the same way. Pausing is disabled while a card/lesson/shop/graduation overlay is open.

---

## Resources

| Currency | Earned By | Spent On |
|---|---|---|
| **Arcane** | Node clicks and passive generation | Grimoire card unlocks (in-run); also your health bar |
| **AU** | Run end (`cycle × 3`), Lesson completion, Graduation rewards, Overflow trickle | Node leveling, purchases, consumables, meta upgrades, forging |

Arcane is simultaneously health and learning currency. Spending it on Grimoire cards creates tension — every unlock trades against survival.

**Arcane maximum:** Base **500** (`ARCANE_THRESHOLD_BASE`), plus permanent bonuses from consuming nodes (+25 base, +100 combined, +500 Arcane Node). Run-only bonuses (Graduation rewards, etc.) stack on top.

Arcane hitting zero ends the run immediately.

---

## The Board

Diamond grid extending outward — nodes sit at diamond intersection points. No hard boundary; expands via meta upgrade.

**Cardinal defaults (first placement hints):**
- **Terra** — top (`q:-1, r:-1`)
- **Ventus** — right (`q:1, r:-1`)
- **Aqua** — left (`q:-1, r:1`)
- **Ignis** — bottom (`q:1, r:1`)

Defaults are suggestions, not locks. Valid placement: unoccupied cell adjacent to at least one placed node.

**Board range expansion** (Preparation meta): costs **500 / 1000 / 1500 AU** for rings 2→3→4. Base range is 1.

**Hub Board Planner:** Between runs, drag owned nodes from inventory onto the preview board. Layout persists in `META.lastBoard` and loads at run start. Collapsible dock header matches Record-tab caret pattern.

**Node movement:** All placed nodes can be repositioned during placement windows (run start and between cycles). Locked mid-cycle otherwise.

---

## Starting Nodes

Each run draws from owned inventory. **First run:** Ignis is always included; the other two starters are random from Terra/Ventus/Aqua.

Starting permutations create different early games. The missing 4th base element is the natural first purchase goal (Aqua costs AU in hub).

Players place nodes from inventory at run start (and between cycles when new nodes are available).

---

## UI Layout — Run Screen

- **Center — The Board:** Diamond grid, nodes at placed positions, adjacency channel visuals, Necromancy gray decay bars per node when active.
- **Right Panel — The Grimoire:** Arcane bar (with overflow zone), tendency radar, log, unlocked cards.
- **Bottom Bar — Consumables:** Infusion, Surge, Amplify, Cleanse, End Run, Options.
- **Inventory Strip:** Owned unplaced nodes; draggable during placement windows only.
- **Lesson panel:** Collapsible left-side contract showing active lesson/graduation progress.

Node status readouts live as overlays on nodes (hidden under Veil disturbance).

---

## The Four Base Nodes

| Node | Archetype | How It Works |
|---|---|---|
| **Ignis** (Fire) | Cookie Clicker | Click to generate in bursts; overloads after sustained clicking; needs cooldown |
| **Terra** (Earth) | Progress Bar | Accumulates slowly and passively; click to collect the stack |
| **Ventus** (Air) | Timed Interval | Pulses on a timer; hitting the prime window grants a crit bonus |
| **Aqua** (Water) | Idle Sustain | Passive generation **and** pulse mitigation — always running |

There is **no flat "harmony multiplier"** for keeping all four nodes active. Spatial bonuses come from **Elemental Adjacency** (below).

---

## Health vs Damage — Rhythm not Punishment

Arcane drains in **pulses** — moments of pressure followed by recovery.

- **Pulse interval:** 7.5s base (5.5s in Crucible)
- **Pulse damage:** 75 base, scaling `× (1 + cycle × 0.18)`; Crucible ×1.5 (112 base before scaling)
- **Node clicks** — primary restoration between pulses
- **Mitigation** — primarily from Aqua nodes and cards; stacks with adjacency dividends

Run ends when Arcane reaches zero. Loss feels like a missed rhythm, not punishment.

---

## Elemental Adjacency

Replaces the old Formation Harmony system (same-type stacking + opposition penalties). Applies to **base nodes only** (`ig`, `tr`, `vt`, `aq`).

**One magnitude:** ±5% per adjacent node of the paired element, **max 3 stacks** per pair on a given node.

**Opposed pairs** (Ignis–Aqua, Terra–Ventus):
- Both nodes suffer −gen from the opposing neighbor
- Board-wide dividend when opposed nodes touch: Ignis–Aqua → mitigation bonus; Terra–Ventus → faster overflow-to-AU

**Allied pairs** (four remaining cross-element pairs):
- Each feeds the other's specialty (e.g. Ventus crits arrive sooner near Ignis; Terra stores more near Aqua)
- Ignis pairings carry additional heat/risk riders

**Combined nodes:** Immune to adjacency penalties; may still benefit from allied bonuses where their parent elements qualify.

**Static disturbance:** Disables all adjacency bonuses (binary).

---

## Tendency & Snapshots

**Live run tendency** (`R.tend`) tracks per-element investment:
- Arcane spent on cards (per element)
- AU spent on node levels (+15 per hub level-up to `lastTend`)
- Output contribution per cycle (Ignis clicks, Terra harvests, Ventus crit Arcane, Aqua damage blocked)

**End-of-run:** Live tendency is captured as a frozen **snapshot**. Equip one snapshot in Record tab (or play Neutral).

**Card offerings** use the **equipped snapshot**, not live run tendency:
- Sharpened weights (exponent 1.7) favor committed playstyles
- Opposition suppression: dominant element >25% suppresses opposing element's card weight
- Dominant snapshot element: +35% card-draw weight for that element
- Arcane cards: require all four bases on board **and** run count multiple of 5
- Offers shaped by snapshot are marked ⚖ in UI

**Snapshots also grant:** Dominant-element generation bonus during runs (placeholder tuning).

Per-cycle tendency drift decays accrued scores slightly before new cycle output is added — prevents early lock-in without resetting profile.

---

## Cycle Advancement

Each Cycle requires **both** simultaneously:
1. **Generation threshold** — target Arcane generated this cycle
2. **Stability window** — Arcane above ~28% of max, held **3.5 seconds**

Between cycles: card selection overlay, placement window, next cycle begins with escalating thresholds and pulse pressure.

---

## Stability & Overflow

**Overflow:** When Arcane is full, excess fills a secondary reserve (gold zone on bar, ~32% of bar width). Overflow absorbs pulse damage before Arcane. Modest passive conversion to AU (`OVERFLOW_AU_RATE` = 0.1% of overflow per second, ×2 with Athanor's Breath). Consumed by pulses; does not persist between cycles.

**Excess at cap:** Small passive AU trickle from sustained full-bar play.

---

## Disturbances — Cursed Modifiers

12 total — 8 elemental (2 per element), 4 board-wide. Stack; severity scales per definition (caps at 80% where applicable).

**Phased appearance schedule:**

| Cycle range | Behavior |
|---|---|
| 1–4 | Grace — none |
| 5–11 | Intro: cycles 6 & 9 only |
| 12–17 | Every 3 cycles (12, 15) |
| 18–23 | Every 2 cycles (18, 20, 22) |
| 24+ | Every cycle |

*(Lessons use a parallel schedule: cycles 5, 8, 11, 14… — setup grace 1–4.)*

**Ignis:** Smoldering (faster overload), Flashfire (−yield)  
**Terra:** Silted (−fill rate), Sediment (passive decay while unharvested)  
**Ventus:** Flickering (shorter crit windows), Crosswind (irregular pulse timing)  
**Aqua:** Ebbing (−mitigation), Stagnant (passive pause after pulse)  
**Board:** Arcane Bleed (−all gen), Interference (+cooldowns), Static (adjacency off), Veil (readouts hidden)

Disturbances rolled at cycle boundaries may grant tendency toward their element.

---

## Lessons — Optional Encounters

**Schedule:** Every 3rd cycle from cycle 5 (5, 8, 11, 14…). Gold modal — accept or decline. Declined lessons leave the deck for this run. Multiple active lessons stack.

**Rewards per completion:**
- `3 + (total disturbance stacks)` AU
- +34% graduation progress (3 completions → 100%)

**Deck:** All 8 types shuffled; one dealt at a time; reshuffles when exhausted.

**Mastery win condition:** Complete all 8 lesson types at least once (tracked in `META.lessonsCompleted`) → Mastery screen → **Crucible Mode unlocked for this save slot**.

**Visual:** Gold chips in disturbance area; collapsible lesson panel; gold board tint during active lessons.

### Lesson Types

| Lesson | Objective |
|---|---|
| **Evocation** | Survive 5–10 pulse spikes at 2.5s intervals |
| **Abjuration** | Pulses suppressed; hold Arcane above 35% max for 45s while draining at 5% max/s × cycle |
| **Transmutation** | Controls scrambled: clicking a node works the nearest node of the next element in the loop Ig→Tr→Vt→Aq→Ig (loop built from elements on the board; clickable combined nodes rotate likewise); generate `1000 + cycle×100` |
| **Conjuration** | **3 random disturbances** at `1 + floor(cycle/6)` stacks each; generate target; disturbances removed on success |
| **Divination** | Catch 4–6 foreseen pulses above random thresholds (3s warning); miss one → fail |
| **Illusion** | Arcane bar hidden for 5–10 pulses; generate target blind |
| **Necromancy** | Per-node gray decay bars fill over time and on use; at 100% decay node runs at 30% efficiency; generate `1500 + cycle×120` before any node fully decays |
| **Enchantment** | One random traitor node — clicking it empowers next pulse (passive traitors reverse gen/mit); generate target while avoiding |

---

## Grimoire Cards

**Stages:** Discovered (trial this run) → Purchased with AU (owned permanently) → Equipped in Record tab (active future runs).

**Equip constraints:**
- **Slots:** 5 base → 10 max (`50 × 2^(slots−5)` AU per upgrade)
- **Capacity:** 5 base → 10 max (same cost curve)
- Tier 1 = 1 cap, Tier 2 / Arcane = 2 cap, Pinnacle = 5 cap

**Expanded Offering:** 3 → 5 cards shown per cycle (`15 × currentSlots` AU per upgrade).

**Removed:** Elemental Attunement meta upgrade (cut).

**Mid-run discovery:** Free trial for current run. Permanent effect requires AU purchase + equip.

**Card bonus inheritance:** Element cards apply to their element and all combined nodes inheriting that parent (`COMBINED_PARENTS` map).

**Always-available (not equipped):** Temporary reward cards, Shop card — repeat every cycle, no capacity cost.

**Arcane card gate:** All four bases on board + run count multiple of 5. Arcane cards cost **400 Arcane** (`ARCANE_CARD_COST`, below the 500 base threshold).

**Element relevance:** Base-element cards are only offered when that element is in play this run (on the board or in inventory, including combined nodes that inherit it).

Card pool: 10 cards per base element (x1–x4 Tier 1, x5–x8 Tier 2, x9 pinnacle, x10 placement), 9 Arcane cards. See `CARDS` array in build for exact names/effects.

---

## Node Leveling

**Cost:** `currentLevel × 50` AU (arithmetic: L1→2 = 50, L2→3 = 100, …)

**Effect multiplier:** `lvMult(lv) = 1 + ln(lv) + floor(lv/5) × 0.5`

Examples: L1 ×1.0, L2 ×1.69, L5 ×2.61, L10 ×3.30, L20 ×3.99

Also adds +15 to `lastTend` for that element per level-up.

> **Node levels = the floor rising. Grimoire cards = the ceiling expanding.**

---

## Node Purchasing & Inventory

**Hub/shop purchase cost:** `round(10 × 1.5^step)` AU per copy (combined `15 ×`). `step` starts at the number owned (starting hand) and **rises by 1 with every purchase of that type** — consuming or forging a node never lowers it (`META.nodePriceStep`).

**Limits:** 3 copies per base element (default max); combined nodes max 1 each.

**Consume mechanic (Preparation):** Sacrifice an owned node for permanent Arcane threshold bonus:
- Base element: +25
- Combined: +100
- Arcane Node: +500 each time it is consumed (system and row levels stay unlocked; each consumption raises the repurchase price ×1.5)

---

## Combined Nodes

### Discovery (The Forge progress bars)

Combined nodes are **not** bought directly. Discovery requires meeting **both** thresholds in `COMBINED_REQS` while parent elements are **adjacent on the board during runs**:

| Node | Parents | Cycles w/ adjacency | Achievement |
|---|---|---|---|
| Vapor | Ig+Vt | 15 | 150 Ignis clicks |
| Salt | Aq+Tr | 15 | 20 Pulses survived w/ Aqua |
| Ferrum | Ig+Tr | 15 | 200 Ignis clicks |
| Anima | Ig+Aq | 15 | 50 Pulses survived w/ both |
| Cinis | Tr+Vt | 15 | 50 Ventus crits |
| Glacii | Vt+Aq | 15 | 30 Ventus crits w/ Aqua |
| Impetus | Ig+Tr+Vt | 41 | 300 Ig clicks + Vt crits |
| Aestus | Ig+Tr+Aq | 41 | 100 Pulses survived w/ all 3 |
| Juncus | Ig+Vt+Aq | 41 | 250 Ig clicks + Vt crits |
| Ceptus | Tr+Vt+Aq | 41 | 500 damage blocked |

When discovery completes, the combined card can appear in cycle offerings. Purchasing the card unlocks forging in The Forge.

**Adjacency hints:** Placing compatible parents adjacent during a run boosts that combined card's offering weight.

### Forging (The Forge)

1. Select parent chips from inventory into forge slots
2. First forge: parents consumed from inventory; combined node created at level 1
3. **Parent level gates (first forge only):** vp/sl 1, fe/an 2, ci/gl 3, im 4, ae 5, ju 6, ce 7
4. First forge cost: ~15 AU; re-forge cost: 50 AU

**Transmutation** (120 AU unlock in Preparation): Re-forge into an **existing** combined node — parent levels sum into the combined node's level instead of creating a new copy.

Tri-nodes require all three prerequisite dual-combined nodes discovered first.

### Combined Node Mechanics

*(Unchanged from v2.0 — Vapor, Salt, Ferrum, Anima, Cinis, Glacii, Impetus, Aestus, Juncus, Ceptus. See NODE_DEFS in build.)*

---

## The Arcane Node

Singular meta-node — one copy in inventory at a time (max 1). Not an element; automates and amplifies the system.

### Acquisition

| Route | Detail |
|---|---|
| **The Forge shop** | Base price **1,000,000 AU**, discounted ×0.5 per dual-combined owned, ×0.4 per tri-combined owned |
| **Graduation reward** | "Arcane Node" in reward pool; +50 AU if already owned |
| **Cycle 50 milestone** | Auto-grant if not owned |
| **Repurchase** | If system unlocked (`META.arcane.owned`) but no physical copy consumed, banner in Forge allows repurchase at shop price |

### Consume

Consuming the placed/owned Arcane Node grants **+500 permanent** Arcane threshold (`ARCANE_NODE_CONSUME_BONUS`). The automation **system** stays unlocked and its row levels are kept; only the board piece is lost until repurchased. Each consumption multiplies the repurchase price by `ARCANE_REBUY_GROWTH` (1.5). An Arcane Node granted mid-run (Graduation, Cycle 50) goes straight to that run's inventory.

### Core Function — Observance (not bottom-bar autoplay)

Once placed, the Arcane Node **observes** nodes within its observance pattern and can auto-trigger them (efficiency row governs yield).

**Observance pattern** expands with **Observation row** level:
- L1–4: cardinal offsets + diagonal offsets (one per level)
- L5+: distance-2 cardinal offsets

Observed nodes must be base elements. Stressed state (Constitution overload interaction) or Static disturbance disables observance.

### Five Forge Rows (permanent upgrades, AU in The Forge)

| Row | Fuel | Effect |
|---|---|---|
| **Observation** | Ventus | Expands observance pattern |
| **Efficiency** | Aqua | Auto-yield +5%/level (50% base cap → 75% max) |
| **Aethergy** | Ignis | Baseline passive gen +0.5/s per level |
| **Constitution** | Terra | Mitigation +3%/level; stress cooldown on overload |
| **Alchemy** | Combined nodes | Blocked pulse → Arcane; rare AU trickle |

**Opposition pairs:** obs↔con, eff↔aet — leveling one row increases fuel cost for its opposite.

Row upgrade cost: `(level+1) × 150 AU` plus fuel. **Fuel is deposited one node at a time** in The Forge: each deposit consumes that node immediately and is banked on the row (`META.arcane.fuel`) until the upgrade, so levels needing more fuel than you can own at once are reachable. Nodes planned on the board can't be used. A tri-node fills the Alchemy row in one deposit.

**No autoplay toggle in bottom bar** — automation is intrinsic to the placed Arcane Node via observance + Efficiency row.

---

## Bottom Bar — Consumables

| Action | Effect | Cost |
|---|---|---|
| **Infusion** | +200 Arcane | 5 AU |
| **Surge** | ×1.4 all node speeds, 8s | 3 AU |
| **Amplify** | ×1.5 all output, 8s | 3 AU |
| **Cleanse** | Remove 1 random disturbance stack | 25 AU |

---

## Prestige — Graduation

**Progress:** Lessons only (+34% each). Cycles do not contribute.

At 100%, next cycle completion offers Graduation Challenge (after card/planning phase). Declining costs −34% progress.

### Graduation Challenges (random)

| Challenge | Win condition |
|---|---|
| **Ventus — Culmination Pulse** | 5 rapid pulses at 1.5× dmg; generate `2000 + cycle×150` |
| **Ignis — The Reckoning** | Board locked 60s; generate target while Arcane ≥50% max |
| **Aqua — The Bleed** | Continuous drain 60s; survive above zero |
| **Terra — Null Zones** | 1 dark zone expands every 8s for 40s; ≥1 node active at end |
| **Arcane — Reckoning of Curses** | All disturbance severities doubled 60s; survive |

Fail → grad resets to 0%, run continues. Win → pick 1 of 3 blind rewards, grad resets, run continues.

### Graduation Reward Pool (13 total, 3 drawn)

| Reward | Effect |
|---|---|
| 15 / 25 / 40 AU | Immediate AU |
| Ignis/Terra/Ventus/Aqua Surge | **Permanent** +1 level to every owned node of that lineage (base + forged combined nodes that inherit it) |
| Arcane Expansion | +100 arcMax this run |
| Arcane Expansion II | +250 arcMax this run |
| Pulse Reduction | −20% pulse damage this run |
| Cleanse | Remove 3 random disturbance stacks |
| Arcane Node | Grant node, or +50 AU if already owned |

Previously seen rewards in a run may appear face-up among the three choices (`META._gradRewardsSeen`).

---

## Crucible Mode

Unlocked per save slot after mastering all 8 lesson types once.

**Toggle:** Preparation tab (only visible when unlocked for current slot).

**Modifiers:** Faster pulses (5.5s), ×1.5 pulse damage, weaker node output. **×1.5 AU** on run end.

---

## Grimoire Card Persistence

Cards discovered with Arcane during a run are **lost at run end** unless purchased with AU in Hub. Creates tension between leveling (floor) and card permanence (ceiling).

---

## Progression Phases (Design Intent)

**Phase 1 — Student:** Short runs, base nodes, learning pulse rhythm and adjacency.

**Phase 2 — Practitioner:** Combined nodes, snapshots, disturbances, lessons, graduation rewards, Arcane Node automation.

**Phase 3 — Master:** Deep leveling, Crucible, full card loadouts, board expansion, tri-nodes.

---

## Cut / Future (Not in v0.13 Build)

Documented for reference — **do not implement from this section without explicit scope approval:**

| Feature | Status |
|---|---|
| **Grimoire Tendency Tree** (canvas hub page) | Replaced by **The Forge** + Glossary |
| **Formation Harmony** (same-type stacking) | Replaced by **Elemental Adjacency** |
| **Elemental Attunement** meta upgrade | Removed |
| **Enhanced Base Nodes (Tier II)** | Cut |
| **Unstable Nodes** | Cut |
| **Freeplay / Sandbox mode** | Future — was tied to Arcane Node "inner mechanism" |
| **Unending Mode** | Future — post-graduation incremental canvas |
| **Proximity effects** (six defined pairs) | Tabled |
| **Evolutionary combined forms** | Tabled |
| **Alternative node forms** (3 iterations per element) | Tabled |
| **Bottom-bar autoplay toggle** | Cut — observance is the automation model |
| **Balance harmony multiplier** (four-element spread bonus) | Cut |

---

## Explicitly Excluded (Scope Boundary)

- Routing or packet logic
- Domains or mini-games
- Equation system
- Center node (negative space preserved)

---

## Changelog from Concept v2.0

- Hub: 3 pages → **4 pages** (Record, Preparation, **The Forge**, **Glossary**); Tendency Tree page removed
- **Board Planner** dock on all hub tabs
- **Elemental Adjacency** replaces Formation Harmony
- Arcane max **1000 → 500** base; pulse damage **90 → 75**
- Node level cost **`8×1.6^(lv−1)` → `lv×50`**; multiplier adds `floor(lv/5)×0.5` term
- Aqua **generates and mitigates** (not mitigation-only)
- Combined discovery via **COMBINED_REQS** progress in The Forge (not prep-tab forging alone)
- **Transmutation** re-forge unlock (120 AU)
- **Arcane Node** reworked: 1M shop, 5 rows, observance, no nature upgrades / no autoplay toggle
- Disturbance schedule **phased** (grace 1–4, intro 6/9, ramp to every cycle at 24+)
- Lessons start **cycle 5** (not 3); Conjuration summons **3** disturbances; Necromancy uses **per-node decay bars**
- Graduation pool includes **Arcane Node** reward; surges are run-only
- Run-end AU: **`cycle×3` only** (removed `cards×2` term)
- **Crucible per save slot**
- **3 Grimoire save slots**
- **Elemental Attunement** removed
- **Tier II bases, Freeplay, Unending** marked cut/future

---

*End of document.*
