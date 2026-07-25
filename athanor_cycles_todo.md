# ATHANOR CYCLES — Development Todo
*Synced July 22, 2026 against canonical build `athanor_cycles_va1.html`*
*Prefer the HTML as source of truth.*

## STATUS SNAPSHOT

| Area | Status |
|------|--------|
| Core loop · 15 nodes · lessons · graduation · Crucible | ✅ |
| Equip loadout (5/5) | ✅ sufficient — no further depth planned |
| Arcane Node + Forge + EA tray | ✅ |
| Combined level scaling | ✅ audited — all 10 scale via Transmutation; see audit section |
| Economy (soft-lock structure) | ✅ validated — no retune needed for itch |
| AU powers (Infusion / Surge / Amplify / Cleanse) | ✅ |
| #43 Rank mastery (+10% / +20%) | ✅ |
| ATHANOR cheat | ✅ hidden easter egg (no in-game hints) |

**Cut (Arcane direction):** Freeplay, Unending, Tier II bases, Mirror Nodes.

---

## ITCH.IO DEMO LAUNCH

- [x] Version label on title screen (`Demo v0.1.a`)
- [x] ATHANOR cheat — ship as undiscoverable easter egg (no in-game hints)
- [x] Mobile / touch layout (responsive CSS + tap / drag / pinch / Grimoire drawer)
- [ ] Page label: Demo / Early Access / WIP
- [ ] 5–8 screenshots + short cycle GIF
- [ ] Store blurb + controls (mouse/touch, pan/zoom, click, drag placement)
- [ ] Fonts: bundle or note CDN dependency
- [ ] Upload HTML5 zip to itch
- [ ] Smoke-test mobile embed (phone portrait + landscape)

---

## ECONOMY — validated ✅

*Reviewed July 22, 2026. Playtest feel: soft locks OK, AU is the centralized progress gate. **No economy retune required for itch demo** unless a specific trigger below fires.*

### Structure (confirmed in code)

**Power:** `lvMult(lv) = 1 + ln(lv) + floor(lv/5)×0.5` (log + ★ milestones)

**Primary income:** run-end `cycle × 3` AU (×1.5 Crucible). Side: overflow drip, lessons `3+stacks`, temps, graduation 15/25/40.

**Primary sinks:** node level `lv×50` · base buy `10×1.8^owned` · combined buy `15×1.8^owned` · board 500/1000/1500 · cards own 25/50/100 · Transmutation 120 · Arcane shop 1M→~400 at full collection · Arcane rows `(lv+1)×150` + fuel.

**Cycle pressure:** target starts 600, ×1.30/cycle — stays ahead of log-scaling meta power.

### Soft-lock reference (playtest sanity)

| Milestone | Typical cost | Runs needed @ cycle 10 (30 AU) | Runs @ cycle 20 (60 AU) |
|-----------|--------------|--------------------------------|-------------------------|
| One node → L2 | 50 AU | ~2 | ~1 |
| One node → L5 | 500 AU cum. | ~17 | ~9 |
| Board ring 1 | 500 AU | ~17 | ~9 |
| Transmutation | 120 AU | ~4 | ~2 |
| Arcane shop (pre-discount) | 1,000,000 AU | many | many |
| Arcane shop (full collection) | ~400 AU | ~14 | ~7 |

### Reopen economy only if…
- Early runs afford L4+ without depth (AU flooding)
- Arcane rows/shop feel free immediately after first duo
- Cleanse at 25 AU never worth using across 10+ runs
- Overflow AU rivals run-end income

---

## COMBINED NODE LEVEL AUDIT ✅

*Code audit July 22, 2026. Question: does leveling a combined node actually change its power?*

### How combined levels increase (by design)
- **First forge:** creates node at Lv1
- **Transmutation re-forge:** adds sum of consumed parent levels — **only intended path**
- **Graduation Surge rewards:** +1 level this run only (reverted at run end)
- **Prep “Level Up” (`hubLevel`):** **base nodes only** (`ig/tr/vt/aq`). Combined levels via Transmutation in The Forge only.

### Per-node scaling (Lv affects gameplay?)

| Node | Scales with level? | What changes | Notes |
|------|-------------------|--------------|-------|
| **Vapor** | ✅ | Click/crit yields (`lvMult`) | Crit interval fixed 3.5s — not level-gated |
| **Salt** | ✅ | Cap, fill rate, passive gen (`lvMult`) | Mit cap fixed 25% of fill — not level-gated |
| **Ferrum** | ✅ | Max boost multiplier (`lvMult` on heat curve) | |
| **Anima** | ✅ | Idle bonus cap + click yield (`lvMult`) | |
| **Cinis** | ✅ | Storage cap + fill rate (`lvMult`) | |
| **Glacii** | ✅ | Crystal dur/mit/gen + click yield (`lvMult`) | |
| **Impetus** | ✅ | Burst damage (`lvMult`) | Charge threshold **also** rises: `15 + lv×3` — higher Lv = bigger burst but more events needed |
| **Aestus** | ✅ | Absorb rate linear `×lv`; bonus→adjacent gen uses `lvMult` on decay | Two curves by design |
| **Juncus** | ✅ | Pulse window extend `1.5×lv`; future-window mult `1+0.4×lv` | Linear, not `lvMult` |
| **Ceptus** | ✅ | Reserve cap `300+(lv-1)×150`; burst `cap×0.8×lvMult` | Fill rate 1:1 blocked dmg — level doesn't speed fill |

**Verdict:** All 10 combined nodes advance mechanically when `META.nodeLevels[el]` rises. No cosmetic-only nodes found.

**Optional follow-ups (not blockers):**
- [ ] Consider level-scaling Vapor crit interval or Salt mit cap if late-game feels flat

---

## RANK MASTERY ✅

Universal combined-node bonus from Transmutation re-forges (`META.reforgeCount`):

| Rank | Re-forges | Bonus |
|------|-----------|--------|
| I | 0–1 | — |
| II | 2–3 | +10% output |
| III | 4+ | +20% output |

Applied via `rankMult()` in `genAmp` (generation) plus Ferrum boost, Salt mit, Aestus, Ceptus, Juncus, Glacii mit hooks.

---

## AU ABILITIES

| Power | Cost | Status |
|-------|------|--------|
| Infusion | 5 AU | ✅ |
| Surge | 3 AU | ✅ |
| Amplify | 3 AU | ✅ |
| Cleanse | 25 AU | ✅ |

---

## POLISH

- [x] **Name colorization** — element-colored names in body text / tooltips / lesson copy

---

## STILL OPEN (priority)

1. **Itch demo launch** — checklist above

---

*Canonical build: `athanor_cycles_va1.html` · Updated July 22, 2026*
