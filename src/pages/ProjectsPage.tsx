import { useState } from 'react';
import { colors, radius } from '../styles/theme';
import { PageHeader } from '../components/shared/PageHeader';
import { FilterBar } from '../components/shared/FilterBar';
import { SearchBar } from '../components/ui/SearchBar';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { ProjectCard } from '../components/projects/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import type { Cr38e_projects } from '../generated/models/Cr38e_projectsModel';

export interface ProjectsPageProps {
  onSelect: (id: string) => void;
}

function FolderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

export function ProjectsPage({ onSelect }: ProjectsPageProps) {
  const [searchText, setSearchText] = useState('');

  const { projects, loading, error } = useProjects(searchText || undefined);

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader
        title="Projects"
        subtitle="Browse projects linked to purchase requests"
      />

      <FilterBar>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            placeholder="Search projects…"
          />
        </div>
      </FilterBar>

      {/* Result count */}
      {!loading && !error && (
        <p style={{ margin: '16px 0 12px', fontSize: '13px', color: colors.textSecondary }}>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <Spinner size="lg" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div style={{
          padding: '20px',
          background: colors.danger.bg,
          border: `1px solid ${colors.danger.text}`,
          borderRadius: radius.lg,
          color: colors.danger.text,
          fontSize: '14px',
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Failed to load projects</p>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && projects.length === 0 && (
        <EmptyState
          icon={<FolderIcon />}
          title="No projects found"
          message={searchText ? 'Try a different search term.' : 'No projects have been created yet.'}
        />
      )}

      {/* 2-column card grid */}
      {!loading && !error && projects.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}>
          {projects.map((p: Cr38e_projects) => (
            <ProjectCard
              key={p.cr38e_projectid as string}
              id={p.cr38e_projectid as string}
              name={(p.cr38e_projectname as string) ?? '—'}
              projectType={(p.cr38e_projecttype as number) ?? 357090000}
              description={(p.cr38e_description as string) ?? ''}
              phase={(p.cr38e_phase as number) ?? 357090000}
              onClick={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
