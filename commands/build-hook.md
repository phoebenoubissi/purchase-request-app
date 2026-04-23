# Build Hook

Read CLAUDE.md and memory-bank.md first.

The user will describe ONE data hook to build.

## Steps

1. Check src/hooks/ for any existing hooks to avoid duplication.

2. Identify which generated service(s) the hook needs.
   Use Grep to find method signatures in src/generated/services/.

3. Create the hook at `src/hooks/use[Name].ts`:

   Standard pattern:
   ```typescript
   import { useState, useEffect, useCallback } from "react";
   import { [Table]Service } from "../generated/services/[Table]Service";
   import type { [Table]Model } from "../generated/models/[Table]Model";

   interface Use[Name]Return {
     data: [Table]Model[];
     loading: boolean;
     error: string | null;
     refetch: () => void;
   }

   export function use[Name](): Use[Name]Return {
     const [data, setData] = useState<[Table]Model[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     const fetch = useCallback(async () => {
       setLoading(true);
       setError(null);
       try {
         const result = await [Table]Service.getAll({ ... });
         setData(result.data || []);
       } catch (err) {
         setError(err instanceof Error ? err.message : "Failed to load data");
       } finally {
         setLoading(false);
       }
     }, []);

     useEffect(() => { fetch(); }, [fetch]);

     return { data, loading, error, refetch: fetch };
   }
   ```

4. For mutation hooks (create/update/delete), use this pattern:
   ```typescript
   interface UseSave[Name]Return {
     save: (data: Partial<[Table]Model>) => Promise<void>;
     saving: boolean;
     error: string | null;
   }
   ```

5. Build and verify:
   ```
   npm run build
   ```
   Fix all errors before finishing.

6. Show the user a usage example of the hook in a component.

7. Update memory-bank.md with the hook added.

## Rules
- Build ONE hook only
- Do NOT add UI or components
- Do NOT use fetch/axios — only generated services
- Always export a typed return interface
- Always handle loading, error, and success states
