# Setup Tests (run once before writing test files)

Read CLAUDE.md and memory-bank.md first.

This is a ONE-TIME setup. Check if already done:
- If `vitest.config.ts` exists → already set up, skip this file
- If `src/components/ui/Button/button.test.tsx` exists → already set up, skip this file

---

## Step 1: Install Test Dependencies

Ask the user:
> "Test setup requires installing vitest, @testing-library/react, and jsdom. OK to proceed?"

After confirmation:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

---

## Step 2: Create Vitest Config

Create `vitest.config.ts` in the project root:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

---

## Step 3: Create Test Setup File

Create `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

---

## Step 4: Add Test Script to package.json

Open `package.json` and add to the `scripts` section:

```json
"test": "vitest",
"test:run": "vitest run"
```

---

## Step 5: Create the Reference Test (Button)

Create `src/components/ui/Button/button.test.tsx` as the reference all other tests follow:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const handler = vi.fn();
    render(<Button disabled onClick={handler}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders sm size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders lg size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

---

## Step 6: Run Tests to Confirm Setup Works

```bash
npm run test:run
```

All Button tests should pass. If any fail, fix the Button component or test setup before continuing.

---

## Step 7: Update memory-bank.md

Mark test setup as complete. Record:
- Vitest installed
- Reference test: src/components/ui/Button/button.test.tsx
- Run tests with: `npm run test:run`
