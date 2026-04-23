# Build Component

Read CLAUDE.md and memory-bank.md first.

The user will describe ONE component to build.

## Steps

1. Review existing structure:
   - List files in src/components/ and src/hooks/
   - Understand what already exists before building

2. Read relevant services (use Grep, not Read — generated files are large):
   ```
   Grep for method names like "getAll", "create", "update", "delete" in src/generated/services/
   ```

3. Build the component at `src/components/[ComponentName].tsx`:
   - TypeScript strict mode — no implicit any
   - Props interface defined and exported
   - Handle loading state (show spinner or "Loading...")
   - Handle error state (show error message)
   - Use dark theme: background #1e1e1e, text white, accent #0078d4
   - Use generated services ONLY — never fetch/axios

4. Wire to data:
   - Import from generated services in src/generated/services/
   - Or use a hook from src/hooks/ if one already exists for this data

5. Build and fix:
   ```
   npm run build
   ```
   - Fix TS6133 (unused imports) automatically
   - Fix other TypeScript errors
   - Do NOT finish until build passes

6. Update memory-bank.md with the component added.

## Rules
- Build ONE component only — do not add unrequested features
- Do NOT deploy
- Do NOT edit src/generated/ files
- Remove all unused imports before building
- Every component must handle loading and error states
