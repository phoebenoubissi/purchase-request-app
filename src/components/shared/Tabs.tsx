import { useState } from 'react';
import { colors, radius } from '../../styles/theme';

export interface TabItem {
  key: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function Tabs({ tabs, activeKey, onChange }: TabsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px',
        background: colors.surface,
        borderRadius: radius.lg,
        border: `1px solid ${colors.border}`,
      }}
    >
      {tabs.map(tab => {
        const isActive  = tab.key === activeKey;
        const isHovered = tab.key === hovered;

        return (
          <button
            key={tab.key}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            onMouseEnter={() => setHovered(tab.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: radius.md,
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 500,
              background: isActive
                ? colors.background
                : isHovered
                  ? colors.border
                  : 'transparent',
              color: isActive ? colors.textPrimary : colors.textSecondary,
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
              transition: 'background 0.1s, color 0.1s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '18px',
                height: '18px',
                padding: '0 5px',
                borderRadius: radius.full,
                fontSize: '11px',
                fontWeight: 600,
                background: isActive ? colors.surface : colors.border,
                color: isActive ? colors.textSecondary : colors.textMuted,
              }}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
