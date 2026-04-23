# Purchase Request Manager — Memory Bank

> Last Updated: 2026-04-23
> Status: Scaffolded — baseline deployed

---

## Project Overview

| Property | Value |
|---|---|
| App Name | Purchase Request Manager |
| Project Path | C:\Users\nphoe\Documents\projects\codeapps\purchase-request-app |
| Environment | Dev |
| Environment ID | 23f5db6b-4d5d-ed3a-b474-2f9e34ecd103 |
| App URL | https://apps.powerapps.com/play/e/23f5db6b-4d5d-ed3a-b474-2f9e34ecd103/app/35ddfd51-e36d-46f2-ba45-e4b98607fde9?tenantId=2630543e-a649-4c2e-a84d-e30f2c97a9dd&hint=9c094a5f-84a8-4f2c-937f-ca59a00baed7&sourcetime=1776911098229 |
| Version | v1.0.0 |
| Status | Scaffolded |

---

## Dataverse Tables (confirmed from purchaseRequestTables.xlsx)

| Table Logical Name | Display Name | Status |
|---|---|---|
| cr38e_purchaserequest | Purchase Request | Not connected |
| cr38e_purchaserequestapproval | Purchase Request Approval | Not connected |
| cr38e_purchaserequestdetail | Purchase Request Detail (line items) | Not connected |
| cr38e_richtextfile | Rich Text File (attachments) | Not connected |
| cr38e_project | Projects | Not connected |
| cr38e_masterorderingcatalog | Master Ordering Catalog | Not connected |

---

## Completed Steps

### Phase 0 — Scaffold
- [x] Node v22+ confirmed (v24.14.1)
- [x] pac CLI confirmed (v2.6.4 after update)
- [x] Template scaffolded (`npx degit`)
- [x] `pac code init` run
- [x] Baseline `npm run build` passed
- [x] Baseline `pac code push` done
- [x] App URL captured

### Phase 1 — Atoms (Layer 1 — no data, pure UI)
- [x] Badge.tsx
- [x] Button.tsx
- [x] SearchBar.tsx
- [x] FilterSelect.tsx
- [x] setup-preview.md (theme.ts + ComponentPreview.tsx + main.tsx wiring)
- [x] SortButton.tsx
- [x] Avatar.tsx
- [x] ViewToggle.tsx
- [x] Checkbox.tsx
- [x] Spinner.tsx
- [x] EmptyState.tsx

### Phase 2 — Shared Blocks (Layer 2 — layout, no data)
- [x] TopNav.tsx
- [x] PageHeader.tsx
- [x] StatCard.tsx
- [x] FilterBar.tsx
- [x] Tabs.tsx

### Phase 3 — Connect Dataverse Tables
- [x] cr38e_purchaserequest added
- [x] cr38e_purchaserequestapproval added
- [x] cr38e_purchaserequestdetail added
- [x] cr38e_richtextfile added
- [x] cr38e_project added
- [x] cr38e_masterorderingcatalog added

### Phase 4 — Hooks (data access layer)
- [x] usePurchaseRequests — list with filters
- [x] usePurchaseRequest — single record + line items + approvals
- [x] useSavePurchaseRequest — create/update
- [x] useMyApprovals — approvals for current user
- [x] useDashboardStats — counts + totals for stat cards
- [x] useProjects — project list
- [x] useCatalogItems — catalog with filters

### Phase 5 — Feature Cards (Layer 3)
- [x] RequestListItem.tsx
- [x] ApprovalListItem.tsx
- [x] CatalogRow.tsx
- [x] CatalogTable.tsx
- [x] ProjectCard.tsx
- [x] PendingApprovalsSection.tsx
- [x] RecentRequestsSection.tsx

### Phase 6 — Page Shells (Layer 4)
- [x] DashboardPage.tsx
- [x] RequestsPage.tsx
- [x] CatalogPage.tsx
- [x] ApprovalsPage.tsx
- [x] ProjectsPage.tsx

### Phase 7 — App Wiring
- [x] App.tsx updated — navigation + page routing
- [x] TopNav wired to page state
- [x] All pages wired to hooks

