# Component Build Sequence

This file is your exact build roadmap. Each step has:
- What to tell Claude (copy-paste the prompt)
- What Claude will produce
- What "done" looks like

Read memory-bank.md before starting. Pick up from the first unchecked item.

---

## PHASE 0 — Scaffold (do once)

**Prompt:**
> "Read CLAUDE.md and memory-bank.md, then follow commands/create-app.md"

Done when: App URL works, blank template deployed. Update memory-bank.md Phase 0 checkboxes.

---

## BEFORE PHASE 1 — One-time setup (do once, never again)

**Prompt:**
> "Read CLAUDE.md and memory-bank.md, then follow commands/setup-preview.md"

Done when: `src/styles/theme.ts` exists, `src/preview/ComponentPreview.tsx` exists, preview wired into entry point, `npm run build` passes.

**Optional — enable tests:**
> "Follow commands/setup-tests.md"

Done when: `vitest.config.ts` exists, `npm run test:run` passes on the reference Button test.

---

## PHASE 1 — Atoms (Layer 1)
Build these with `build-atom.md`. Each one gets variants, sizes, disabled state, a test file, and a preview entry automatically.

**Pattern for every atom:**
> "Follow commands/build-atom.md — [ComponentName] | [one line description]"

After each one: run `npm run dev`, open `http://localhost:5173/?preview`, select the component. Verify it looks right before moving on.

---

### 1.1 — Badge

**What it does:** Coloured pill label for status and urgency. Used on every screen.

**Prompt:**
> "Follow commands/build-atom.md — Badge | Coloured pill label for request status and urgency level
>
> Extra props beyond the standard set:
> - label: string (the text inside the pill)
> - Also support these app-specific variants that map to theme colours:
>   'critical', 'high', 'medium', 'low', 'pending', 'approved', 'rejected',
>   'draft', 'completed', 'submitted', 'in-review', 'cancelled'
>   (extend the variant union type to include these alongside primary/secondary/success/danger/warning)
> - Style: border-radius full (pill shape), font-weight 600, no border, uppercase optional"

Done when: build passes, all tests pass, visible in preview at `?preview`.

---

### 1.2 — Button

**What it does:** Reusable button. Primary (dark filled), secondary (outline), ghost.

