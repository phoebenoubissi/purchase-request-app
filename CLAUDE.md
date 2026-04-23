# Purchase Request CodeApp — Project Brain

## What This App Does
A Power Apps Code App for managing purchase requests with multi-level approval workflow.

**Requesters** create and submit purchase requests with line items, track status, and view approval history.
**Approvers** review requests at their level, approve or reject with comments, manage their approvals queue.
**Admins** monitor workflow, view reports, manage catalog and projects.

**Approval thresholds:**
- Level 1 (up to $1,000): Department Staff
- Level 2 ($1,001–$5,000): Department Manager
- Level 3 ($5,001–$25,000): Purchasing Manager
- Level 4 ($25,001–$100,000): Leadership/Directors
- Level 5 ($100,001–$500,000): CEO
- Level 6 (over $500,000): Board Approval

---

## Publisher Prefix
`cr38e_` — prefix for ALL custom table and field names.

---

## My Dataverse Tables

### 1. `cr38e_purchaserequest` — Main Purchase Request
One record per purchase request.

**Key fields:**
| Logical Name | Display Name | Type |
|---|---|---|
| cr38e_purchaserequestid | Purchase Request | Uniqueidentifier (PK) |
| cr38e_pornumber | POR Number | Text — e.g. "POR-2026-004" |
| cr38e_ponumber | PO Number | Text |
| cr38e_itemdescription | Item Description | Text(100) — short title |
| cr38e_description | Description | Multiline Text |
| cr38e_justification | Justification | Multiline Text |
| cr38e_company | Company | Text(100) |
| cr38e_customer | Customer | Text(100) |
| cr38e_suppliers | Suppliers | Text(100) |
| cr38e_requestorname | Requestor Name | Text(200) |
| cr38e_requestoremail | Requestor Email | Email |
| cr38e_requestorid | Requestor ID | Text(100) |
| cr38e_createdby | Created By | Text(100) |
| cr38e_deliverylocation | Delivery Location | Text(100) |
| cr38e_totalamount | Total Amount | Currency (0–1B) |
| cr38e_totalcosts | Total Costs | Currency |
| cr38e_quantityneeded | Quantity Needed | Decimal |
| cr38e_duedate | Due Date | DateTime (DateOnly) |
| cr38e_daterequired | Date Required | DateTime (DateOnly) |
| cr38e_datecompleted | Date Completed | DateTime (DateOnly) |
| cr38e_submitteddate | Submitted Date | DateTime |
| cr38e_requireddate | Required Date | DateTime |
| cr38e_rejectionreason | Rejection Reason | Multiline Text |
| cr38e_purchasingnotes | Purchasing Notes | Multiline Text |
| cr38e_currentlevel | Current Level | Whole number |
| cr38e_currentapprovallevel | Current Approval Level | Whole number |
| cr38e_creatorapprovallevel | Creator Approval Level | Whole number |
| cr38e_requiredapprovallevel | Required Approval Level | Whole number |
| cr38e_project | Project | Lookup → cr38e_project |
| cr38e_projectname | Project Name | Text(850) — read-only |

**Choice fields (ALWAYS use integer values, never strings):**
```
cr38e_status:          100000000=Draft, 100000001=Submitted, 100000002=In Review,
                       100000003=Approved, 100000004=Rejected, 100000005=Cancelled
cr38e_purchasestatus:  0=Draft, 1=Pending Approval, 2=Approved, 3=Rejected, 4=Completed, 5=Cancelled
cr38e_urgencylevel:    357090000=Low, 357090001=Medium, 357090002=High, 357090003=Critical
cr38e_priority:        357090000=Low, 357090001=Medium, 357090002=High
cr38e_portype:         357090000=Standard, 357090001=Urgent, 357090002=Capital, 357090003=Recurring
cr38e_itemtype:        357090000=Equipment, 357090001=Supplies, 357090002=Services,
                       357090003=Software, 357090004=Hardware
cr38e_department:      0=Customer Service, 1=Engineering
cr38e_uom:             357090000=Each, 357090001=Box, 357090002=Case, 357090003=Dozen,
                       357090004=Pound, 357090005=Kilogram, 357090006=Liter, 357090007=Gallon,
                       357090008=Hour, 357090009=Day, 357090010=Month
```

**Virtual fields — NEVER use in OData $select:**
cr38e_departmentname, cr38e_itemtypename, cr38e_portypename, cr38e_priorityname,
cr38e_purchasestatusname, cr38e_statusname, cr38e_urgencylevelname, cr38e_uomname

---

### 2. `cr38e_purchaserequestapproval` — Approval Records
One record per approval level per request.

