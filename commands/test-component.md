# Test Component

The user will name a component (or hook) to test.

## Checklist

Read the file first, then verify each item:

### TypeScript Quality
- [ ] No `any` types used (strict mode)
- [ ] All props have typed interfaces
- [ ] No unused imports (causes TS6133 build failure)
- [ ] Return types defined on functions where needed

### Data Access
- [ ] Uses generated services from src/generated/services/ ONLY
- [ ] No fetch(), axios(), or direct API calls
- [ ] Correct service method used (getAll vs get vs create vs update vs delete)
- [ ] result.data checked before use (not result directly)

### State Handling
- [ ] Loading state handled (spinner or message shown)
- [ ] Error state handled (error message shown to user)
- [ ] Empty state handled (what shows when there's no data?)

### Dataverse Gotchas
- [ ] Choice fields treated as numbers, not strings
- [ ] Lookup reads use _fieldname_value (GUID), writes use @odata.bind
- [ ] No virtual fields (fields ending in "name") in OData selects

### Build Test
Run:
```
npm run build
```
- If it passes: report "Build passed ✓"
- If it fails: fix the errors and rebuild

## After Testing
Report:
- What works correctly
- Any issues found and fixed
- Any edge cases the user should be aware of
- Suggested improvements (optional, clearly marked as optional)

Update memory-bank.md if fixes were made.
