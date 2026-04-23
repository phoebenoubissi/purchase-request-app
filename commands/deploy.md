# Deploy App

Read CLAUDE.md and memory-bank.md first.

## Steps

1. Build the app:
   ```
   npm run build
   ```
   - If build fails: fix all errors BEFORE proceeding
   - Do NOT deploy with a broken build — ever
   - Verify dist/ folder exists with index.html and assets/

2. Ask the user explicitly:
   > "Build passed ✓. Ready to deploy to [ENVIRONMENT NAME from CLAUDE.md]? This will update the live app."
   
   Wait for the user to say yes/confirm. Do not proceed without it.

3. Deploy:
   ```
   pwsh -NoProfile -Command "pac code push"
   ```

4. Capture the App URL from the output.

5. Increment the version:
   - Find the current version in the app (e.g., displayed in App.tsx or a version constant)
   - Increment patch version: v1.0.0 → v1.0.1, or minor: v1.0.x → v1.1.0
   - Update the version display in the app
   - Rebuild after version update:
     ```
     npm run build
     pwsh -NoProfile -Command "pac code push"
     ```

6. Update memory-bank.md:
   - New version number
   - Deploy timestamp
   - App URL (if changed)
   - What was deployed in this version

7. Report to user:
   - App URL
   - Version deployed
   - What's live

## Rules
- NEVER deploy without the user's explicit confirmation
- NEVER deploy if npm run build has not succeeded in this session
- If pac code push fails, report the exact error — do NOT retry blindly
