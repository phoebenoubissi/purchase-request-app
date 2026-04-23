import { colors } from '../styles/theme';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard } from '../components/shared/StatCard';
import { PendingApprovalsSection } from '../components/dashboard/PendingApprovalsSection';
import { RecentRequestsSection } from '../components/dashboard/RecentRequestsSection';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { usePurchaseRequests } from '../hooks/usePurchaseRequests';
import { useMyApprovals } from '../hooks/useMyApprovals';
import type { Cr38e_purchaserequests } from '../generated/models/Cr38e_purchaserequestsModel';
import type { Cr38e_purchaserequestapprovals } from '../generated/models/Cr38e_purchaserequestapprovalsModel';
import type { PendingApprovalItem } from '../components/dashboard/PendingApprovalsSection';
import type { RecentRequestItem } from '../components/dashboard/RecentRequestsSection';

export interface DashboardPageProps {
  onNavigate: (page: string, id?: string) => void;
}

// Stat card icons
function TotalIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>; }
function PendingIcon()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function ApprovedIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function RejectedIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>; }
function ValueIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>; }

function formatValue(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function toApprovalItems(records: Cr38e_purchaserequestapprovals[]): PendingApprovalItem[] {
  return records.map(r => ({
    id:             r.cr38e_purchaserequestapprovalid as string,
    level:          (r.cr38e_level as number) ?? 1,
    approver:       (r.cr38e_approver as string) ?? '',
    porNumber:      (r.cr38e_approvalname as string) ?? '—',
    description:    (r.cr38e_approvalname as string) ?? '—',
    totalAmount:    0,
    approvalStatus: (r.cr38e_approvalstatus as number) ?? 357090000,
  }));
}

function toRequestItems(records: Cr38e_purchaserequests[]): RecentRequestItem[] {
  return records.slice(0, 5).map(r => ({
    id:            r.cr38e_purchaserequestid as string,
    porNumber:     (r.cr38e_pornumber as string) ?? '—',
    urgencyLevel:  (r.cr38e_urgencylevel as number) ?? 357090000,
    description:   (r.cr38e_itemdescription as string) ?? '—',
    dueDate:       r.cr38e_duedate as string | undefined,
    requestorName: (r.cr38e_requestorname as string) ?? '—',
    totalAmount:   (r.cr38e_totalamount as number) ?? 0,
  }));
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { stats, loading: statsLoading } = useDashboardStats();

  const { requests, loading: reqLoading } = usePurchaseRequests({
    sortField: 'cr38e_submitteddate',
    sortDir: 'desc',
  });

  const { pending, loading: appLoading } = useMyApprovals();

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back — here's what's happening"
      />

      {/* Stat cards row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <StatCard label="Total Requests" value={statsLoading ? '—' : stats.totalRequests} icon={<TotalIcon />}    variant="default" />
        <StatCard label="Pending"        value={statsLoading ? '—' : stats.pending}       icon={<PendingIcon />}  variant="warning" />
        <StatCard label="Approved"       value={statsLoading ? '—' : stats.approved}      icon={<ApprovedIcon />} variant="success" />
        <StatCard label="Rejected"       value={statsLoading ? '—' : stats.rejected}      icon={<RejectedIcon />} variant="danger"  />
        <StatCard label="Total Value"    value={statsLoading ? '—' : formatValue(stats.totalValue)} icon={<ValueIcon />} variant="info" />
      </div>

      {/* Two-column lower section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'start',
      }}>
        <PendingApprovalsSection
          approvals={toApprovalItems(pending)}
          loading={appLoading}
          onSelect={id => onNavigate('approvals', id)}
        />
        <RecentRequestsSection
          requests={toRequestItems(requests)}
          loading={reqLoading}
          onViewAll={() => onNavigate('requests')}
          onSelect={id => onNavigate('requests', id)}
        />
      </div>

      {/* Version */}
      <p style={{
        marginTop: '32px',
        textAlign: 'right',
        fontSize: '11px',
        color: colors.textMuted,
      }}>
        v1.0.0
      </p>
    </div>
  );
}
