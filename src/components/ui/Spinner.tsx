import { colors } from '../../styles/theme';
import type { VariantKey, SizeKey } from '../../styles/theme';

export interface SpinnerProps {
  variant?: VariantKey;
  size?: SizeKey;
  disabled?: boolean;
  className?: string;
}

const diameter = { sm: '16px', md: '24px', lg: '32px' };
const thickness = { sm: '2px', md: '3px', lg: '3px' };

const variantColor: Record<VariantKey, string> = {
  primary:   colors.primary.bg,
  secondary: colors.textMuted,
  success:   colors.success.solid,
  danger:    colors.danger.solid,
  warning:   colors.warning.solid,
};

export function Spinner({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: SpinnerProps) {
  const d = diameter[size];
  const t = thickness[size];
  const color = variantColor[variant];

  return (
    <>
      <style>{`
        @keyframes spinner-rotate { to { transform: rotate(360deg); } }
      `}</style>
      <span
        role="status"
        aria-label="Loading"
        className={className}
        style={{
          display: 'inline-block',
          width: d,
          height: d,
          borderRadius: '50%',
          border: `${t} solid ${color}22`,
          borderTopColor: color,
          animation: 'spinner-rotate 0.65s linear infinite',
          flexShrink: 0,
          opacity: disabled ? 0.5 : 1,
        }}
      />
    </>
  );
}
