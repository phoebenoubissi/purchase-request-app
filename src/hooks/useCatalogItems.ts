import { useState, useEffect, useCallback } from 'react';
import { Cr38e_masterorderingcatalogsService } from '../generated/services/Cr38e_masterorderingcatalogsService';
import type { Cr38e_masterorderingcatalogs } from '../generated/models/Cr38e_masterorderingcatalogsModel';

export interface CatalogFilters {
  searchText?: string;
  categoryFilter?: string;
  departmentFilter?: number;
}

export interface UseCatalogItemsReturn {
  items: Cr38e_masterorderingcatalogs[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// NOTE: UOM field on this table is cr38e_um — NOT cr38e_uom
const SELECT_FIELDS = [
  'cr38e_masterorderingcatalogid',
  'cr38e_catalognumber',
  'cr38e_description',
  'cr38e_partnumber',
  'cr38e_category',
  'cr38e_vendorname',
  'cr38e_vendorlink',
  'cr38e_imageurl',
  'cr38e_keywords',
  'cr38e_department',
  'cr38e_um',
];

export function useCatalogItems(filters: CatalogFilters = {}): UseCatalogItemsReturn {
  const { searchText, categoryFilter, departmentFilter } = filters;

  const [items, setItems]     = useState<Cr38e_masterorderingcatalogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filterParts: string[] = [];

      if (searchText && searchText.trim()) {
        const q = searchText.trim().replace(/'/g, "''");
        filterParts.push(
          `(contains(cr38e_description,'${q}') or contains(cr38e_partnumber,'${q}') or contains(cr38e_vendorname,'${q}') or contains(cr38e_keywords,'${q}'))`
        );
      }

      // cr38e_category is plain text — use contains, not eq
      if (categoryFilter && categoryFilter.trim()) {
        const c = categoryFilter.trim().replace(/'/g, "''");
        filterParts.push(`contains(cr38e_category,'${c}')`);
      }

      if (departmentFilter !== undefined) {
        filterParts.push(`cr38e_department eq ${departmentFilter}`);
      }

      const result = await Cr38e_masterorderingcatalogsService.getAll({
        select: SELECT_FIELDS,
        filter: filterParts.length ? filterParts.join(' and ') : undefined,
        orderBy: ['cr38e_catalognumber asc'],
      });

      setItems(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load catalog items');
    } finally {
      setLoading(false);
    }
  }, [searchText, categoryFilter, departmentFilter]);

  useEffect(() => { fetch(); }, [fetch]);

  return { items, loading, error, refetch: fetch };
}
