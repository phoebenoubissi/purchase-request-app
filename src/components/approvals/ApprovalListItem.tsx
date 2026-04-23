import { colors, radius, shadow } from '../../styles/theme';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import type { BadgeVariant } from '../ui/Badge';
import type { VariantKey } from '../../styles/theme';


export interface ApprovalListItemProps {
  id: string;
  level: number;
  approver: string;
  porNumber: string;
  description: string;
  totalAmount: number;
  approvalStatus: number;
  onClick: (id: string) => void;
}

// cr38e_approvalstatus → Badge variant + label
function statusVariant(status: number): BadgeVariant {
  switch (status) {
    case 357090001: return 'approved';
    case 357090002: return 'rejected';
    case 357090003: return 'draft';    // Future Pending
    case 357090004: return 'low';      // Skipped
    default:        return 'pending';  // 357090000 Pending Approval
  }
}

function statusLabel(status: number): string {
  switch (status) {
    case 357090000: return 'Pending Approval';
    case 357090001: return 'Approved';
    case 357090002: return 'Rejected';
    case 357090003: return 'Future Pending';
    case 357090004: return 'Skipped';
    default:        return 'Pending';
  }
}

// Avatar colour per level
function levelVariant(level: number): VariantKey {
  switch (level) {
    case 1: return 'secondary';
    case 2: return 'warning';
    case 3: return 'success';
    case 4: return 'danger';
    case 5: return 'primary';
    default: return 'warning';
  }
}

function approverRoleLabel(level: number): string {
  switch (level) {
    case 1: return 'Department Staff';
    case 2: return 'Department Manager';
    case 3: return 'Purchasing Manager';
    case 4: return 'Leadership / Director';
    case 5: return 'CEO';
    case 6: return 'Board Approval';
    default: return `Level ${level} Approver`;
  }
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function ApprovalListItem({
  id,
  level,
  approver,
  porNumber,
  description,
  totalAmount,
  approvalStatus,
  onClick,
}: ApprovalListItemProps) {
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
        gap: '14px',
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
      {/* Level avatar */}
      <Avatar level={level} variant={levelVariant(level)} size="md" />

      {/* Centre — POR, approver role, description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: colors.textPrimary }}>{porNumber}</span>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>·</span>
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>{approver || approverRoleLabel(level)}</span>
        </div>
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: colors.textSecondary,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {description}
        </p>
      </div>

      {/* Right — amount, status badge, arrow */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>
          {formatCurrency(totalAmount)}
        </span>
        <Badge variant={statusVariant(approvalStatus)} label={statusLabel(approvalStatus)} size="sm" />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke={colors.textMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}
