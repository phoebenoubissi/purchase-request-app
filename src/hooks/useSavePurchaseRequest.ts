import { useState, useCallback } from 'react';
import { Cr38e_purchaserequestsService } from '../generated/services/Cr38e_purchaserequestsService';
import type { Cr38e_purchaserequestsBase } from '../generated/models/Cr38e_purchaserequestsModel';

type SaveData = Partial<Cr38e_purchaserequestsBase>;

export interface UseSavePurchaseRequestReturn {
  save: (data: SaveData) => Promise<void>;
  saving: boolean;
  error: string | null;
}

export function useSavePurchaseRequest(): UseSavePurchaseRequestReturn {
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const save = useCallback(async (data: SaveData) => {
    setSaving(true);
    setError(null);
    try {
      const { cr38e_purchaserequestid, ...fields } = data;
      if (cr38e_purchaserequestid) {
        await Cr38e_purchaserequestsService.update(cr38e_purchaserequestid, fields);
      } else {
        await Cr38e_purchaserequestsService.create(fields as Omit<Cr38e_purchaserequestsBase, 'cr38e_purchaserequestid'>);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save purchase request';
      setError(msg);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return { save, saving, error };
}
