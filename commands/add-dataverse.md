# Add Dataverse Table

Read CLAUDE.md and memory-bank.md first.

The user will specify which table to connect.

## Steps

1. Add the data source:
   ```
   pwsh -NoProfile -Command "pac code add-data-source -a dataverse -t [TABLE_LOGICAL_NAME]"
   ```

2. Locate the generated files:
   - `src/generated/models/[Table]Model.ts`
   - `src/generated/services/[Table]Service.ts`

3. Use Grep (not Read) to find available methods in the service file.

4. Show the user a usage example:
   ```typescript
   import { [Table]Service } from "../generated/services/[Table]Service";

   // Get all records
   const result = await [Table]Service.getAll({
     select: ["fieldname1", "fieldname2"],
     filter: "statecode eq 0",
     orderBy: ["createdon desc"],
     top: 50
   });
   const records = result.data || [];

   // Create a record
   await [Table]Service.create({ fieldname: "value" });
   ```

5. Important Dataverse gotchas to mention:
   - Choice/picklist fields store numbers, not strings
   - Lookup fields: read via `_fieldname_value`, write via `fieldname@odata.bind`
   - Virtual fields (ending in `name`) cannot be selected in OData queries

6. Build to verify (do NOT deploy):
   ```
   npm run build
   ```
   Fix any TypeScript errors before finishing.

7. Update memory-bank.md with the table added.

## Rules
- Do NOT deploy after adding a table — build verify only
- Do NOT edit any file in src/generated/
- If the command fails, report the exact error and stop
