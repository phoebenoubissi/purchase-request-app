import { useState, useEffect, useCallback } from 'react';
import { Cr38e_purchaserequestsService } from '../generated/services/Cr38e_purchaserequestsService';
import type { Cr38e_purchaserequests } from '../generated/models/Cr38e_purchaserequestsModel';

export interface PurchaseRequestFilters {
  statusFilter?: number;
  searchText?: string;
  sortField?: string;
  sortDir?: 'asc' | 'desc';
}

export interface UsePurchaseRequestsReturn {
  requests: Cr38e_purchaserequests[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const SELECT_FIELDS = [
  'cr38e_purchaserequestid',
  'cr38e_pornumber',
  'cr38e_itemdescription',
  'cr38e_requestorname',
  'cr38e_totalamount',
  'cr38e_status',
  'cr38e_urgencylevel',
  'cr38e_duedate',
  'cr38e_submitteddate',
];

export function usePurchaseRequests(filters: PurchaseRequestFilters = {}): UsePurchaseRequestsReturn {
  const { statusFilter, searchText, sortField, sortDir } = filters;

  const [requests, setRequests] = useState<Cr38e_purchaserequests[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filterParts: string[] = [];

      if (statusFilter !== undefined) {
        filterParts.push(`cr38e_status eq ${statusFilter}`);
      }

      if (searchText && searchText.trim()) {
        const q = searchText.trim().replace(/'/g, "''");
        filterParts.push(
          `(contains(cr38e_pornumber,'${q}') or contains(cr38e_itemdescription,'${q}') or contains(cr38e_requestorname,'${q}'))`
        );
      }

      const orderBy: string[] = [];
      if (sortField && sortDir) {
        orderBy.push(`${sortField} ${sortDir}`);
      } else {
        orderBy.push('cr38e_submitteddate desc');
      }

      const result = await Cr38e_purchaserequestsService.getAll({
        select: SELECT_FIELDS,
        filter: filterParts.length ? filterParts.join(' and ') : undefined,
        orderBy,
      });

      setRequests(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load purchase requests');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchText, sortField, sortDir]);

  useEffect(() => { fetch(); }, [fetch]);

  return { requests, loading, error, refetch: fetch };
}