**Key fields:**
| Logical Name | Display Name | Type |
|---|---|---|
| cr38e_purchaserequestapprovalid | Purchase Request Approval | Uniqueidentifier (PK) |
| cr38e_approvalname | Approval Name | Text(850) |
| cr38e_approver | Approver | Text(100) |
| cr38e_approvedby | Approved By | Text(100) |
| cr38e_approvalcomment | Approval Comment | Multiline Text |
| cr38e_approvaldate | Approval Date | DateTime (DateOnly) |
| cr38e_level | Level | Whole number — 1=Manager, 5=CEO etc. |
| cr38e_purchaserequest | Purchase Request | Lookup → cr38e_purchaserequest |

**Choice fields:**
```
cr38e_approvalstatus:  357090000=Pending Approval, 357090001=Approved, 357090002=Rejected,
                       357090003=Future Pending, 357090004=Skipped
cr38e_status:          0=Rejected, 1=Pending, 2=Future Pending, 3=Skipped, 4=Approved
```

**Virtual fields:** cr38e_approvalstatusname, cr38e_statusname, cr38e_purchaserequestname

---

### 3. `cr38e_purchaserequestdetail` — Line Items
One record per line item on a request.

**Key fields:**
| Logical Name | Display Name | Type |
|---|---|---|
| cr38e_purchaserequestdetailid | Purchase Request Detail | Uniqueidentifier (PK) |
| cr38e_detailname | Detail Name | Text(850) |
| cr38e_description | Description | Multiline Text |
| cr38e_partnumber | Part Number | Text(100) |
| cr38e_vendor | Vendor | Text(100) |
| cr38e_link | Link | Url |
| cr38e_quantity | Quantity | Decimal |
| cr38e_priceeach | Price Each | Currency |
| cr38e_totallinecost | Total Line Cost | Currency |
| cr38e_totalprice | Total Price | Currency |
| cr38e_duedate | Due Date | DateTime (DateOnly) |
| cr38e_linenotes | Line Notes | Multiline Text |
| cr38e_issuedtoworkorder | Issued to Work Order | Boolean |
| cr38e_purchaserequest | Purchase Request | Lookup → cr38e_purchaserequest |

**Choice fields:**
```
cr38e_uom:         357090000=Each, 357090001=Box, 357090002=Case, 357090003=Dozen,
                   357090004=Pound, 357090005=Kilogram, 357090006=Liter, 357090007=Gallon
cr38e_linestatus:  357090000=Pending, 357090001=Ordered, 357090002=Received, 357090003=Cancelled
```

**Virtual fields:** cr38e_linestatusname, cr38e_uomname, cr38e_issuedtoworkordername, cr38e_purchaserequestname

---

### 4. `cr38e_richtextfile` — File Attachments
Files and images attached to requests or catalog items.

**Key fields:**
| Logical Name | Display Name | Type |
|---|---|---|
| cr38e_richtextfileid | Rich Text File | Uniqueidentifier (PK) |
| cr38e_filename | File Name | Text(850) |
| cr38e_filesizebytes | File Size Bytes | Whole number |
| cr38e_mimetype | MIME Type | Text(100) |
| cr38e_uploadedby | Uploaded By | Text(100) |
| cr38e_uploadeddate | Uploaded Date | DateTime (DateOnly) |
| cr38e_fileblob | File Blob | File |
| cr38e_imageblob | Image Blob | Image |
| cr38e_imageblob_url | Image URL | Url (read-only) |
| cr38e_purchaserequest | Purchase Request | Lookup → cr38e_purchaserequest |
| cr38e_masterorderingcatalog | Master Ordering Catalog | Lookup → cr38e_masterorderingcatalog |

**Choice fields:**
```
cr38e_filetype:  357090000=Image, 357090001=Document, 357090002=Spreadsheet,
                 357090003=PDF, 357090004=Other
```

---

### 5. `cr38e_project` — Projects
Referenced by purchase requests via lookup. One record per project.

**Key fields:**
| Logical Name | Display Name | Type |
|---|---|---|
| cr38e_projectid | Project | Uniqueidentifier (PK) |
| cr38e_projectname | Project Name | Text(850) |
| cr38e_description | Description | Multiline Text |
| cr38e_projectscope | Project Scope | Multiline Text |
| cr38e_datacontrol | Data Control | Text(100) |

**Choice fields:**
```
cr38e_projecttype:  357090000=Internal, 357090001=External, 357090002=Capital, 357090003=Operational
cr38e_phase:        357090000=Planning, 357090001=Design, 357090002=Development,
                    357090003=Testing, 357090004=Deployment, 357090005=Closed
```

**Virtual fields — NEVER use in OData $select:**
cr38e_phasename, cr38e_projecttypename

---

### 6. `cr38e_masterorderingcatalog` — Master Ordering Catalog
Powers the Catalog screen. One record per catalog item.

