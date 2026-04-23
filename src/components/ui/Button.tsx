import type { CSSProperties } from 'react'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  children: React.ReactNode;
}

const base: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontWeight: 600,
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
  whiteSpace: 'nowrap',
}

const sizeStyles: Record<string, CSSProperties> = {
  sm: { fontSize: '13px', padding: '5px 12px', height: '32px' },
  md: { fontSize: '14px', padding: '7px 16px', height: '38px' },
  lg: { fontSize: '15px', padding: '9px 20px', height: '44px' },
}

const variantStyles: Record<string, CSSProperties> = {
  primary:   { background: '#111827', color: '#ffffff' },
  secondary: { background: '#ffffff', color: '#111827', border: '1px solid #e5e7eb' },
  ghost:     { background: 'transparent', color: '#6b7280' },
}

const hoverStyles: Record<string, CSSProperties> = {
  primary:   { background: '#1f2937' },
  secondary: { background: '#f9fafb' },
  ghost:     { background: '#f3f4f6' },
}

function Spinner() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '14px',
        height: '14px',
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'btn-spin 0.6s linear infinite',
      }}
    />
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <>
      <style>{`@keyframes btn-spin { to { transform: rotate(360deg); } }`}</style>
      <button
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        style={{
          ...base,
          ...sizeStyles[size],
          ...variantStyles[variant],
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={e => {
          if (!isDisabled) Object.assign((e.currentTarget as HTMLButtonElement).style, hoverStyles[variant])
        }}
        onMouseLeave={e => {
          if (!isDisabled) Object.assign((e.currentTarget as HTMLButtonElement).style, variantStyles[variant])
        }}
      >
        {loading ? <Spinner /> : icon}
        {children}
      </button>
    </>
  )
}
