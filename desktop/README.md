# Athanor Cycles — building the release files

The game is one file: **`athanor_cycles_va1.html`** (in the folder above this one). That's the only file you edit.
This `desktop` folder turns it into the two itch.io uploads:

| Output | What it is |
|--------|-----------|
| `release/v<version>/athanor-cycles-v<version>-html5.zip` | Browser version (the zip holds the game as `index.html`) |
| `release/v<version>/athanor-cycles-v<version>-windows.zip` | Standalone Windows game (`AthanorCycles.exe`, made with Electron) |

## One-time setup

You need **Node.js** (already installed on this PC). Then, in a terminal inside this `desktop` folder:

```
npm install
```

This downloads Electron (~110 MB) into `desktop/node_modules` — it's ignored by git and only needed for building.
If `desktop\node_modules\electron\dist\electron.exe` is missing afterwards, run `node node_modules/electron/install.js`.

## Making a new release

1. **Bump the version** on the title screen in `athanor_cycles_va1.html` — the line
   `<div class="t-ver">Demo v0.1.b</div>`. The build reads the version from here; nothing else needs changing.
2. In a terminal inside `desktop`:
   ```
   npm run release
   ```
   This builds both zips into `release/v<version>/`.
3. **Test the Windows build** by running `desktop\dist\Athanor Cycles-win32-x64\AthanorCycles.exe`.
4. Upload both zips to itch.io (see `ITCHIO_PAGE.md` for the upload settings).
5. Commit. The HTML5 zip is committed; the Windows zip is ignored by git on purpose — it's ~139 MB,
   over GitHub's 100 MB file limit — so upload it straight to itch.io.

Other commands (run inside `desktop`):

| Command | Does |
|---------|------|
| `npm start` | Runs the Windows version straight from the current game file, with DevTools available (Ctrl+Shift+I) — handy for testing |
| `npm run html5` | Builds only the browser zip |
| `npm run windows` | Builds only the Windows zip |
| `npm run icon` | Regenerates `build/icon.ico` + `build/icon.png` from the title-screen logo. Replace those two files with your own art any time — the build uses them as they are. |

## How the Windows version works

- `main.js` opens the game in its own window (1280×800, resizable, no browser toolbar). F11 toggles fullscreen.
- `preload.js` gives the game one extra ability — `window.athanorDesktop.quit()` — which makes the **Quit Game** button appear on the title screen. In a browser that button stays hidden.
- Saves are stored in `%APPDATA%\Athanor Cycles` (separate from browser saves).
- Only one copy of the game can run at once (two would overwrite each other's saves).
- The game can't browse the web; any web link opens in your normal browser.

## Good to know

- **"Windows protected your PC"**: the .exe isn't code-signed, so Windows SmartScreen warns on first launch.
  Players click *More info → Run anyway*. Removing the warning requires buying a code-signing certificate.
- **Size**: most of the ~139 MB is Electron's built-in browser engine; the game itself is under 1 MB.
  Language packs other than English are stripped during the build.
- **Mac/Linux**: not set up yet. A Mac build must be made (and signed) on a Mac.