**Key fields:**
| Logical Name | Display Name | Type |
|---|---|---|
| cr38e_masterorderingcatalogid | Master Ordering Catalog | Uniqueidentifier (PK) |
| cr38e_catalognumber | Catalog Number | Text(850) — e.g. "CAT-001" |
| cr38e_description | Description | Multiline Text |
| cr38e_partnumber | Part Number | Text(100) |
| cr38e_category | Category | Text(100) — e.g. "Office Supplies", "Furniture" |
| cr38e_vendorname | Vendor Name | Text(100) |
| cr38e_vendorlink | Vendor Link | Url |
| cr38e_vendoraltlink | Vendor Alt Link | Url |
| cr38e_imageurl | Image URL | Url — thumbnail image for catalog row |
| cr38e_keywords | Keywords | Text(100) |
| cr38e_sortcode | Sort Code | Text(100) |

**Choice fields:**
```
cr38e_department:  357090000=IT, 357090001=Finance, 357090002=Operations,
                   357090003=HR, 357090004=Engineering, 357090005=Marketing
cr38e_um:          357090000=Each, 357090001=Box, 357090002=Case, 357090003=Dozen,
                   357090004=Pound, 357090005=Kilogram, 357090006=Liter, 357090007=Gallon
```

**IMPORTANT — Catalog-specific gotchas:**
- UOM field is `cr38e_um` (NOT cr38e_uom like in other tables)
- Department options are different from cr38e_purchaserequest department (IT, Finance, Operations, HR, Engineering, Marketing)
- Images shown in the Catalog screen come from `cr38e_imageurl` (a plain URL field) — not from the RichTextFile table
- Category is a free-text field (Text), not a choice field — filter by string value

**Virtual fields — NEVER use in OData $select:**
cr38e_departmentname, cr38e_umname

---

## My Power Platform Environment
- Environment name: Dev
- Environment ID: 23f5db6b-4d5d-ed3a-b474-2f9e34ecd103

---

## App Name
Purchase Request CodeApp

---

## Screens (5 total — match the screenshots)
1. **Dashboard** — stats cards (total, pending, approved, rejected, total value), pending approvals panel, recent requests panel
2. **Requests** — searchable/filterable list of all requests with sort controls
3. **Catalog** — master ordering catalog table with image, checkbox, filters
4. **My Approvals** — approval queue with stats, level filter, pending/completed tabs
5. **Projects** — project card grid with search

---

## Design (match screenshots exactly)
- Theme: Light (white background, dark text). User can toggle dark theme.
- Background: #ffffff · Text: #111827 · Card bg: #f9fafb · Border: #e5e7eb
- Accent/buttons: #111827 (near-black filled buttons, white text)
- Nav: white bar, active tab = dark filled pill
- Version number: small grey text, top-right

**Status badge colours:**
| Value | Text Colour | Background |
|---|---|---|
| Critical | #ef4444 (red) | #fef2f2 |
| High | #f97316 (orange) | #fff7ed |
| Medium | #eab308 (yellow) | #fefce8 |
| Low | #6b7280 (grey) | #f3f4f6 |
| Pending Approval | #d97706 (amber) | #fffbeb |
| Approved | #22c55e (green) | #f0fdf4 |
| Rejected | #ef4444 (red) | #fef2f2 |
| Draft | #6b7280 (grey) | #f3f4f6 |
| Completed | #3b82f6 (blue) | #eff6ff |

---

## Component Build Strategy
See `commands/component-sequence.md` for the exact build order.
Build ONE component at a time. Test after each one. Never build ahead.

---

## Key Rules (Claude MUST follow)
- NEVER use fetch() or axios() — use generated services in src/generated/services/ only
- Always run `npm run build` and fix ALL errors before finishing any task
- NEVER edit src/generated/ files
- NEVER select virtual fields (fields ending in name) in OData $select
- Choice fields: always use the integer constants defined above
- Lookup reads: use `_fieldname_value` (GUID). Lookup writes: use `fieldname@odata.bind`
- Always ask before `pac code push` (deploying)
- Use `pwsh -NoProfile -Command "pac ..."` — never bare pac in bash
- Node.js 22+ required
- Build ONE component at a time — never ahead of what is asked
- NEVER add `maxWidth` or `margin: '0 auto'` to page wrapper divs — pages must fill 100% width. Use `padding: '24px'` only

---

## What's Been Built So Far
Phases 1–8 complete. All 5 pages live (Dashboard, Requests, Catalog, My Approvals, Projects).
All hooks connected to Dataverse. NewRequestPage.tsx built (two-column form with line items, approval level calculator, submit/draft). Deployed as v1.3.0.

## Current Status
Phase 9 — Bulk Actions.
Next: Build BulkApprovalsPage.tsx (bulk approve/reject from My Approvals page).
