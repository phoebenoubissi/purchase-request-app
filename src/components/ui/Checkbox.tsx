import { useEffect, useRef } from 'react';
import { colors, radius } from '../../styles/theme';
import type { VariantKey, SizeKey } from '../../styles/theme';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  variant?: VariantKey;
  size?: SizeKey;
  disabled?: boolean;
  className?: string;
}

const boxSize = { sm: '14px', md: '16px', lg: '20px' };

const variantFill: Record<VariantKey, string> = {
  primary:   colors.primary.bg,
  secondary: colors.textMuted,
  success:   colors.success.solid,
  danger:    colors.danger.solid,
  warning:   colors.warning.solid,
};

export function Checkbox({
  checked,
  onChange,
  indeterminate = false,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const fill = variantFill[variant];
  const sz   = boxSize[size];
  const active = checked || indeterminate;

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}
    >
      {/* hidden native input for accessibility */}
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        onChange={e => onChange(e.target.checked)}
        style={{
          position: 'absolute',
          opacity: 0,
          width: sz,
          height: sz,
          margin: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      />
      {/* visual box */}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: sz,
          height: sz,
          borderRadius: radius.sm,
          border: active ? `1.5px solid ${fill}` : `1.5px solid ${colors.borderHover}`,
          background: active ? fill : colors.background,
          flexShrink: 0,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.1s, border-color 0.1s',
        }}
      >
        {checked && !indeterminate && (
          <svg
            width="10" height="10" viewBox="0 0 10 10"
            fill="none" stroke={colors.textInverse} strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        )}
        {indeterminate && (
          <svg
            width="10" height="2" viewBox="0 0 10 2"
            fill="none" stroke={colors.textInverse} strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="9" y2="1" />
          </svg>
        )}
      </span>
    </span>
  );
}
