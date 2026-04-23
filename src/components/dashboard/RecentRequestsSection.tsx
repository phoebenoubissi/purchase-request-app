import { colors, radius, shadow } from '../../styles/theme';
import { RequestListItem } from '../requests/RequestListItem';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';

export interface RecentRequestItem {
  id: string;
  porNumber: string;
  urgencyLevel: number;
  description: string;
  dueDate?: string;
  requestorName: string;
  totalAmount: number;
}

export interface RecentRequestsSectionProps {
  requests: RecentRequestItem[];
  loading?: boolean;
  onViewAll: () => void;
  onSelect: (id: string) => void;
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6"  x2="21" y2="6"  />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6"  x2="3.01" y2="6"  />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  );
}

export function RecentRequestsSection({ requests, loading, onViewAll, onSelect }: RecentRequestsSectionProps) {
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
          <span style={{ color: colors.textSecondary }}>
            <ListIcon />
          </span>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colors.textPrimary }}>
            Recent Requests
          </h2>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            color: colors.textSecondary,
            padding: '4px 8px',
            borderRadius: '6px',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = colors.textPrimary; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = colors.textSecondary; }}
        >
          View All
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
            <Spinner />
          </div>
        ) : requests.length === 0 ? (
          <EmptyState
            icon={<InboxIcon />}
            title="No recent requests"
            message="Purchase requests you create will appear here."
            size="sm"
          />
        ) : (
          requests.map(r => (
            <RequestListItem
              key={r.id}
              id={r.id}
              porNumber={r.porNumber}
              urgencyLevel={r.urgencyLevel}
              description={r.description}
              dueDate={r.dueDate}
              requestorName={r.requestorName}
              totalAmount={r.totalAmount}
              onClick={onSelect}
            />
          ))
        )}
      </div>
    </section>
  );
}
