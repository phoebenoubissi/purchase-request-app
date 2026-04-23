import { colors, radius, shadow } from '../../styles/theme';
import { Badge } from '../ui/Badge';
import type { BadgeVariant } from '../ui/Badge';

export interface ProjectCardProps {
  id: string;
  name: string;
  projectType: number;
  description: string;
  phase: number;
  onClick: (id: string) => void;
}

// cr38e_projecttype
function projectTypeLabel(value: number): string {
  switch (value) {
    case 357090000: return 'Internal';
    case 357090001: return 'External';
    case 357090002: return 'Capital';
    case 357090003: return 'Operational';
    default:        return 'Unknown';
  }
}

// cr38e_phase → label + Badge variant
function phaseInfo(value: number): { label: string; variant: BadgeVariant } {
  switch (value) {
    case 357090000: return { label: 'Planning',    variant: 'draft' };
    case 357090001: return { label: 'Design',      variant: 'submitted' };
    case 357090002: return { label: 'Development', variant: 'pending' };
    case 357090003: return { label: 'Testing',     variant: 'medium' };
    case 357090004: return { label: 'Deployment',  variant: 'approved' };
    case 357090005: return { label: 'Closed',      variant: 'cancelled' };
    default:        return { label: 'Unknown',     variant: 'draft' };
  }
}

function ProjectIcon() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function ProjectCard({ id, name, projectType, description, phase, onClick }: ProjectCardProps) {
  const { label: phaseLabel, variant: phaseVariant } = phaseInfo(phase);

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '20px',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: shadow.sm,
        transition: 'box-shadow 0.12s, border-color 0.12s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = shadow.md;
        (e.currentTarget as HTMLButtonElement).style.borderColor = colors.borderHover;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = shadow.sm;
        (e.currentTarget as HTMLButtonElement).style.borderColor = colors.border;
      }}
    >
      {/* Top row — icon + arrow */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: radius.md,
          background: colors.surface,
          color: colors.textSecondary,
          flexShrink: 0,
        }}>
          <ProjectIcon />
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke={colors.textMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Name + type */}
      <p style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: 700, color: colors.textPrimary }}>
        {name}
      </p>
      <p style={{ margin: '0 0 10px', fontSize: '12px', color: colors.textMuted }}>
        {projectTypeLabel(projectType)}
      </p>

      {/* Description — 2-line clamp */}
      <p style={{
        margin: '0 0 16px',
        fontSize: '13px',
        color: colors.textSecondary,
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: 1,
      }}>
        {description || '—'}
      </p>

      {/* Phase badge */}
      <div>
        <Badge variant={phaseVariant} label={phaseLabel} size="sm" />
      </div>
    </button>
  );
}
