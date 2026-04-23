# Setup Preview & Theme (run once before building atoms)

Read CLAUDE.md and memory-bank.md first.

This is a ONE-TIME setup. Check if it's already done before proceeding:
- If `src/styles/theme.ts` exists → skip Step 1
- If `src/preview/ComponentPreview.tsx` exists → skip Step 2
- If preview wiring exists in `src/main.tsx` or `App.tsx` → skip Step 3

---

## Step 1: Create Theme Constants File

Create `src/styles/theme.ts` with the full design system from CLAUDE.md:

```typescript
// src/styles/theme.ts
// Single source of truth for all colours, sizes, and tokens.
// Import this in every component instead of hardcoding hex values.

export const colors = {
  // Base
  background:   '#ffffff',
  surface:      '#f9fafb',
  border:       '#e5e7eb',
  borderHover:  '#d1d5db',

  // Text
  textPrimary:   '#111827',
  textSecondary: '#6b7280',
  textMuted:     '#9ca3af',
  textInverse:   '#ffffff',

  // Variants — bg + text pairs used for badges, buttons, alerts
  primary:   { bg: '#111827', text: '#ffffff', hover: '#1f2937' },
  secondary: { bg: '#ffffff', text: '#111827', border: '#e5e7eb', hover: '#f9fafb' },
  success:   { bg: '#f0fdf4', text: '#22c55e', solid: '#22c55e' },
  danger:    { bg: '#fef2f2', text: '#ef4444', solid: '#ef4444' },
  warning:   { bg: '#fff7ed', text: '#f97316', solid: '#f97316' },
  info:      { bg: '#eff6ff', text: '#3b82f6', solid: '#3b82f6' },

  // Status badges (urgency level from cr38e_urgencylevel)
  critical:  { bg: '#fef2f2', text: '#ef4444' },
  high:      { bg: '#fff7ed', text: '#f97316' },
  medium:    { bg: '#fefce8', text: '#eab308' },
  low:       { bg: '#f3f4f6', text: '#6b7280' },

  // Workflow status
  pending:   { bg: '#fffbeb', text: '#d97706' },
  approved:  { bg: '#f0fdf4', text: '#22c55e' },
  rejected:  { bg: '#fef2f2', text: '#ef4444' },
  draft:     { bg: '#f3f4f6', text: '#6b7280' },
  completed: { bg: '#eff6ff', text: '#3b82f6' },
  submitted: { bg: '#f5f3ff', text: '#8b5cf6' },
  inReview:  { bg: '#f0f9ff', text: '#0ea5e9' },
  cancelled: { bg: '#f3f4f6', text: '#6b7280' },
};

export const sizes = {
  sm: { fontSize: '11px', padding: '4px 10px',  height: '28px', iconSize: '14px' },
  md: { fontSize: '13px', padding: '8px 16px',  height: '36px', iconSize: '16px' },
  lg: { fontSize: '15px', padding: '10px 20px', height: '44px', iconSize: '18px' },
};

export const radius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  full: '9999px',
};

export const shadow = {
  sm: '0 1px 2px rgba(0,0,0,.05)',
  md: '0 4px 6px rgba(0,0,0,.07)',
  lg: '0 10px 15px rgba(0,0,0,.1)',
};

export type SizeKey    = keyof typeof sizes;
export type ColorKey   = keyof typeof colors;
export type VariantKey = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
```

Run `npm run build` — must pass before continuing.

---

## Step 2: Create the Preview Page

Create `src/preview/ComponentPreview.tsx`:

```tsx
// src/preview/ComponentPreview.tsx
// Dev-only page for viewing UI components in isolation.
// Access at http://localhost:5173/?preview
// NEVER import this in production pages.

import React, { useState } from 'react';

// Components are imported here as they are built.
// Claude adds each new component to the imports and renders section below.

const sections: { title: string; element: React.ReactNode }[] = [
  // Claude appends new sections here as components are built.
  // Example:
  // { title: 'Badge', element: <BadgePreview /> },
];

export function ComponentPreview() {
  const [active, setActive] = useState<string | null>(null);

  if (sections.length === 0) {
    return (
      <div style={{ padding: 40, fontFamily: 'system-ui', color: '#6b7280' }}>
        <h2 style={{ color: '#111827', marginBottom: 8 }}>Component Preview</h2>
        <p>No components yet. Build your first atom and Claude will add it here.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui' }}>
      {/* Sidebar nav */}
      <div style={{
        width: 200, background: '#f9fafb', borderRight: '1px solid #e5e7eb',
        padding: '24px 0', flexShrink: 0,
      }}>
        <div style={{ padding: '0 16px 16px', fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '.8px', color: '#9ca3af' }}>
          Components
        </div>
        {sections.map(s => (
          <button
            key={s.title}
            onClick={() => setActive(s.title)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '8px 16px', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: active === s.title ? 600 : 400,
              background: active === s.title ? '#e5e7eb' : 'transparent',
              color: active === s.title ? '#111827' : '#374151',
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Main area */}
      <div style={{ flex: 1, padding: 40, background: '#ffffff' }}>
        {active === null && (
          <div style={{ color: '#9ca3af', marginTop: 40, textAlign: 'center' }}>
            ← Select a component
          </div>
        )}
        {sections.filter(s => s.title === active).map(s => (
          <div key={s.title}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
              {s.title}
            </h2>
            {s.element}
          </div>
        ))}
      </div>
    </div>
  );
}
```

Run `npm run build` — must pass.

---

## Step 3: Wire Preview into the App Entry Point

Open `src/main.tsx` (or `src/App.tsx` if main.tsx just mounts App).

Add this at the top of the render logic so `?preview` in the URL shows the preview page:

```tsx
import { ComponentPreview } from './preview/ComponentPreview';

// Inside the component or before ReactDOM.createRoot render:
const isPreview = new URLSearchParams(window.location.search).has('preview');

// Wrap the root render:
// if (isPreview) render <ComponentPreview /> else render <App />
```

The exact edit depends on how the template's main.tsx is structured — read it first, then make the minimal change to add the preview branch.

Run `npm run build` — must pass.

---

## Step 4: Verify

Tell the user:
- Run `npm run dev` in the project folder
- Open `http://localhost:5173/?preview`
- They should see the "No components yet" placeholder

Update memory-bank.md:
- [ ] Theme constants created (src/styles/theme.ts)
- [ ] Preview page created (src/preview/ComponentPreview.tsx)
- [ ] Preview wired into entry point