**Prompt:**
> "Follow commands/build-atom.md — Button | Clickable button with primary, secondary, and ghost styles
>
> Extra props:
> - children: React.ReactNode
> - icon?: React.ReactNode (renders left of children)
> - loading?: boolean (shows Spinner, disables click)
> - type?: 'button' | 'submit' (default 'button')
> - ghost variant: no background, no border, text #6b7280, hover light grey
> - primary variant uses colors.primary from theme (near-black #111827 background)"

Done when: build passes, all tests pass, visible in preview.

---

### 1.3 — SearchBar

**What it does:** Controlled text input with magnifying glass. Used on Requests, Catalog, Projects.

**Prompt:**
> "Follow commands/build-atom.md — SearchBar | Controlled text search input with magnifying glass icon
>
> Extra props:
> - value: string
> - onChange: (value: string) => void
> - placeholder?: string
> - No search button — filters on every keystroke
> - variant controls the border/focus colour
> - Full width by default"

Done when: build passes, all tests pass, visible in preview.

---

### 1.4 — FilterSelect

**What it does:** Dropdown with funnel icon. Used for All Status, All Departments, All Levels.

**Prompt:**
> "Follow commands/build-atom.md — FilterSelect | Dropdown filter with funnel icon prefix
>
> Extra props:
> - label: string (shown as the default 'All X' option)
> - options: { value: string; label: string }[]
> - value: string
> - onChange: (value: string) => void
> - Small funnel icon on the left inside the select, chevron on the right
> - Native HTML select element is fine"

Done when: build passes, all tests pass, visible in preview.

---

### 1.5 — SortButton

**What it does:** Inline sort toggle — cycles asc → desc → null on click.

**Prompt:**
> "Follow commands/build-atom.md — SortButton | Sort direction toggle button cycling asc, desc, and off
>
> Extra props:
> - label: string
> - direction: 'asc' | 'desc' | null
> - onClick: () => void
> - Show ↑↓ when null (both arrows, both grey), ↑ when asc (up dark, down light), ↓ when desc
> - No background — inline text-style button"

Done when: build passes, all tests pass, visible in preview.

---

### 1.6 — Avatar

**What it does:** Circular badge showing an approval level number.

**Prompt:**
> "Follow commands/build-atom.md — Avatar | Circular badge showing an approval level number
>
> Extra props:
> - level: number (shown as text inside the circle)
> - Each variant maps to a different circle fill colour:
>   primary=dark, secondary=grey, success=green, danger=red, warning=orange
> - Default variant is 'warning' (orange — matches the Approvals screenshot)"

Done when: build passes, all tests pass, visible in preview.

---

### 1.7 — ViewToggle

**What it does:** Grid / List view icon switch. Used on Catalog.

**Prompt:**
> "Follow commands/build-atom.md — ViewToggle | Two-button toggle between grid and list view
>
> Extra props:
> - view: 'grid' | 'list'
> - onChange: (view: 'grid' | 'list') => void
> - Grid icon = 2×2 squares, List icon = horizontal lines
> - Active button gets variant background, inactive is ghost
> - Use simple inline SVG for icons, no external library"

Done when: build passes, all tests pass, visible in preview.

---

### 1.8 — Checkbox

**What it does:** Styled checkbox with indeterminate state. Used on Catalog rows and select-all.

**Prompt:**
> "Follow commands/build-atom.md — Checkbox | Styled checkbox with indeterminate state for select-all
>
> Extra props:
> - checked: boolean
> - indeterminate?: boolean (dash instead of tick, for select-all header)
> - onChange: (checked: boolean) => void
> - 16px square, border-radius 3px
> - Checked = primary variant fill + white tick
> - Indeterminate = primary variant fill + white dash
> - Unchecked = white fill + grey border"

Done when: build passes, all tests pass, visible in preview.

---

### 1.9 — Spinner

**What it does:** CSS loading animation. Used inside any loading state.

**Prompt:**
> "Follow commands/build-atom.md — Spinner | CSS animated loading circle indicator
>
> Extra props:
> - (no extra props beyond standard variant/size/disabled)
> - Pure CSS border animation — no external library or SVG
> - variant controls the spinner colour
> - size controls diameter: sm=16px, md=24px, lg=32px"

Done when: build passes, all tests pass, visible in preview.

---

### 1.10 — EmptyState

**What it does:** Zero-results placeholder. Every list needs this.

**Prompt:**
> "Follow commands/build-atom.md — EmptyState | Centred placeholder shown when a list has no results
>
> Extra props:
> - icon?: React.ReactNode (large, shown above title)
> - title: string
> - message?: string (smaller text below title)
> - action?: React.ReactNode (button or link below message)
> - variant controls the icon tint colour
> - Centred layout, light dashed border optional"

Done when: build passes, all tests pass, visible in preview.

---

### 1.4 — FilterSelect

**What it does:** Dropdown with a funnel icon prefix. Used for All Status, All Departments, All Levels etc.

**Prompt:**
> "Follow commands/build-component.md — build src/components/ui/FilterSelect.tsx
>
> Props:
> - label: string (e.g. 'All Status')
> - options: { value: string; label: string }[]
> - value: string
> - onChange: (value: string) => void
>
> Style: white background, border 1px #e5e7eb, border-radius 8px, small funnel icon on the left, chevron-down on the right, height 40px. Show label as the default (value = ''). Native HTML select is fine."

Done when: `npm run build` passes.

---

### 1.5 — SortButton

**What it does:** A button with a label and up/down sort arrows. Cycles asc → desc → null.

**Prompt:**
> "Follow commands/build-component.md — build src/components/ui/SortButton.tsx
>
> Props:
> - label: string
> - direction: 'asc' | 'desc' | null
> - onClick: () => void
>
> Style: small inline button, no background, text #374151, font-weight 600, arrows shown as ↑↓ when null, ↑ when asc, ↓ when desc. Active direction arrow is dark, inactive is light grey."

Done when: `npm run build` passes.

---

### 1.6 — Avatar

**What it does:** Circular badge showing an approval level number. Used on My Approvals.

**Prompt:**
> "Follow commands/build-component.md — build src/components/ui/Avatar.tsx
>
> Props:
> - level: number
> - color?: string (default '#f97316' orange)
> - size?: 'sm' | 'md' (default md — 40px diameter)
>
> Style: filled circle, level number centred in white bold text. Example: level=5 shows '5' in an orange circle."

Done when: `npm run build` passes.

---

### 1.7 — ViewToggle

**What it does:** Grid / List icon toggle. Used on Catalog screen.

**Prompt:**
> "Follow commands/build-component.md — build src/components/ui/ViewToggle.tsx
>
> Props:
> - view: 'grid' | 'list'
> - onChange: (view: 'grid' | 'list') => void
>
> Style: Two icon buttons side by side — grid icon and list icon. Active icon has a light grey background. Use simple SVG or Unicode for the icons."

Done when: `npm run build` passes.

---

### 1.8 — Checkbox

**What it does:** Styled checkbox. Used on Catalog rows and the select-all header.

**Prompt:**
> "Follow commands/build-component.md — build src/components/ui/Checkbox.tsx
>
> Props:
> - checked: boolean
> - indeterminate?: boolean (for select-all state)
> - onChange: (checked: boolean) => void
> - disabled?: boolean
>
> Style: 16px square, border 1.5px #d1d5db, border-radius 3px. Checked = dark filled (#111827) with a white checkmark. Indeterminate = dark filled with a white dash."

Done when: `npm run build` passes.

---

### 1.9 — Spinner

**What it does:** Loading indicator. Used inside any component while data loads.

**Prompt:**
> "Follow commands/build-component.md — build src/components/ui/Spinner.tsx
>
> Props:
> - size?: 'sm' | 'md' | 'lg' (default md — 24px)
> - color?: string (default '#6b7280')
>
> Style: CSS border-based spinning circle animation. No external library."

Done when: `npm run build` passes.

---

### 1.10 — EmptyState

**What it does:** Friendly zero-results message. Used in every list when data is empty.

**Prompt:**
> "Follow commands/build-component.md — build src/components/ui/EmptyState.tsx
>
> Props:
> - icon?: React.ReactNode
> - title: string
> - message?: string
> - action?: React.ReactNode
>
> Style: centred layout, icon large and grey, title in #374151 font-weight 600, message in #6b7280, action button below. Light grey background with dashed border optional."

Done when: `npm run build` passes.

---

## PHASE 2 — Shared Blocks (Layer 2)
These compose the atoms from Phase 1. Still no Dataverse data yet.

---

### 2.1 — TopNav

**What it does:** App-wide navigation bar. Render it once in App.tsx.

**Prompt:**
> "Follow commands/build-component.md — build src/components/shared/TopNav.tsx
>
> Props:
> - appName: string
> - subtitle?: string
> - navItems: { key: string; label: string; icon: React.ReactNode }[]
> - activeKey: string
> - onNavigate: (key: string) => void
>
> Style: white background, full-width, height 56px, border-bottom 1px #e5e7eb.
> Left side: small square logo icon, then appName in bold, subtitle in small grey text below.
> Centre/right: nav links. Active link = dark filled pill (#111827 bg, white text). Inactive = grey text, hover light grey pill.
> Match the screenshots exactly."

Done when: `npm run build` passes.

---

### 2.2 — PageHeader

**What it does:** Page title, subtitle, and action buttons slot. Used at the top of every page.

**Prompt:**
> "Follow commands/build-component.md — build src/components/shared/PageHeader.tsx
>
> Props:
> - title: string
> - subtitle?: string
> - actions?: React.ReactNode
>
> Style: flex row, title on left (font-size 24px, font-weight 700), subtitle below in grey #6b7280, actions slot on the right. Bottom margin 24px."

Done when: `npm run build` passes.

---

### 2.3 — StatCard

**What it does:** Summary stat with icon, label, number. Used on Dashboard (5 cards) and Approvals (3 cards).

**Prompt:**
> "Follow commands/build-component.md — build src/components/shared/StatCard.tsx
>
> Props:
> - label: string
> - value: number | string
> - icon: React.ReactNode
> - variant: 'default' | 'warning' | 'success' | 'danger' | 'info'
>
> Variant icon background colours:
> - default → #f3f4f6 (grey)
> - warning → #fef3c7 (yellow)
> - success → #d1fae5 (green)
> - danger → #fee2e2 (red)
> - info → #dbeafe (blue)
>
> Style: white card, border 1px #e5e7eb, border-radius 12px, padding 20px.
> Layout: label top-left in grey small text, value large bold below, icon top-right in a rounded square with variant background colour.
> Match the dashboard screenshot cards."

Done when: `npm run build` passes.

---

### 2.4 — FilterBar

**What it does:** Layout wrapper that holds SearchBar + FilterSelects in a styled container.

**Prompt:**
> "Follow commands/build-component.md — build src/components/shared/FilterBar.tsx
>
> Props:
> - children: React.ReactNode
>
> Style: white background, border 1px #e5e7eb, border-radius 12px, padding 16px.
> Children displayed as a flex row with gap 12px, wrapping on small screens."

Done when: `npm run build` passes.

---

### 2.5 — Tabs

**What it does:** Pill-style tab switcher with optional count badge per tab. Used on Approvals.

**Prompt:**
> "Follow commands/build-component.md — build src/components/shared/Tabs.tsx
>
> Props:
> - tabs: { key: string; label: string; count?: number }[]
> - activeKey: string
> - onChange: (key: string) => void
>
> Style: inline tab buttons, no underline.
> Active tab: slight dark background pill, text #111827, bold.
> Inactive: transparent, text #6b7280.
> Count shown as a small number next to label (e.g. 'Pending (3)').
> Match the Approvals screenshot tabs."

Done when: `npm run build` passes.

---

## PHASE 3 — Connect Dataverse Tables

**After Phase 2 is done**, connect the tables one at a time. Each adds generated service files.

### 3.1 Connect cr38e_purchaserequest
> "Follow commands/add-dataverse.md — add the table cr38e_purchaserequest"

### 3.2 Connect cr38e_purchaserequestapproval
> "Follow commands/add-dataverse.md — add the table cr38e_purchaserequestapproval"

### 3.3 Connect cr38e_purchaserequestdetail
> "Follow commands/add-dataverse.md — add the table cr38e_purchaserequestdetail"

### 3.4 Connect cr38e_richtextfile
> "Follow commands/add-dataverse.md — add the table cr38e_richtextfile"

### 3.5 Connect cr38e_project (when ready)
> "Follow commands/add-dataverse.md — add the table cr38e_project"

### 3.6 Connect cr38e_masterorderingcatalog (when ready)
> "Follow commands/add-dataverse.md — add the table cr38e_masterorderingcatalog"

---

## PHASE 4 — Hooks (data access layer)

Build these after Phase 3. Hooks wrap the generated services in clean, reusable state logic.

### 4.1 — useDashboardStats
> "Follow commands/build-hook.md — build useDashboardStats.
> It should fetch counts from cr38e_purchaserequest: total records, count where cr38e_status=100000001 (Submitted/Pending), count where cr38e_status=100000003 (Approved), count where cr38e_status=100000004 (Rejected), and sum of cr38e_totalamount for all records.
> Return { totalRequests, pending, approved, rejected, totalValue, loading, error }."

### 4.2 — usePurchaseRequests
> "Follow commands/build-hook.md — build usePurchaseRequests.
> Accepts optional filters: { statusFilter?: number; searchText?: string; sortField?: string; sortDir?: 'asc' | 'desc' }.
> Fetches cr38e_purchaserequest records. Select: cr38e_purchaserequestid, cr38e_pornumber, cr38e_itemdescription, cr38e_requestorname, cr38e_totalamount, cr38e_status, cr38e_urgencylevel, cr38e_duedate, cr38e_submitteddate.
> NEVER select virtual fields.
> Return { requests, loading, error, refetch }."

### 4.3 — usePurchaseRequest (single record)
> "Follow commands/build-hook.md — build usePurchaseRequest.
> Accepts id: string. Fetches one cr38e_purchaserequest by id.
> Also fetches related cr38e_purchaserequestdetail records (filter by cr38e_purchaserequest = id).
> Also fetches related cr38e_purchaserequestapproval records (filter by cr38e_purchaserequest = id, order by cr38e_level asc).
> Return { request, lineItems, approvals, loading, error, refetch }."

### 4.4 — useSavePurchaseRequest
> "Follow commands/build-hook.md — build useSavePurchaseRequest.
> Has save(data: Partial<Cr38e_purchaserequestModel>) function — creates if no id, updates if id present.
> Return { save, saving, error }."

### 4.5 — useMyApprovals
> "Follow commands/build-hook.md — build useMyApprovals.
> Fetches cr38e_purchaserequestapproval records. Accept optional levelFilter?: number.
> Select: cr38e_purchaserequestapprovalid, cr38e_approvalname, cr38e_approver, cr38e_level, cr38e_approvalstatus, cr38e_status, cr38e_approvaldate, cr38e_purchaserequest.
> Return { approvals, pending, completed, loading, error, refetch }."

### 4.6 — useProjects
> "Follow commands/build-hook.md — build useProjects.
> Fetches cr38e_project records.
> Select: cr38e_projectid, cr38e_projectname, cr38e_description, cr38e_projectscope, cr38e_projecttype, cr38e_phase.
> NEVER select virtual fields (cr38e_phasename, cr38e_projecttypename).
> Accept searchText?: string (filter by cr38e_projectname contains searchText).
> Return { projects, loading, error }.
>
> Helper: export a function getProjectTypeLabel(value: number): string that maps:
> 357090000=Internal, 357090001=External, 357090002=Capital, 357090003=Operational.
> Export a function getPhaseLabel(value: number): string that maps:
> 357090000=Planning, 357090001=Design, 357090002=Development, 357090003=Testing, 357090004=Deployment, 357090005=Closed."

### 4.7 — useCatalogItems
> "Follow commands/build-hook.md — build useCatalogItems.
> Fetches cr38e_masterorderingcatalog records.
> Select: cr38e_masterorderingcatalogid, cr38e_catalognumber, cr38e_description, cr38e_partnumber, cr38e_category, cr38e_vendorname, cr38e_vendorlink, cr38e_imageurl, cr38e_keywords, cr38e_department, cr38e_um.
> NEVER select virtual fields (cr38e_departmentname, cr38e_umname).
> NOTE: The UOM field on this table is cr38e_um, NOT cr38e_uom.
> NOTE: cr38e_category is a plain text field — filter with contains, not eq.
> NOTE: cr38e_department uses different values than cr38e_purchaserequest:
>   357090000=IT, 357090001=Finance, 357090002=Operations, 357090003=HR, 357090004=Engineering, 357090005=Marketing
> Accept searchText?: string, categoryFilter?: string, departmentFilter?: number.
> Return { items, loading, error, refetch }."

---

## PHASE 5 — Feature Cards (Layer 3)

Build these after their hooks exist.

### 5.1 — RequestListItem
> "Follow commands/build-component.md — build src/components/requests/RequestListItem.tsx
> Props: id, porNumber, urgencyLevel (number), description, dueDate, requestorName, totalAmount, onClick.
> Show: POR number, urgency Badge (map integer to variant), description, due date, requestor, amount right-aligned, arrow right.
> Import Badge from ui/Badge. Use the urgencylevel integer constants from CLAUDE.md."

### 5.2 — ApprovalListItem
> "Follow commands/build-component.md — build src/components/approvals/ApprovalListItem.tsx
> Props: id, level, approver, porNumber (from related request), description, totalAmount, approvalStatus (number), onClick.
> Show: Avatar with level number, POR number, approver role text, description, amount right, status Badge, arrow right.
> Import Avatar and Badge from ui/."

### 5.3 — CatalogRow
> "Follow commands/build-component.md — build src/components/catalog/CatalogRow.tsx
> Props: item (Cr38e_masterorderingcatalogModel), selected: boolean, onSelect: (id: string, checked: boolean) => void.
>
> Show these columns (match the Catalog screenshot):
> - Checkbox (import from ui/Checkbox)
> - Image: show cr38e_imageurl in a 40px thumbnail; if null show a grey placeholder box
> - Catalog # : cr38e_catalognumber
> - Description: cr38e_description (truncate at 40 chars)
> - Part #: cr38e_partnumber
> - Category: cr38e_category shown as a Badge (variant='default', any text)
> - Department: cr38e_department (integer) — map using: 357090000=IT, 357090001=Finance, 357090002=Operations, 357090003=HR, 357090004=Engineering, 357090005=Marketing — show as Badge
> - Vendor: cr38e_vendorname with a small external-link icon that opens cr38e_vendorlink in new tab (if link exists)
> - UOM: cr38e_um (integer) — map using: 357090000=Each, 357090001=Box, 357090002=Case, 357090003=Dozen, 357090004=Pound, 357090005=Kilogram, 357090006=Liter, 357090007=Gallon — show as plain text
>
> NOTE: The UOM field is cr38e_um on this table. Do NOT use cr38e_uom."

### 5.4 — CatalogTable
> "Follow commands/build-component.md — build src/components/catalog/CatalogTable.tsx
> Props: items, selectedIds, onSelectionChange.
> Show: column headers with select-all Checkbox, list of CatalogRow components. Handle empty state with EmptyState."

### 5.5 — ProjectCard
> "Follow commands/build-component.md — build src/components/projects/ProjectCard.tsx
> Props: id: string, name: string, projectType: number, description: string, phase: number, onClick: (id: string) => void.
>
> Show (match the Projects screenshot):
> - Small grid/project icon (top left of card)
> - Project name (bold)
> - Project type label (small grey text below name) — map cr38e_projecttype integer:
>   357090000=Internal, 357090001=External, 357090002=Capital, 357090003=Operational
> - Description text (grey, 2-line clamp)
> - Phase Badge — map cr38e_phase integer to Badge variant:
>   357090000=Planning → variant='default'
>   357090001=Design → variant='info'
>   357090002=Development → variant='pending'
>   357090003=Testing → variant='warning'
>   357090004=Deployment → variant='approved'
>   357090005=Closed → variant='draft'
>   Show the label text (e.g. 'Testing', 'Closed')
> - Arrow icon (right side)
>
> Card style: white background, border 1px #e5e7eb, border-radius 12px, padding 20px, hover adds box-shadow. Display in a 2-column grid on the Projects page."

### 5.6 — PendingApprovalsSection
> "Follow commands/build-component.md — build src/components/dashboard/PendingApprovalsSection.tsx
> Props: approvals (ApprovalListItem data array), onSelect.
> Show: section title 'Pending Approvals' with warning icon and count badge. List of ApprovalListItem below. Loading and empty states."

### 5.7 — RecentRequestsSection
> "Follow commands/build-component.md — build src/components/dashboard/RecentRequestsSection.tsx
> Props: requests (RequestListItem data array), onViewAll, onSelect.
> Show: section title 'Recent Requests' with arrow icon, 'View All →' link top right. List of RequestListItem. Loading and empty states."

---

## PHASE 6 — Page Shells (Layer 4)

Build these last. Each page is thin — just layout + hook wiring.

### 6.1 — DashboardPage
> "Follow commands/build-component.md — build src/pages/DashboardPage.tsx
> Props: onNavigate(page: string, id?: string).
> Use useDashboardStats hook for stat cards.
> Use usePurchaseRequests for recent requests (top 5, sorted by submitteddate desc).
> Use useMyApprovals for pending approvals (status=pending).
> Compose: PageHeader + 5 StatCard row + PendingApprovalsSection + RecentRequestsSection side by side.
> Match the dashboard screenshot layout."

### 6.2 — RequestsPage
> "Follow commands/build-component.md — build src/pages/RequestsPage.tsx
> Props: onSelect(id), onNew.
> Use usePurchaseRequests hook with filter/sort state.
> Compose: PageHeader (title 'Purchase Requests', New Request button) + FilterBar (SearchBar + FilterSelect for status) + SortButtons row + RequestListItem list + EmptyState."

### 6.3 — ApprovalsPage
> "Follow commands/build-component.md — build src/pages/ApprovalsPage.tsx
> Props: onSelect(id), onBulkApprove.
> Use useMyApprovals hook.
> Compose: PageHeader + 3 StatCards (pending, approved, rejected) + FilterSelect for level + Tabs (Pending / Completed) + ApprovalListItem list."

### 6.4 — CatalogPage
> "Follow commands/build-component.md — build src/pages/CatalogPage.tsx
> Props: onAddItem, onImportCSV.
> Use useCatalogItems hook with searchText, categoryFilter, departmentFilter state.
>
> Compose: PageHeader (title 'Master Ordering Catalog', Import CSV button + Add Item primary button)
> + FilterBar containing:
>   - SearchBar (searches description, part number, vendor, keywords)
>   - FilterSelect for category (free-text categories from data — 'All Categories' default)
>   - FilterSelect for department with options: All Departments, IT (357090000), Finance (357090001), Operations (357090002), HR (357090003), Engineering (357090004), Marketing (357090005)
>   - ViewToggle (grid / list)
> + CatalogTable (list view) or catalog grid cards (grid view)
>
> NOTE: cr38e_category is plain text — populate the category FilterSelect options from the distinct values in items."

### 6.5 — ProjectsPage
> "Follow commands/build-component.md — build src/pages/ProjectsPage.tsx
> Props: onSelect(id).
> Use useProjects hook.
> Compose: PageHeader + FilterBar (SearchBar only) + ProjectCard grid (2 columns)."

---

## PHASE 7 — Wire App.tsx

> "Read CLAUDE.md and memory-bank.md. Then update App.tsx to wire all pages together.
> Use local state: activePage: 'dashboard' | 'requests' | 'catalog' | 'approvals' | 'projects', default 'dashboard'.
> Also: selectedRequestId: string | null.
> Render TopNav with all 5 nav items, pass activeKey and onNavigate.
> Render the correct Page component based on activePage.
> Pass navigation handlers so pages can navigate to each other.
> Add version number display top-right (v1.0.0, small grey text).
> Run npm run build and fix all errors."

---

## After Each Phase — Deploy Checkpoint

After Phase 2 (atoms + blocks done, no data yet):
> "Follow commands/deploy.md — deploy v1.1.0"

After Phase 6 + 7 (first full working app):
> "Follow commands/deploy.md — deploy v1.2.0"
