# How to Build a CodeApp with Claude — Step by Step
### Purchase Request System · Zero Complex Setup

---

## What You're Going to Do

Build a real Power Apps Code App (React + Vite) connected to your existing Dataverse tables, one small piece at a time, using Claude as your developer. No prior coding experience needed. Claude does the code — you describe what you want.

---

## PART 1 — ONE-TIME SETUP (do this once, never again)

### Step 1: Install the Three Tools

```
1. Node.js v22+        → https://nodejs.org  (pick LTS, v22 or higher)
2. Power Platform CLI  → https://aka.ms/PowerAppsCLI
3. Git (optional)      → https://git-scm.com
```

After installing, open PowerShell and verify:
```powershell
node --version       # should say v22.x.x
pac                  # should show pac help menu
```

If either fails, stop and fix it before continuing.

---

### Step 2: Pick Your Project Folder

Create a folder on your computer for this project. For example:
```
C:\Projects\purchase-request-app\
```

Open that folder in Claude (use "Select Folder" in Cowork). **All your work lives here.**

---

### Step 3: Create Your CLAUDE.md

`CLAUDE.md` is the brain Claude reads at the start of every session. It tells Claude everything about your project so you never have to re-explain things.

Create a file called `CLAUDE.md` in your project folder with this content (fill in YOUR details):

```markdown
# Purchase Request App — Project Brain

## What This App Does
A Power Apps Code App for managing purchase requests.
- Employees submit purchase requests
- Managers approve or reject requests
- Finance tracks approved spend

## My Dataverse Tables
- `cr_purchaserequest` — main request table
  - Fields: title, amount, status (choice), requestor (lookup to systemuser), department, notes
- `cr_purchaseitem` — line items per request
  - Fields: description, quantity, unitprice, requestid (lookup to cr_purchaserequest)
- `cr_department` — department reference table
  - Fields: name, budgetcode, manageremail

## My Power Platform Environment
- Environment name: [YOUR ENV NAME e.g. "Contoso Dev"]
- Environment ID: [YOUR ENV GUID — find it at make.powerapps.com → Settings]

## App Name
Purchase Request App

## Design Preferences
- Theme: Dark (background #1e1e1e, text white)
- Show version number top-right corner
- Mobile-friendly layout

## Key Rules Claude Must Follow
- NEVER use fetch() or axios() — always use the generated services
- Always run `npm run build` before deploying
- Never edit files inside `src/generated/`
- Ask me before deploying to Power Platform

## What's Been Built So Far
[Claude keeps this updated — don't edit this section manually]

## Current Status
[Claude keeps this updated]
```

> **Tip:** The more detail you put here, the less Claude will ask you questions. Update it whenever your requirements change.

---

### Step 4: Create Your Memory Bank

Create a file called `memory-bank.md` in your project folder. Claude updates this automatically — you just need to create it empty first:

```markdown
# Purchase Request App — Memory Bank

> Last Updated: [Claude fills this in]

## Project Overview

| Property       | Value                          |
|----------------|-------------------------------|
| App Name       | Purchase Request App           |
| Project Path   | [Your folder path]             |
| Environment    | [Your environment name]        |
| Environment ID | [Your environment GUID]        |
| App URL        | [Filled after first deploy]    |
| Version        | v1.0.0                         |
| Status         | In Progress                    |

## Completed Steps
[Claude checks these off as work is done]

## Created Resources
[Claude records tables, services, and components here]

## Current Status
Not started yet.

## Notes
[Claude adds session notes here]
```

---

### Step 5: Create Your Commands Folder

The `commands/` folder contains `.md` files that act like saved instructions you can hand to Claude. Think of them as your personal slash-command library.

Create this folder structure inside your project:

```
purchase-request-app/
├── CLAUDE.md                    ← project brain
├── memory-bank.md               ← progress tracker
├── commands/
│   ├── create-app.md            ← scaffold the whole app
│   ├── add-dataverse.md         ← connect a Dataverse table
│   ├── build-component.md       ← build one UI component
│   ├── build-hook.md            ← build one data hook
│   ├── test-component.md        ← test a component
│   └── deploy.md                ← deploy to Power Platform
├── src/                         ← Claude creates this
└── ...
```

