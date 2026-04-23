export type BadgeVariant =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'draft'
  | 'completed'
  | 'submitted'
  | 'in-review'
  | 'cancelled';

export interface BadgeProps {
  variant: BadgeVariant;
  label: string;
  size?: 'sm' | 'md';
}

const styles: Record<BadgeVariant, { color: string; background: string }> = {
  critical:   { color: '#ef4444', background: '#fef2f2' },
  high:       { color: '#f97316', background: '#fff7ed' },
  medium:     { color: '#eab308', background: '#fefce8' },
  low:        { color: '#6b7280', background: '#f3f4f6' },
  pending:    { color: '#d97706', background: '#fffbeb' },
  approved:   { color: '#22c55e', background: '#f0fdf4' },
  rejected:   { color: '#ef4444', background: '#fef2f2' },
  draft:      { color: '#6b7280', background: '#f3f4f6' },
  completed:  { color: '#3b82f6', background: '#eff6ff' },
  submitted:  { color: '#8b5cf6', background: '#f5f3ff' },
  'in-review': { color: '#0ea5e9', background: '#f0f9ff' },
  cancelled:  { color: '#6b7280', background: '#f3f4f6' },
};

export function Badge({ variant, label, size = 'md' }: BadgeProps) {
  const { color, background } = styles[variant];
  const fontSize = size === 'sm' ? '11px' : '12px';
  const padding = size === 'sm' ? '2px 8px' : '3px 10px';

  return (
    <span
      style={{
        display: 'inline-block',
        color,
        background,
        fontSize,
        fontWeight: 600,
        padding,
        borderRadius: '9999px',
        lineHeight: '18px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
