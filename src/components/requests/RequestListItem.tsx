import { colors, radius, shadow } from '../../styles/theme';
import { Badge } from '../ui/Badge';
import type { BadgeVariant } from '../ui/Badge';

export interface RequestListItemProps {
  id: string;
  porNumber: string;
  urgencyLevel: number;
  description: string;
  dueDate?: string;
  requestorName: string;
  totalAmount: number;
  onClick: (id: string) => void;
}

// cr38e_urgencylevel integer → Badge variant
function urgencyVariant(level: number): BadgeVariant {
  switch (level) {
    case 357090003: return 'critical';
    case 357090002: return 'high';
    case 357090001: return 'medium';
    case 357090000: return 'low';
    default:        return 'low';
  }
}

function urgencyLabel(level: number): string {
  switch (level) {
    case 357090003: return 'Critical';
    case 357090002: return 'High';
    case 357090001: return 'Medium';
    case 357090000: return 'Low';
    default:        return 'Low';
  }
}

function formatDate(iso?: string): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function RequestListItem({
  id,
  porNumber,
  urgencyLevel,
  description,
  dueDate,
  requestorName,
  totalAmount,
  onClick,
}: RequestListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '14px 16px',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        cursor: 'pointer',
        textAlign: 'left',
        gap: '12px',
        boxShadow: shadow.sm,
        transition: 'box-shadow 0.12s, border-color 0.12s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = colors.borderHover;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = shadow.md;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = colors.border;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = shadow.sm;
      }}
    >
      {/* Left — POR + urgency */}
      <div style={{ flexShrink: 0, minWidth: '120px' }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: colors.textPrimary }}>{porNumber}</p>
        <div style={{ marginTop: '4px' }}>
          <Badge variant={urgencyVariant(urgencyLevel)} label={urgencyLabel(urgencyLevel)} size="sm" />
        </div>
      </div>

      {/* Centre — description + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: 500,
          color: colors.textPrimary,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {description}
        </p>
        <p style={{ margin: '3px 0 0', fontSize: '12px', color: colors.textSecondary }}>
          {requestorName} · Due {formatDate(dueDate)}
        </p>
      </div>

      {/* Right — amount + arrow */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>
          {formatCurrency(totalAmount)}
        </p>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke={colors.textMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}