---

## PART 2 — YOUR COMMAND FILES (copy these exactly)

### commands/create-app.md
```markdown
# Create Code App

Read CLAUDE.md and memory-bank.md first.

Scaffold a new Power Apps Code App in the current folder:

1. Check Node v22+ and pac CLI are installed
2. Run: npx degit microsoft/PowerAppsCodeApps/templates/vite . --force
3. Run: npm install
4. Run: pwsh -NoProfile -Command "pac code init --displayName 'Purchase Request App' -e [ENV_ID]"
5. Run: npm run build (verify it passes)
6. Run: pwsh -NoProfile -Command "pac code push" (baseline deploy — pre-approved)
7. Capture the App URL and save it to memory-bank.md
8. Do NOT add any features yet — just the blank template

Tell me the App URL when done.
```

### commands/add-dataverse.md
```markdown
# Add Dataverse Table

Read CLAUDE.md and memory-bank.md first.

The user will tell you which table to add. Then:

1. Run: pwsh -NoProfile -Command "pac code add-data-source -a dataverse -t [TABLE_NAME]"
2. Show me the generated service file location
3. Show me a usage example for getAll() and create() for this table
4. Run: npm run build (verify it passes — do NOT deploy)
5. Update memory-bank.md with the table added

Do NOT deploy. Just connect the table and verify the build passes.
```

### commands/build-component.md
```markdown
# Build Component

Read CLAUDE.md and memory-bank.md first.

The user will describe ONE component to build. Then:

1. Look at the existing src/ structure first
2. Read the relevant generated service files (use Grep, not Read — they're large)
3. Build the component in src/components/[ComponentName].tsx
4. Wire it to the generated service (never use fetch/axios)
5. Follow the dark theme from CLAUDE.md
6. Run: npm run build (fix any TypeScript errors before finishing)
7. Update memory-bank.md with the component added

Build ONE component only. Do NOT deploy. Do NOT build extra features not asked for.
```

### commands/build-hook.md
```markdown
# Build Hook

Read CLAUDE.md and memory-bank.md first.

The user will describe ONE data hook to build. Then:

1. Create the hook in src/hooks/use[Name].ts
2. The hook should: fetch data, handle loading state, handle error state, return { data, loading, error }
3. Use the generated services from src/generated/services/ — never fetch/axios
4. Export a clean TypeScript interface for the return type
5. Run: npm run build (verify it passes)
6. Show me a usage example
7. Update memory-bank.md

Build ONE hook only. Do NOT add UI. Do NOT deploy.
```

### commands/test-component.md
```markdown
# Test Component

The user will name a component to test. Then:

1. Read the component file
2. Check: does it import from generated services correctly?
3. Check: are all TypeScript types correct?
4. Check: does it handle loading and error states?
5. Check: does it have any unused imports (will break build)?
6. Run: npm run build
7. If build fails, fix errors and rebuild
8. Tell me: what works, what might need improvement, any edge cases to consider
```

### commands/deploy.md
```markdown
# Deploy App

Read CLAUDE.md and memory-bank.md first.

1. Run: npm run build
2. If build fails, fix errors — do NOT deploy with a broken build
3. Ask me: "Ready to deploy to [ENVIRONMENT NAME]? This will update the live app."
4. Wait for my confirmation
5. After I confirm: pwsh -NoProfile -Command "pac code push"
6. Capture the new App URL
7. Increment the version number in the app (e.g. v1.0.0 → v1.1.0)
8. Update memory-bank.md with the deploy

Do NOT deploy without my explicit confirmation.
```

---

## PART 3 — HOW TO USE CLAUDE (the workflow)

### How to start a session with Claude

Every time you open a new Claude session, start with:

> "Read CLAUDE.md and memory-bank.md in my project folder, then tell me what's been done and what's next."

