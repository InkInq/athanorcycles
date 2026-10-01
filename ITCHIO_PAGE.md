# Athanor Cycles — itch.io Page Guide (Demo v0.1.b)

Everything needed to set up (or update) the itch.io page: form fields, page text to paste, uploads, and the launch checklist.
Edit freely — this is a working guide, not generated output.

---

## 1. Release files (v0.1.b)

Both are built from the same game file (`athanor_cycles_va1.html`) — see `desktop/README.md` for how to rebuild.

| Upload | File | Size | itch.io upload settings |
|--------|------|------|--------------------------|
| **Browser (HTML5)** | `release/v0.1.b/athanor-cycles-v0.1.b-html5.zip` (in the repo) | ~240 KB | Kind: HTML · tick **"This file will be played in the browser"** |
| **Windows download** | `release/v0.1.b/athanor-cycles-v0.1.b-windows.zip` (built locally — too big for GitHub) | ~139 MB | Tick the **Windows** platform icon · leave "played in the browser" unticked |

**Embed options** (Edit game → Embed options), for the HTML5 upload:
- Viewport: **1280 × 720** (the game needs at least ~960 × 600; the layout adapts above that)
- ✓ **Mobile friendly** — orientation: **Landscape** (portrait also works; landscape is more comfortable)
- ✓ **Fullscreen button**
- ✗ Automatically start on page load (let players click "Run game")
- ✗ SharedArrayBuffer support (not needed)

**Updating later:** upload the new zips and delete (or hide) the old ones, or push with itch's `butler` tool — the itch.io app then updates installed copies automatically.

---

## 2. Project settings

| Field | Value |
|-------|-------|
| **Title** | Athanor Cycles |
| **URL** | `athanor-cycles` (or your handle) |
| **Classification** | Games |
| **Kind of project** | HTML (the Windows download is added as a second file) |
| **Release status** | In development |
| **Pricing** | Pay what you want (suggested: $0 minimum) |
| **Genre** | Strategy (alt: Simulation) |
| **Tags** | roguelite, incremental, alchemy, magic, strategy, deckbuilding, singleplayer, browser, early-access |
| **Platforms** | HTML5 · Windows |
| **Inputs** | Mouse · Keyboard · Touchscreen |
| **Average session** | A few minutes (runs are short) |
| **Languages** | English |
| **Accessibility** | Configurable (tooltip / floating-text opacity, screen shake toggle) |
| **Visibility** | Draft until the cover, screenshots and GIF are in; then Public |

**Cover image:** 630 × 500 — gold Cinzel wordmark + the athanor logo on the dark UI (the title screen works as a base; `desktop/build/icon.png` is the logo on its own).

**Page label decision (Demo / Early Access / WIP):** the title screen already says *Demo v0.1.b*; pairing that with Release status **In development** reads as "free, evolving demo". Adjust if you'd rather call it Early Access.

---

## 3. Short description (≤140 characters)

```
A magical-academia roguelite incremental. Place elemental nodes, survive Arcane pulses, and grow your Grimoire between runs.
```

## 4. More information (sidebar blurb)

```
A magical-academia roguelite incremental. Play in the browser or download for Windows. In development — feedback welcome. Pay what you want.
```

---

## 5. Description (HTML body)

Paste into the Description field (switch the editor to HTML):

