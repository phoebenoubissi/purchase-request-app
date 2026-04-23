import { useState } from 'react';
import { colors, radius } from '../styles/theme';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard } from '../components/shared/StatCard';
import { FilterBar } from '../components/shared/FilterBar';
import { FilterSelect } from '../components/ui/FilterSelect';
import { Tabs } from '../components/shared/Tabs';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { ApprovalListItem } from '../components/approvals/ApprovalListItem';
import { Button } from '../components/ui/Button';
import { useMyApprovals } from '../hooks/useMyApprovals';
import type { Cr38e_purchaserequestapprovals } from '../generated/models/Cr38e_purchaserequestapprovalsModel';

export interface ApprovalsPageProps {
  onSelect: (id: string) => void;
  onBulkApprove?: () => void;
}

const LEVEL_OPTIONS = [
  { value: '1', label: 'Level 1 — Department Staff' },
  { value: '2', label: 'Level 2 — Department Manager' },
  { value: '3', label: 'Level 3 — Purchasing Manager' },
  { value: '4', label: 'Level 4 — Leadership / Director' },
  { value: '5', label: 'Level 5 — CEO' },
  { value: '6', label: 'Level 6 — Board Approval' },
];

function PendingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function ApprovedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function RejectedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
function ChecklistIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

function toItem(a: Cr38e_purchaserequestapprovals) {
  return {
    id:             a.cr38e_purchaserequestapprovalid as string,
    level:          (a.cr38e_level as number) ?? 1,
    approver:       (a.cr38e_approver as string) ?? '',
    porNumber:      (a.cr38e_approvalname as string) ?? '—',
    description:    (a.cr38e_approvalname as string) ?? '—',
    totalAmount:    0,
    approvalStatus: (a.cr38e_approvalstatus as number) ?? 357090000,
  };
}

export function ApprovalsPage({ onSelect, onBulkApprove }: ApprovalsPageProps) {
  const [levelFilter, setLevelFilter] = useState('');
  const [activeTab,   setActiveTab]   = useState<'pending' | 'completed'>('pending');

  const { pending, completed, loading, error, refetch } = useMyApprovals(
    levelFilter ? Number(levelFilter) : undefined
  );

  const visibleList = activeTab === 'pending' ? pending : completed;

  // Stat counts (unfiltered by tab, but filtered by level)
  const approvedCount  = completed.filter(a => (a.cr38e_approvalstatus as number) === 357090001).length;
  const rejectedCount  = completed.filter(a => (a.cr38e_approvalstatus as number) === 357090002).length;

  const tabs = [
    { key: 'pending',   label: 'Pending',   count: pending.length },
    { key: 'completed', label: 'Completed',  count: completed.length },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader
        title="My Approvals"
        subtitle="Review and act on purchase requests awaiting your approval"
        actions={
          onBulkApprove ? (
            <Button variant="secondary" size="sm" onClick={onBulkApprove}>
              Bulk Approvals
            </Button>
          ) : undefined
        }
      />

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <StatCard
          label="Pending Approval"
          value={loading ? '—' : pending.length}
          icon={<PendingIcon />}
          variant="warning"
        />
        <StatCard
          label="Approved"
          value={loading ? '—' : approvedCount}
          icon={<ApprovedIcon />}
          variant="success"
        />
        <StatCard
          label="Rejected"
          value={loading ? '—' : rejectedCount}
          icon={<RejectedIcon />}
          variant="danger"
        />
      </div>

      {/* Filter bar */}
      <FilterBar>
        <FilterSelect
          label="All Levels"
          options={LEVEL_OPTIONS}
          value={levelFilter}
          onChange={setLevelFilter}
        />
      </FilterBar>

      {/* Tabs */}
      <div style={{ margin: '20px 0 16px' }}>
        <Tabs
          tabs={tabs}
          activeKey={activeTab}
          onChange={key => setActiveTab(key as 'pending' | 'completed')}
        />
      </div>

      {/* Error */}
      {!loading && error && (
        <div style={{
          padding: '20px',
          background: colors.danger.bg,
          border: `1px solid ${colors.danger.text}`,
          borderRadius: radius.lg,
          color: colors.danger.text,
          fontSize: '14px',
          marginBottom: '16px',
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Failed to load approvals</p>
          <p style={{ margin: '0 0 12px' }}>{error}</p>
          <button
            type="button"
            onClick={refetch}
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              border: `1px solid ${colors.danger.text}`,
              borderRadius: radius.md,
              background: 'transparent',
              color: colors.danger.text,
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <Spinner size="lg" />
        </div>
      )}

      {/* Empty */}
      {!loading && !error && visibleList.length === 0 && (
        <EmptyState
          icon={<ChecklistIcon />}
          title={activeTab === 'pending' ? 'No pending approvals' : 'No completed approvals'}
          message={
            activeTab === 'pending'
              ? levelFilter
                ? 'No pending approvals at this level.'
                : 'You\'re all caught up — no approvals are waiting.'
              : 'Completed approvals will appear here.'
          }
        />
      )}

      {/* List */}
      {!loading && !error && visibleList.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {visibleList.map(a => {
            const item = toItem(a);
            return (
              <ApprovalListItem
                key={item.id}
                {...item}
                onClick={onSelect}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