Claude will read both files and give you a summary. You pick up from where you left off.

---

### How to use your command files

Instead of explaining things from scratch, just point Claude at a command file:

> "Follow commands/build-component.md — I want to build a Request List screen that shows all purchase requests from Dataverse in a table with columns: title, amount, status, date submitted."

Or for a hook:

> "Follow commands/build-hook.md — build a usePurchaseRequests hook that fetches all purchase requests from the cr_purchaserequest table, sorted by created date, newest first."

---

## PART 4 — BUILDING YOUR PURCHASE REQUEST SYSTEM (the actual sequence)

Follow these steps **in order**. Do ONE step, verify it works, then do the next.

---

### STEP A: Scaffold the App (do once)
Tell Claude:
> "Follow commands/create-app.md"

What happens: Claude scaffolds the blank app, deploys it so you can confirm the pipeline works, and saves the App URL.

✅ Done when: You can open the App URL and see a blank Power App.

---

### STEP B: Connect Your Dataverse Tables (one at a time)

Do each table separately:

**Table 1 — Purchase Requests:**
> "Follow commands/add-dataverse.md — add the table cr_purchaserequest"

**Table 2 — Purchase Items:**
> "Follow commands/add-dataverse.md — add the table cr_purchaseitem"

**Table 3 — Departments:**
> "Follow commands/add-dataverse.md — add the table cr_department"

✅ Done when: `npm run build` passes after each one.

---

### STEP C: Build Your Hooks (one at a time)

Hooks handle all your data fetching. Build them before components.

**Hook 1 — Fetch all requests:**
> "Follow commands/build-hook.md — build usePurchaseRequests that fetches all records from cr_purchaserequest. Return { requests, loading, error }. Include a refetch() function."

**Hook 2 — Fetch single request with its line items:**
> "Follow commands/build-hook.md — build usePurchaseRequest that takes an id parameter, fetches the matching cr_purchaserequest record, and also fetches all cr_purchaseitem records where requestid equals that id. Return { request, items, loading, error }."

**Hook 3 — Create or update a request:**
> "Follow commands/build-hook.md — build useSavePurchaseRequest that has a save(data) function. If data has an id, update the existing record. If no id, create a new one. Return { save, saving, error }."

✅ Done when: All three hooks build without TypeScript errors.

---

### STEP D: Build Your Components (one at a time)

**Component 1 — Request List (the main screen):**
> "Follow commands/build-component.md — build RequestList.tsx. It should use the usePurchaseRequests hook, display a table with columns: Title, Amount, Status (as a coloured badge — green=approved, yellow=pending, red=rejected), Submitted Date. Add a 'New Request' button at the top right. When a row is clicked, call an onSelect(id) prop."

After it's built, test it:
> "Follow commands/test-component.md — test RequestList.tsx"

**Component 2 — New Request Form:**
> "Follow commands/build-component.md — build RequestForm.tsx. It should have fields: Title (text), Amount (number), Department (dropdown loaded from cr_department), Notes (multiline text). A Submit button that uses useSavePurchaseRequest. Show a loading spinner while saving. Show a success message after saving. Call an onSaved() prop when done."

Test it:
> "Follow commands/test-component.md — test RequestForm.tsx"

**Component 3 — Request Detail View:**
> "Follow commands/build-component.md — build RequestDetail.tsx. It takes a requestId prop. Uses usePurchaseRequest to load the request and its line items. Shows the request header fields at top. Shows a table of line items below (description, qty, unit price, total). Shows an Approve and Reject button — these should update the status field on cr_purchaserequest. A Back button calls an onBack() prop."

Test it:
> "Follow commands/test-component.md — test RequestDetail.tsx"

**Component 4 — Wire everything together in App.tsx:**
> "Follow commands/build-component.md — update App.tsx to wire together all three screens. Use local state to track which screen is shown: 'list' | 'new' | 'detail'. Start on 'list'. New Request button → show 'new'. Row click → show 'detail' with the selected id. Back → return to 'list'. After form saved → return to 'list' and refresh."

