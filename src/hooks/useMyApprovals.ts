import { useState, useEffect, useCallback } from 'react';
import { Cr38e_purchaserequestapprovalsService } from '../generated/services/Cr38e_purchaserequestapprovalsService';
import type { Cr38e_purchaserequestapprovals } from '../generated/models/Cr38e_purchaserequestapprovalsModel';

export interface UseMyApprovalsReturn {
  approvals: Cr38e_purchaserequestapprovals[];
  pending: Cr38e_purchaserequestapprovals[];
  completed: Cr38e_purchaserequestapprovals[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const SELECT_FIELDS = [
  'cr38e_purchaserequestapprovalid',
  'cr38e_approvalname',
  'cr38e_approver',
  'cr38e_level',
  'cr38e_approvalstatus',
  'cr38e_status',
  'cr38e_approvaldate',
  '_cr38e_purchaserequest_value',
];

// cr38e_approvalstatus: 357090000=Pending Approval, 357090003=Future Pending
// cr38e_status: 1=Pending, 2=Future Pending
const isPending = (a: Cr38e_purchaserequestapprovals): boolean => {
  const s = a.cr38e_approvalstatus as number | undefined;
  return s === 357090000 || s === 357090003;
};

export function useMyApprovals(levelFilter?: number): UseMyApprovalsReturn {
  const [approvals, setApprovals] = useState<Cr38e_purchaserequestapprovals[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filterParts: string[] = [];

      if (levelFilter !== undefined) {
        filterParts.push(`cr38e_level eq ${levelFilter}`);
      }

      const result = await Cr38e_purchaserequestapprovalsService.getAll({
        select: SELECT_FIELDS,
        filter: filterParts.length ? filterParts.join(' and ') : undefined,
        orderBy: ['cr38e_level asc'],
      });

      setApprovals(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load approvals');
    } finally {
      setLoading(false);
    }
  }, [levelFilter]);

  useEffect(() => { fetch(); }, [fetch]);

  const pending   = approvals.filter(a => isPending(a));
  const completed = approvals.filter(a => !isPending(a));

  return { approvals, pending, completed, loading, error, refetch: fetch };
}
