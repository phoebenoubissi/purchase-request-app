import { colors, radius, shadow } from '../../styles/theme';
import { ApprovalListItem } from '../approvals/ApprovalListItem';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';

export interface PendingApprovalItem {
  id: string;
  level: number;
  approver: string;
  porNumber: string;
  description: string;
  totalAmount: number;
  approvalStatus: number;
}

export interface PendingApprovalsSectionProps {
  approvals: PendingApprovalItem[];
  loading?: boolean;
  onSelect: (id: string) => void;
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function PendingApprovalsSection({ approvals, loading, onSelect }: PendingApprovalsSectionProps) {
  return (
    <section style={{
      background: colors.background,
      border: `1px solid ${colors.border}`,
      borderRadius: radius.lg,
      boxShadow: shadow.sm,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#d97706' }}>
            <WarningIcon />
          </span>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colors.textPrimary }}>
            Pending Approvals
          </h2>
          {approvals.length > 0 && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '20px',
              height: '20px',
              padding: '0 6px',
              borderRadius: '9999px',
              background: '#fef3c7',
              color: '#d97706',
              fontSize: '11px',
              fontWeight: 700,
            }}>
              {approvals.length}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
            <Spinner variant="warning" />
          </div>
        ) : approvals.length === 0 ? (
          <EmptyState
            icon={<ClockIcon />}
            title="No pending approvals"
            message="You're all caught up."
            size="sm"
          />
        ) : (
          approvals.map(a => (
            <ApprovalListItem
              key={a.id}
              id={a.id}
              level={a.level}
              approver={a.approver}
              porNumber={a.porNumber}
              description={a.description}
              totalAmount={a.totalAmount}
              approvalStatus={a.approvalStatus}
              onClick={onSelect}
            />
          ))
        )}
      </div>
    </section>
  );
}