### Phase 8 — Detail & Form Views
- [x] NewRequestPage.tsx — full new purchase request form

### Phase 9 — Bulk Actions
- [ ] BulkApprovalsPage.tsx — bulk approve/reject multiple requests at once

### Deploys
- [x] v1.0.0 — baseline scaffold
- [ ] v1.1.0 — atoms + shared blocks
- [x] v1.2.0 — full app wired (all 5 pages + navigation) — deployed 2026-04-23
- [x] v1.3.0 — new request form (Phase 8)
- [ ] v1.4.0 — bulk approvals (Phase 9)
- [ ] v1.5.0 — requests list working
- [ ] v1.6.0 — approvals working
- [ ] v1.7.0 — catalog working
- [ ] v1.8.0 — projects working

---

## Generated Files (filled as tables are connected)

| File | Table | Status |
|---|---|---|
| src/generated/models/Cr38e_purchaserequestsModel.ts | cr38e_purchaserequest | ✅ Generated |
| src/generated/services/Cr38e_purchaserequestsService.ts | cr38e_purchaserequest | ✅ Generated |
| src/generated/models/Cr38e_purchaserequestapprovalsModel.ts | cr38e_purchaserequestapproval | ✅ Generated |
| src/generated/services/Cr38e_purchaserequestapprovalsService.ts | cr38e_purchaserequestapproval | ✅ Generated |
| src/generated/models/Cr38e_purchaserequestdetailsModel.ts | cr38e_purchaserequestdetail | ✅ Generated |
| src/generated/services/Cr38e_purchaserequestdetailsService.ts | cr38e_purchaserequestdetail | ✅ Generated |
| src/generated/models/Cr38e_richtextfilesModel.ts | cr38e_richtextfile | ✅ Generated |
| src/generated/services/Cr38e_richtextfilesService.ts | cr38e_richtextfile | ✅ Generated |
| src/generated/models/Cr38e_projectsModel.ts | cr38e_project | ✅ Generated |
| src/generated/services/Cr38e_projectsService.ts | cr38e_project | ✅ Generated |
| src/generated/models/Cr38e_masterorderingcatalogsModel.ts | cr38e_masterorderingcatalog | ✅ Generated |
| src/generated/services/Cr38e_masterorderingcatalogsService.ts | cr38e_masterorderingcatalog | ✅ Generated |

---

## Components Built (filled as components are completed)

| File | Layer | Screen(s) | Build Status |
|---|---|---|---|
| src/components/ui/Badge.tsx | 1 — Atom | All screens (status + urgency pills) | ✅ Passing |
| src/components/ui/Button.tsx | 1 — Atom | All screens (actions) | ✅ Passing |
| src/components/ui/SearchBar.tsx | 1 — Atom | Requests, Catalog, Projects | ✅ Passing |
| src/components/ui/FilterSelect.tsx | 1 — Atom | Requests, Catalog, Approvals | ✅ Passing |
| src/components/ui/SortButton.tsx | 1 — Atom | Requests | ✅ Passing |
| src/components/ui/Avatar.tsx | 1 — Atom | My Approvals | ✅ Passing |
| src/components/ui/ViewToggle.tsx | 1 — Atom | Catalog | ✅ Passing |
| src/components/ui/Checkbox.tsx | 1 — Atom | Catalog (rows + select-all) | ✅ Passing |
| src/components/ui/Spinner.tsx | 1 — Atom | All screens (loading states) | ✅ Passing |
| src/components/ui/EmptyState.tsx | 1 — Atom | All list screens (zero results) | ✅ Passing |
| src/components/shared/TopNav.tsx | 2 — Shared Block | All screens (rendered once in App) | ✅ Passing |
| src/components/shared/PageHeader.tsx | 2 — Shared Block | All screens (page titles + actions) | ✅ Passing |
| src/components/shared/StatCard.tsx | 2 — Shared Block | Dashboard (5 cards), Approvals (3 cards) | ✅ Passing |
| src/components/shared/FilterBar.tsx | 2 — Shared Block | Requests, Catalog, Approvals, Projects | ✅ Passing |
| src/components/shared/Tabs.tsx | 2 — Shared Block | Approvals (Pending / Completed) | ✅ Passing |
| src/components/requests/RequestListItem.tsx | 3 — Feature Card | Requests, Dashboard | ✅ Passing |
| src/components/approvals/ApprovalListItem.tsx | 3 — Feature Card | Approvals, Dashboard | ✅ Passing |
| src/components/catalog/CatalogRow.tsx | 3 — Feature Card | Catalog | ✅ Passing |
| src/components/catalog/CatalogTable.tsx | 3 — Feature Card | Catalog | ✅ Passing |
| src/components/projects/ProjectCard.tsx | 3 — Feature Card | Projects | ✅ Passing |
| src/components/dashboard/PendingApprovalsSection.tsx | 3 — Feature Card | Dashboard | ✅ Passing |
| src/components/dashboard/RecentRequestsSection.tsx | 3 — Feature Card | Dashboard | ✅ Passing |
| src/pages/DashboardPage.tsx | 4 — Page Shell | Dashboard | ✅ Passing |
| src/pages/RequestsPage.tsx | 4 — Page Shell | Requests | ✅ Passing |
| src/pages/ApprovalsPage.tsx | 4 — Page Shell | My Approvals | ✅ Passing |
| src/pages/CatalogPage.tsx | 4 — Page Shell | Catalog | ✅ Passing |
| src/pages/ProjectsPage.tsx | 4 — Page Shell | Projects | ✅ Passing |