✅ Done when: All four components build without errors.

---

### STEP E: First Real Deploy
> "Follow commands/deploy.md"

Claude builds, asks for your confirmation, then deploys.

✅ Done when: You open the App URL and can see and use your Purchase Request App.

---

### STEP F: Iterate
After using the app, come back to Claude with specific improvements:
> "Follow commands/build-component.md — add a search/filter box to RequestList.tsx that filters by title text"

> "Follow commands/build-component.md — add a line items section to RequestForm.tsx so users can add multiple items when submitting a request"

> "Follow commands/deploy.md" (when ready to push changes)

---

## PART 5 — KEY THINGS TO REMEMBER

### What Claude will do automatically
- Check `memory-bank.md` at the start of every command — no re-explaining needed
- Fix TypeScript errors before finishing
- Never deploy without asking you first
- Never edit generated files in `src/generated/`
- Always use the generated services, never raw API calls

### What YOU need to do
- Start each session: "Read CLAUDE.md and memory-bank.md"
- Point Claude at a command file rather than typing long instructions
- Test after every single component — don't batch them
- Deploy only when you're happy with a working set of changes

### Signs something is wrong
- Claude wants to use `fetch()` or `axios()` — remind it: "Use the generated service, not fetch"
- Build fails with TS6133 (unused import) — Claude should fix this automatically
- `pac code push` fails — check you're authenticated: `pwsh -NoProfile -Command "pac auth list"`

### Useful Claude phrases
| What you want | What to say to Claude |
|---|---|
| Resume from last time | "Read CLAUDE.md and memory-bank.md, what's next?" |
| Add a table | "Follow commands/add-dataverse.md — add [TABLE_NAME]" |
| Build something | "Follow commands/build-component.md — [describe it]" |
| Test what was built | "Follow commands/test-component.md — test [ComponentName]" |
| Deploy | "Follow commands/deploy.md" |
| Fix a bug | "The [component] has a bug: [describe it]. Fix it and rebuild." |
| Add a feature | "Add [feature] to [component]. Follow build-component standards." |

---

## PART 6 — QUICK REFERENCE: YOUR FILE STRUCTURE

Once everything is built, your folder will look like this:

```
purchase-request-app/
├── CLAUDE.md                          ← project brain (you maintain this)
├── memory-bank.md                     ← progress log (Claude maintains this)
├── commands/                          ← your instruction library
│   ├── create-app.md
│   ├── add-dataverse.md
│   ├── build-component.md
│   ├── build-hook.md
│   ├── test-component.md
│   └── deploy.md
├── power.config.json                  ← created by pac code init (don't edit)
├── package.json
├── src/
│   ├── App.tsx                        ← main app wiring
│   ├── components/
│   │   ├── RequestList.tsx
│   │   ├── RequestForm.tsx
│   │   └── RequestDetail.tsx
│   ├── hooks/
│   │   ├── usePurchaseRequests.ts
│   │   ├── usePurchaseRequest.ts
│   │   └── useSavePurchaseRequest.ts
│   └── generated/                     ← DO NOT EDIT (auto-generated)
│       ├── models/
│       └── services/
└── dist/                              ← built output (auto-generated)
```

---

## PART 7 — TROUBLESHOOTING

| Problem | Fix |
|---|---|
| `pac: command not found` | Always use `pwsh -NoProfile -Command "pac ..."` — never bare `pac` in bash |
| `node --version` shows v20 or below | Install Node 22+ or run `nvm use 22` |
| Build fails: TS6133 unused import | Ask Claude to remove the unused import and rebuild |
| `pac code push` says not authenticated | Run `pwsh -NoProfile -Command "pac auth list"` to check |
| Component shows no data | Check: is the table connected? Run add-dataverse.md for it |
| App URL not working | Check the environment — run `pwsh -NoProfile -Command "pac env list"` |

---

*Guide generated from the official power-platform-skills plugin repository.*
*Your plugin reference: C:\Users\nphoe\Documents\projects\AI Agent\power-platform-skills*
