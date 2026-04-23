# Create Code App

Read CLAUDE.md and memory-bank.md first. Tell me what you found before proceeding.

## Steps

1. Verify prerequisites:
   - `node --version` must be v22+
   - `pwsh -NoProfile -Command "pac"` must work
   - Stop and report if either fails

2. Scaffold the template:
   ```
   npx degit microsoft/PowerAppsCodeApps/templates/vite . --force
   npm install
   ```

3. Initialize with Power Platform:
   ```
   pwsh -NoProfile -Command "pac code init --displayName '[APP_NAME from CLAUDE.md]' -e [ENV_ID from CLAUDE.md]"
   ```
   Read power.config.json after to confirm environmentId is correct.

4. Baseline build and deploy (pre-approved as part of scaffold):
   ```
   npm run build
   pwsh -NoProfile -Command "pac code push"
   ```
   Capture the App URL from the output.

5. Create/update memory-bank.md with:
   - Project path
   - App name
   - Environment ID
   - App URL
   - Version: v1.0.0
   - Status: Scaffolded

6. Report the App URL to the user.

## Rules
- Do NOT add any features — blank template only
- Do NOT skip the baseline deploy — it proves the pipeline works
- If pac code init fails, report the exact error and stop
