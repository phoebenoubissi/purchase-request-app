import { colors, radius } from '../../styles/theme';
import type { VariantKey, SizeKey } from '../../styles/theme';

export interface EmptyStateProps {
  title: string;
  icon?: React.ReactNode;
  message?: string;
  action?: React.ReactNode;
  variant?: VariantKey;
  size?: SizeKey;
  disabled?: boolean;
  className?: string;
}

const variantIconColor: Record<VariantKey, string> = {
  primary:   colors.textMuted,
  secondary: colors.textMuted,
  success:   colors.success.solid,
  danger:    colors.danger.solid,
  warning:   colors.warning.solid,
};

const iconWrapperSize = { sm: '40px', md: '56px', lg: '72px' };
const titleSize       = { sm: '13px', md: '15px', lg: '17px' };
const messageSize     = { sm: '12px', md: '13px', lg: '14px' };

export function EmptyState({
  title,
  icon,
  message,
  action,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: EmptyStateProps) {
  const iconColor = variantIconColor[variant];

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: size === 'sm' ? '32px 16px' : size === 'lg' ? '64px 24px' : '48px 24px',
        border: `1.5px dashed ${colors.border}`,
        borderRadius: radius.lg,
        background: colors.surface,
        textAlign: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {icon && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: iconWrapperSize[size],
            height: iconWrapperSize[size],
            color: iconColor,
            marginBottom: '16px',
            fontSize: iconWrapperSize[size],
          }}
        >
          {icon}
        </span>
      )}

      <p style={{
        margin: '0 0 6px',
        fontSize: titleSize[size],
        fontWeight: 600,
        color: colors.textPrimary,
      }}>
        {title}
      </p>

      {message && (
        <p style={{
          margin: '0 0 20px',
          fontSize: messageSize[size],
          color: colors.textSecondary,
          maxWidth: '320px',
          lineHeight: 1.5,
        }}>
          {message}
        </p>
      )}

      {action && (
        <div style={{ marginTop: message ? 0 : '16px' }}>
          {action}
        </div>
      )}
    </div>
  );
}
