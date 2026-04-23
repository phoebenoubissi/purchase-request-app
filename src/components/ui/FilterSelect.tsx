import { colors, sizes, radius } from '../../styles/theme';
import type { VariantKey, SizeKey } from '../../styles/theme';

export interface FilterSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  variant?: VariantKey;
  size?: SizeKey;
  disabled?: boolean;
  className?: string;
}

const variantBorder: Record<VariantKey, string> = {
  primary:   colors.border,
  secondary: colors.border,
  success:   colors.success.solid,
  danger:    colors.danger.solid,
  warning:   colors.warning.solid,
};

export function FilterSelect({
  label,
  options,
  value,
  onChange,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: FilterSelectProps) {
  const sz = sizes[size];

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
    >
      {/* funnel icon */}
      <svg
        style={{
          position: 'absolute',
          left: '10px',
          width: sz.iconSize,
          height: sz.iconSize,
          color: colors.textMuted,
          pointerEvents: 'none',
        }}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L13 9.414V15a1 1 0 01-.553.894l-4 2A1 1 0 017 17v-7.586L3.293 5.707A1 1 0 013 5V3z"
          clipRule="evenodd"
        />
      </svg>

      <select
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
        onChange={e => onChange(e.target.value)}
        style={{
          height: sz.height,
          paddingLeft: '30px',
          paddingRight: '30px',
          fontSize: sz.fontSize,
          color: colors.textPrimary,
          background: colors.background,
          border: `1px solid ${variantBorder[variant]}`,
          borderRadius: radius.md,
          appearance: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <option value="">{label}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* chevron-down icon */}
      <svg
        style={{
          position: 'absolute',
          right: '10px',
          width: sz.iconSize,
          height: sz.iconSize,
          color: colors.textMuted,
          pointerEvents: 'none',
        }}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
