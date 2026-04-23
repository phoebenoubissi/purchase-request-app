import { useState, useEffect, useCallback } from 'react';
import { Cr38e_purchaserequestsService } from '../generated/services/Cr38e_purchaserequestsService';
import { Cr38e_purchaserequestdetailsService } from '../generated/services/Cr38e_purchaserequestdetailsService';
import { Cr38e_purchaserequestapprovalsService } from '../generated/services/Cr38e_purchaserequestapprovalsService';
import type { Cr38e_purchaserequests } from '../generated/models/Cr38e_purchaserequestsModel';
import type { Cr38e_purchaserequestdetails } from '../generated/models/Cr38e_purchaserequestdetailsModel';
import type { Cr38e_purchaserequestapprovals } from '../generated/models/Cr38e_purchaserequestapprovalsModel';

export interface UsePurchaseRequestReturn {
  request: Cr38e_purchaserequests | null;
  lineItems: Cr38e_purchaserequestdetails[];
  approvals: Cr38e_purchaserequestapprovals[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const REQUEST_SELECT = [
  'cr38e_purchaserequestid',
  'cr38e_pornumber',
  'cr38e_ponumber',
  'cr38e_itemdescription',
  'cr38e_description',
  'cr38e_justification',
  'cr38e_company',
  'cr38e_customer',
  'cr38e_suppliers',
  'cr38e_requestorname',
  'cr38e_requestoremail',
  'cr38e_requestorid',
  'cr38e_deliverylocation',
  'cr38e_totalamount',
  'cr38e_totalcosts',
  'cr38e_status',
  'cr38e_purchasestatus',
  'cr38e_urgencylevel',
  'cr38e_priority',
  'cr38e_portype',
  'cr38e_itemtype',
  'cr38e_department',
  'cr38e_currentlevel',
  'cr38e_currentapprovallevel',
  'cr38e_requiredapprovallevel',
  'cr38e_duedate',
  'cr38e_daterequired',
  'cr38e_datecompleted',
  'cr38e_submitteddate',
  'cr38e_rejectionreason',
  'cr38e_purchasingnotes',
  '_cr38e_project_value',
  'cr38e_projectname',
];

const LINE_ITEMS_SELECT = [
  'cr38e_purchaserequestdetailid',
  'cr38e_detailname',
  'cr38e_description',
  'cr38e_partnumber',
  'cr38e_vendor',
  'cr38e_link',
  'cr38e_quantity',
  'cr38e_priceeach',
  'cr38e_totallinecost',
  'cr38e_totalprice',
  'cr38e_uom',
  'cr38e_linestatus',
  'cr38e_linenotes',
  'cr38e_issuedtoworkorder',
  'cr38e_duedate',
];

const APPROVALS_SELECT = [
  'cr38e_purchaserequestapprovalid',
  'cr38e_approvalname',
  'cr38e_approver',
  'cr38e_approvedby',
  'cr38e_approvalcomment',
  'cr38e_approvaldate',
  'cr38e_level',
  'cr38e_approvalstatus',
  'cr38e_status',
];

export function usePurchaseRequest(id: string): UsePurchaseRequestReturn {
  const [request, setRequest]     = useState<Cr38e_purchaserequests | null>(null);
  const [lineItems, setLineItems] = useState<Cr38e_purchaserequestdetails[]>([]);
  const [approvals, setApprovals] = useState<Cr38e_purchaserequestapprovals[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [reqResult, lineResult, approvalResult] = await Promise.all([
        Cr38e_purchaserequestsService.get(id, { select: REQUEST_SELECT }),
        Cr38e_purchaserequestdetailsService.getAll({
          select: LINE_ITEMS_SELECT,
          filter: `_cr38e_purchaserequest_value eq '${id}'`,
        }),
        Cr38e_purchaserequestapprovalsService.getAll({
          select: APPROVALS_SELECT,
          filter: `_cr38e_purchaserequest_value eq '${id}'`,
          orderBy: ['cr38e_level asc'],
        }),
      ]);

      setRequest(reqResult.data ?? null);
      setLineItems(lineResult.data ?? []);
      setApprovals(approvalResult.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load purchase request');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { request, lineItems, approvals, loading, error, refetch: fetch };
}
