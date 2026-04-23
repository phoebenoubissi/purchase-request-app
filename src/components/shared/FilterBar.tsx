import { colors, radius } from '../../styles/theme';

export interface FilterBarProps {
  children: React.ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        marginBottom: '16px',
      }}
    >
      {children}
    </div>
  );
}
