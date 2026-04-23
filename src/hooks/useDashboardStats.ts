import { useState, useEffect, useCallback } from 'react';
import { Cr38e_purchaserequestsService } from '../generated/services/Cr38e_purchaserequestsService';

export interface DashboardStats {
  totalRequests: number;
  pending: number;
  approved: number;
  rejected: number;
  totalValue: number;
}

export interface UseDashboardStatsReturn {
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const EMPTY: DashboardStats = {
  totalRequests: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  totalValue: 0,
};

// cr38e_status values
const STATUS_SUBMITTED = 100000001; // Submitted — counts as pending approval
const STATUS_IN_REVIEW = 100000002; // In Review — also pending
const STATUS_APPROVED  = 100000003;
const STATUS_REJECTED  = 100000004;

export function useDashboardStats(): UseDashboardStatsReturn {
  const [stats, setStats]     = useState<DashboardStats>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await Cr38e_purchaserequestsService.getAll({
        select: ['cr38e_purchaserequestid', 'cr38e_status', 'cr38e_totalamount'],
      });

      const records = result.data ?? [];

      let pending   = 0;
      let approved  = 0;
      let rejected  = 0;
      let totalValue = 0;

      for (const r of records) {
        const status = r.cr38e_status as number | undefined;
        if (status === STATUS_SUBMITTED || status === STATUS_IN_REVIEW) pending++;
        else if (status === STATUS_APPROVED) approved++;
        else if (status === STATUS_REJECTED) rejected++;

        const amt = r.cr38e_totalamount as number | undefined;
        if (typeof amt === 'number') totalValue += amt;
      }

      setStats({
        totalRequests: records.length,
        pending,
        approved,
        rejected,
        totalValue,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { stats, loading, error, refetch: fetch };
}
