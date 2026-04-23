import { colors, radius } from '../../styles/theme';
import type { VariantKey } from '../../styles/theme';

export interface AvatarProps {
  level: number;
  variant?: VariantKey;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const variantBg: Record<VariantKey, string> = {
  primary:   colors.primary.bg,
  secondary: colors.textMuted,
  success:   colors.success.solid,
  danger:    colors.danger.solid,
  warning:   colors.warning.solid,
};

const diameter = { sm: '28px', md: '40px', lg: '52px' };
const fontSize  = { sm: '12px', md: '15px', lg: '20px' };

export function Avatar({
  level,
  variant = 'warning',
  size = 'md',
  disabled = false,
  className,
}: AvatarProps) {
  const d = diameter[size];

  return (
    <span
      className={className}
      aria-label={`Level ${level}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: d,
        height: d,
        borderRadius: radius.full,
        background: variantBg[variant],
        color: colors.textInverse,
        fontSize: fontSize[size],
        fontWeight: 700,
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
      }}
    >
      {level}
    </span>
  );
}
