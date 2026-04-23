import { useState } from 'react';
import { colors, shadow } from '../../styles/theme';

export interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export interface TopNavProps {
  appName: string;
  subtitle?: string;
  navItems: NavItem[];
  activeKey: string;
  onNavigate: (key: string) => void;
}

function AppIcon() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect width="28" height="28" rx="6" fill={colors.primary.bg} />
      <path
        d="M8 10h12M8 14h8M8 18h10"
        stroke={colors.textInverse}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TopNav({ appName, subtitle, navItems, activeKey, onNavigate }: TopNavProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      role="navigation"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        padding: '0 24px',
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: shadow.sm,
      }}
    >
      {/* Left — logo + app name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <AppIcon />
        <div>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            color: colors.textPrimary,
            lineHeight: 1.2,
          }}>
            {appName}
          </div>
          {subtitle && (
            <div style={{
              fontSize: '11px',
              color: colors.textMuted,
              lineHeight: 1.2,
            }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Right — nav items */}
      <div
        role="list"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {navItems.map(item => {
          const isActive  = item.key === activeKey;
          const isHovered = item.key === hovered;

          return (
            <button
              key={item.key}
              role="listitem"
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(item.key)}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                height: '36px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                background: isActive
                  ? colors.primary.bg
                  : isHovered
                    ? colors.surface
                    : 'transparent',
                color: isActive ? colors.textInverse : colors.textSecondary,
                transition: 'background 0.12s, color 0.12s',
              }}
            >
              <span style={{
                display: 'inline-flex',
                opacity: isActive ? 1 : 0.7,
              }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