---

## Hooks Built (filled as hooks are completed)

| File | Returns | Build Status |
|---|---|---|
| src/hooks/useDashboardStats.ts | { stats, loading, error, refetch } | ✅ Passing |
| src/hooks/usePurchaseRequests.ts | { requests, loading, error, refetch } | ✅ Passing |
| src/hooks/usePurchaseRequest.ts | { request, lineItems, approvals, loading, error, refetch } | ✅ Passing |
| src/hooks/useSavePurchaseRequest.ts | { save, saving, error } | ✅ Passing |
| src/hooks/useMyApprovals.ts | { approvals, pending, completed, loading, error, refetch } | ✅ Passing |
| src/hooks/useProjects.ts | { projects, loading, error } | ✅ Passing |
| src/hooks/useCatalogItems.ts | { items, loading, error, refetch } | ✅ Passing |

---

## Current Status

**Last Action:** Deployed v1.3.0. Phase 8 complete — NewRequestPage.tsx built and live.

**Next Step:** Phase 9 — Build BulkApprovalsPage.tsx (bulk approve/reject from My Approvals).

---

## Notes & Decisions

- 2026-04-22: Tables confirmed from purchaseRequestTables.xlsx. Publisher prefix is cr38e_.
- 2026-04-22: "Critical" badge in screenshots comes from cr38e_urgencylevel (357090003), not cr38e_priority.
- 2026-04-22: Two status fields exist — cr38e_status (100000000–100000005) and cr38e_purchasestatus (0–5). Use cr38e_status for workflow state shown in UI.
- 2026-04-22: cr38e_project and cr38e_masterorderingcatalog confirmed from master.xlsx. All 6 tables now fully documented in CLAUDE.md.
- 2026-04-22: Catalog UOM field is cr38e_um (not cr38e_uom). Catalog department options differ from request department. Catalog images come from cr38e_imageurl (plain URL), not RichTextFile.
- 2026-04-22: Project phase options: Planning, Design, Development, Testing, Deployment, Closed. Project type: Internal, External, Capital, Operational.

---

## Quick Resume Commands

```
Scaffold:          "Follow commands/create-app.md"
Add table:         "Follow commands/add-dataverse.md — add [TABLE_NAME]"
Build component:   "Follow commands/build-component.md — [description]"
Build hook:        "Follow commands/build-hook.md — [description]"
Test:              "Follow commands/test-component.md — test [Name]"
Deploy:            "Follow commands/deploy.md"
Check sequence:    "Read commands/component-sequence.md and tell me what's next"
```
