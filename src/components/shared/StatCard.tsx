import { colors, radius, shadow } from '../../styles/theme';

export type StatCardVariant = 'default' | 'warning' | 'success' | 'danger' | 'info';

export interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  variant?: StatCardVariant;
}

const iconBg: Record<StatCardVariant, string> = {
  default: '#f3f4f6',
  warning: '#fef3c7',
  success: '#d1fae5',
  danger:  '#fee2e2',
  info:    '#dbeafe',
};

const iconColor: Record<StatCardVariant, string> = {
  default: colors.textSecondary,
  warning: '#d97706',
  success: '#16a34a',
  danger:  '#dc2626',
  info:    '#2563eb',
};

export function StatCard({ label, value, icon, variant = 'default' }: StatCardProps) {
  return (
    <div
      style={{
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: '20px',
        boxShadow: shadow.sm,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <p style={{
          margin: 0,
          fontSize: '13px',
          fontWeight: 500,
          color: colors.textSecondary,
        }}>
          {label}
        </p>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: radius.md,
          background: iconBg[variant],
          color: iconColor[variant],
          flexShrink: 0,
        }}>
          {icon}
        </span>
      </div>

      <p style={{
        margin: 0,
        fontSize: '28px',
        fontWeight: 700,
        color: colors.textPrimary,
        lineHeight: 1,
      }}>
        {value}
      </p>
    </div>
  );
}
