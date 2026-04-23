import { colors, sizes, radius } from '../../styles/theme';
import type { VariantKey, SizeKey } from '../../styles/theme';

export interface SortButtonProps {
  label: string;
  direction: 'asc' | 'desc' | null;
  onClick: () => void;
  variant?: VariantKey;
  size?: SizeKey;
  disabled?: boolean;
  className?: string;
}

export function SortButton({
  label,
  direction,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: SortButtonProps) {
  const sz = sizes[size];

  const activeColor = variant === 'primary' ? colors.textPrimary : colors[variant].text;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'none',
        border: 'none',
        borderRadius: radius.sm,
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: '4px 6px',
        fontSize: sz.fontSize,
        fontWeight: 600,
        color: colors.textSecondary,
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}
    >
      {label}
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          lineHeight: 1,
          fontSize: '10px',
          gap: '1px',
        }}
        aria-hidden="true"
      >
        <span style={{ color: direction === 'asc' ? activeColor : colors.textMuted }}>▲</span>
        <span style={{ color: direction === 'desc' ? activeColor : colors.textMuted }}>▼</span>
      </span>
    </button>
  );
}
