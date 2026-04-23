import { colors, radius } from '../../styles/theme';
import type { VariantKey, SizeKey } from '../../styles/theme';

export interface ViewToggleProps {
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
  variant?: VariantKey;
  size?: SizeKey;
  disabled?: boolean;
  className?: string;
}

const iconSize = { sm: 14, md: 16, lg: 18 };
const padding  = { sm: '5px', md: '7px', lg: '9px' };

function GridIcon({ size }: { size: number }) {
  const s = size / 2 - 1;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width={s} height={s} rx="1" />
      <rect x={9 - s} y="1" width={s} height={s} rx="1" />
      <rect x="1" y={9 - s} width={s} height={s} rx="1" />
      <rect x={9 - s} y={9 - s} width={s} height={s} rx="1" />
    </svg>
  );
}

function ListIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="2"  width="14" height="2.5" rx="1" />
      <rect x="1" y="6.75" width="14" height="2.5" rx="1" />
      <rect x="1" y="11.5" width="14" height="2.5" rx="1" />
    </svg>
  );
}

export function ViewToggle({
  view,
  onChange,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: ViewToggleProps) {
  const ic = iconSize[size];
  const p  = padding[size];

  const activeStyle = {
    background: variant === 'primary' ? colors.surface : colors[variant].bg,
    color: variant === 'primary' ? colors.textPrimary : colors[variant].text,
    border: `1px solid ${colors.border}`,
  };
  const inactiveStyle = {
    background: 'transparent',
    color: colors.textMuted,
    border: '1px solid transparent',
  };

  function btn(key: 'grid' | 'list', icon: React.ReactNode, label: string) {
    const isActive = view === key;
    return (
      <button
        key={key}
        type="button"
        aria-label={label}
        aria-pressed={isActive}
        disabled={disabled}
        onClick={() => !disabled && onChange(key)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: p,
          borderRadius: radius.sm,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.12s, color 0.12s',
          opacity: disabled ? 0.5 : 1,
          ...(isActive ? activeStyle : inactiveStyle),
        }}
      >
        {icon}
      </button>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        gap: '2px',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        padding: '3px',
      }}
    >
      {btn('grid', <GridIcon size={ic} />, 'Grid view')}
      {btn('list', <ListIcon size={ic} />, 'List view')}
    </div>
  );
}