```html
<p><em>Demo v0.1.b — in development. Systems are playable; balance and polish are ongoing. Play in your browser or download for Windows. Pay what you want.</em></p>

<p><strong>Athanor Cycles</strong> is a magical-academia roguelite incremental. Arrange elemental nodes on a diamond board, generate Arcane — your health and your currency — and weather escalating pulses and disturbances. Survive as many Cycles as you can, take on Lessons, Graduate, and spend what you earned in the Grimoire to come back stronger.</p>

<!-- [GIF 01 — HERO LOOP] ~8–15s of a live cycle: nodes lit, a pulse landing, the Arcane bar reacting, a crit window -->
<p><em>[GIF 01 — Live cycle loop]</em></p>

<hr>

<h2>The loop</h2>
<ul>
  <li><strong>Place</strong> Ignis, Terra, Ventus and Aqua — and later combined nodes — on the board. Neighbours matter.</li>
  <li><strong>Run</strong> — click, harvest and time crits to generate Arcane while pulses drain it.</li>
  <li><strong>Advance Cycles</strong> by hitting each Cycle's generation target and holding your Arcane steady.</li>
  <li><strong>Lessons</strong> — optional challenges that fill your Graduation progress; Graduate for a lasting reward.</li>
  <li><strong>Return to the Grimoire</strong> — level nodes, own cards, forge combined nodes, expand the board, plan your next layout.</li>
</ul>

<!-- [SCREENSHOT 02] -->
<p><em>[SCREENSHOT 02 — Mid-run board with active nodes and the Arcane/pulse UI]</em></p>

<hr>

<h2>What's in this build</h2>
<ul>
  <li><strong>15 node types</strong> — 4 base · 6 dual · 4 tri · the Arcane Node (automation)</li>
  <li><strong>8 Lessons</strong>, 5 Graduation challenges, 12 disturbances — master every Lesson to unlock <strong>Crucible Mode</strong></li>
  <li><strong>Grimoire cards</strong> — discover them in runs, own them for good, equip a loadout (5 slots, expandable to 10)</li>
  <li><strong>The Forge</strong> — discover and forge combined nodes; Transmutation for deeper power; grow the Arcane Node</li>
  <li><strong>Tendency</strong> — how you play shapes which cards the academy offers next</li>
  <li>Three save slots · Glossary / Compendium that fills in as you learn</li>
</ul>

<!-- [SCREENSHOT 03] -->
<p><em>[SCREENSHOT 03 — Grimoire hub: Preparation or Record tab]</em></p>
<!-- [SCREENSHOT 04] -->
<p><em>[SCREENSHOT 04 — The Forge with a combined / tri node]</em></p>
<!-- [SCREENSHOT 05] -->
<p><em>[SCREENSHOT 05 — Lesson offer or Graduation reward pick]</em></p>
<!-- [SCREENSHOT 06] -->
<p><em>[SCREENSHOT 06 — Pressure moment: low Arcane, a disturbance, or a spike]</em></p>
<!-- [SCREENSHOT 07] -->
<p><em>[SCREENSHOT 07 — Board planner before a run]</em></p>

<hr>

<h2>Controls</h2>
<ul>
  <li><strong>Click / tap</strong> nodes to generate; choose cards, Lessons and rewards</li>
  <li><strong>Drag</strong> to place and rearrange nodes (between Cycles, and in the Grimoire's board planner)</li>
  <li><strong>Pan / zoom</strong> — drag empty board space · mouse wheel or pinch to zoom</li>
  <li><strong>Double-click / long-press</strong> a placed node to return it to inventory (while placing)</li>
  <li><strong>Enter</strong> — finish placing · <strong>P</strong> — pause · <strong>Esc</strong> — resume</li>
  <li><strong>Return to Title</strong> (pause menu) suspends your run: resume it later for a little AU, or end it</li>
  <li><strong>Mobile</strong> — the Grimoire panel opens from the ⬡ button; the hub stacks vertically</li>
  <li><strong>Windows version</strong> — F11 toggles fullscreen · Quit Game on the title screen</li>
</ul>

<hr>

<h2>Notes</h2>
<ul>
  <li><strong>Saves</strong> — the browser version saves in your browser (clearing site data wipes it); the Windows version saves on your PC. The two don't share saves.</li>
  <li><strong>Windows download</strong> — unzip anywhere and run <code>AthanorCycles.exe</code>, or install through the itch.io app. Windows may show "Windows protected your PC" because the game isn't code-signed yet — choose <em>More info → Run anyway</em>.</li>
  <li>Works offline once loaded (fonts are built in). Sound and ambience are synthesized in-game — volume and mute are in Settings.</li>
  <li>Dense systems; early runs teach by doing — the Glossary helps.</li>
</ul>

<hr>

<p><em>Open a new Grimoire. Survive the pulses. Graduate — or burn out trying.</em></p>
```

---

## 6. Screenshot / GIF shot list

| # | Asset | Capture |
|---|-------|---------|
| **GIF 01** | Hero loop (~8–15 s) | Mid-run: generation → pulse → bar reaction (best first media) |
| **02** | Run board | Full UI, several nodes lit |
| **03** | Grimoire hub | Preparation or Record |
| **04** | The Forge | Combined/tri node visible |
| **05** | Lesson / Graduation | Offer or sealed reward pick |
| **06** | Pressure | Low Arcane, disturbance, or Evocation spike |
| **07** | Board planner | Pre-run layout |
| **08** | Optional | Glossary or the Elemental Adjacency tray |

Aim for **16:9**, UI readable at gallery size, no cheat/debug overlays (don't type ATHANOR while capturing).

---

## 7. Launch checklist

**Build**
- [x] Version label on title screen — `Demo v0.1.b`
- [x] ATHANOR cheat ships as an undiscoverable easter egg (not mentioned on the page)
- [x] Mobile / touch layout
- [x] Fonts bundled into the game (works offline; no Google Fonts dependency)
- [x] HTML5 zip built — `release/v0.1.b/athanor-cycles-v0.1.b-html5.zip`
- [x] Windows build — `release/v0.1.b/athanor-cycles-v0.1.b-windows.zip` (build locally: `desktop/README.md`)
- [ ] Merge the review-fix and release branches into `main`

**Page**
- [ ] Page label / release status decided (see §2)
- [ ] Cover image (630 × 500)
- [ ] GIF 01 + screenshots 02–07 (08 optional)
- [ ] Short description, sidebar blurb and HTML body pasted (§3–5)
- [ ] Pricing: Pay what you want
- [ ] Tags, genre, inputs, platforms set (§2)

**Upload & test**
- [ ] Upload the HTML5 zip (played in browser) and set embed options (§1)
- [ ] Upload the Windows zip (Windows platform)
- [ ] Remove/hide the old v0.1.a upload
- [ ] Smoke-test the embed in Chrome (desktop)
- [ ] Smoke-test on a real phone — portrait and landscape
- [ ] Download the Windows zip from the page on a PC and run it (check the SmartScreen prompt, saves, Quit)
- [ ] Optional: devlog post announcing v0.1.b
