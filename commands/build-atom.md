# Build UI Atom

**Usage:** `"Follow commands/build-atom.md — [ComponentName] | [one line summary]"`
**Example:** `"Follow commands/build-atom.md — Badge | Coloured pill label for status and urgency"`

---

## Step 0: Parse Arguments

Parse `$ARGUMENTS` (everything after the `—` in the user's prompt):
- Split on `|`
- `[name]` = first part, trimmed, converted to PascalCase
- `[summary]` = second part, trimmed (describes what the component does)

If no `|` separator is found, ask the user:
> "Please provide a component name and summary separated by `|`. For example: `Badge | Coloured pill label for status`"

---

## Step 1: Prerequisites Check

Before writing any code, verify both of these exist:
- `src/styles/theme.ts` — if missing, stop and say: "Run commands/setup-preview.md first"
- `src/preview/ComponentPreview.tsx` — if missing, stop and say: "Run commands/setup-preview.md first"

Check if `src/components/ui/[name].tsx` already exists. If it does, ask the user:
> "[name].tsx already exists. Do you want to (a) replace it or (b) update it?"

---

## Step 2: Review Context

- List files in `src/components/ui/` to understand what atoms already exist
- Read `src/styles/theme.ts` to know the exact colour values and tokens available
- Read `src/preview/ComponentPreview.tsx` to understand the current preview structure

Do NOT read generated files in `src/generated/`. Atoms have no data dependency.

---

## Step 3: Build the Component

Create `src/components/ui/[name].tsx`.

### Required props for ALL atoms:
```typescript
variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';  // default: 'primary'
size?: 'sm' | 'md' | 'lg';        // default: 'md'
disabled?: boolean;                // default: false
className?: string;                // passthrough for layout overrides
```

### Additional props:
Add props that make sense for [name] based on [summary]. Examples:
- A label/text component → `children: React.ReactNode` or `label: string`
- A clickable component → `onClick?: () => void`
- An input-style component → `value`, `onChange`
- An icon component → `icon?: React.ReactNode`

Always export the props interface:
```typescript
export interface [name]Props { ... }
```

### Colours:
Import ONLY from `src/styles/theme.ts`. Never hardcode hex values.
```typescript
import { colors, sizes, radius } from '../../styles/theme';
```

Map variants to theme tokens:
```typescript
const variantStyles = {
  primary:   { background: colors.primary.bg,   color: colors.primary.text },
  secondary: { background: colors.secondary.bg, color: colors.secondary.text, border: `1px solid ${colors.border}` },
  success:   { background: colors.success.bg,   color: colors.success.text },
  danger:    { background: colors.danger.bg,    color: colors.danger.text },
  warning:   { background: colors.warning.bg,   color: colors.warning.text },
};
```

### Disabled state:
When `disabled={true}`:
- Reduce opacity to 0.5
- Set `cursor: 'not-allowed'`
- Prevent onClick from firing
- Add `aria-disabled="true"`

### Size:
Apply from `sizes[size]` — fontSize, padding, height from theme.

### TypeScript rules:
- No implicit `any`
- Export the props interface
- No unused imports (causes TS6133 build failure)
- Use `React.CSSProperties` for inline style objects

---

## Step 4: Build and Fix

```bash
npm run build
```

Fix all TypeScript errors before continuing. Common fixes:
- TS6133: remove unused import
- TS2322: fix type mismatch
- TS7006: add explicit type annotation

Do NOT continue to Step 5 if the build fails.

---

## Step 5: Write the Test File

Check if tests are set up: does `vitest.config.ts` exist?

**If yes** — create `src/components/ui/[name]/[name].test.tsx`:

Use `src/components/ui/Button/button.test.tsx` as the reference pattern.

Tests to cover for EVERY atom:
```typescript
describe('[name]', () => {
  // 1. Renders without crashing
  it('renders with default props', () => { ... });

  // 2. Each variant renders
  it.each(['primary','secondary','success','danger','warning'])(
    'renders %s variant', (variant) => { ... }
  );

  // 3. Each size renders
  it.each(['sm','md','lg'])('renders %s size', (size) => { ... });

  // 4. Disabled state
  it('applies disabled styles when disabled', () => { ... });
  it('does not fire onClick when disabled', async () => { ... }); // if clickable

  // 5. Component-specific behaviour
  // Add tests relevant to [summary] — e.g. if it's a toggle, test it toggles
});
```

Run the tests:
```bash
npm run test:run
```

Iterate until all tests pass. Fix the component if needed, not just the tests.

**If no** (vitest.config.ts missing) — skip the test file and add a note:
> "Tests skipped — run commands/setup-tests.md first to enable testing."

---

## Step 6: Add to Preview Page

Open `src/preview/ComponentPreview.tsx`.

Add an import for [name] at the top:
```typescript
import { [name] } from '../components/ui/[name]';
```

Add a preview section to the `sections` array showing ALL variants and sizes:

```tsx
{
  title: '[name]',
  element: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Variants */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af',
          textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>
          Variants
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <[name] variant="primary"   [relevantProp]="Primary"   />
          <[name] variant="secondary" [relevantProp]="Secondary" />
          <[name] variant="success"   [relevantProp]="Success"   />
          <[name] variant="danger"    [relevantProp]="Danger"    />
          <[name] variant="warning"   [relevantProp]="Warning"   />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af',
          textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>
          Sizes
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <[name] size="sm" [relevantProp]="Small"  />
          <[name] size="md" [relevantProp]="Medium" />
          <[name] size="lg" [relevantProp]="Large"  />
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af',
          textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>
          Disabled
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <[name] disabled [relevantProp]="Disabled" />
          <[name] disabled variant="success" [relevantProp]="Disabled Success" />
        </div>
      </div>

    </div>
  )
}
```

Replace `[relevantProp]` with the actual prop name for this component (e.g. `label` for Badge, `children` for Button).

Run `npm run build` — must pass.

---

## Step 7: Update memory-bank.md

Add to the Components Built table:
```
| src/components/ui/[name].tsx | Layer 1 — Atom | All screens | ✓ Build passes |
```

If tests were written, note: `Tests: src/components/ui/[name]/[name].test.tsx — all passing`

---

## Step 8: Tell the User

Report:
1. File created: `src/components/ui/[name].tsx`
2. Props: list the interface
3. Test result: X tests passing (or "tests skipped — run setup-tests.md first")
4. Preview: "Run `npm run dev` and open `http://localhost:5173/?preview` → select [name] in the sidebar"
5. Next: suggest the next atom from `commands/component-sequence.md`

---

## Rules
- NEVER import from `src/generated/` — atoms have no data dependency
- NEVER add the component to any page other than `src/preview/ComponentPreview.tsx`
- NEVER hardcode hex values — import from `src/styles/theme.ts`
- Build must pass before adding to preview
- Tests must all pass (if test setup exists) before marking done
- ONE component per run — do not build extras
