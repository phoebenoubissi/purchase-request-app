import { useState, useEffect, useCallback } from 'react';
import { Cr38e_projectsService } from '../generated/services/Cr38e_projectsService';
import type { Cr38e_projects } from '../generated/models/Cr38e_projectsModel';

export interface UseProjectsReturn {
  projects: Cr38e_projects[];
  loading: boolean;
  error: string | null;
}

const SELECT_FIELDS = [
  'cr38e_projectid',
  'cr38e_projectname',
  'cr38e_description',
  'cr38e_projectscope',
  'cr38e_projecttype',
  'cr38e_phase',
];

// cr38e_projecttype
export function getProjectTypeLabel(value: number): string {
  switch (value) {
    case 357090000: return 'Internal';
    case 357090001: return 'External';
    case 357090002: return 'Capital';
    case 357090003: return 'Operational';
    default:        return 'Unknown';
  }
}

// cr38e_phase
export function getPhaseLabel(value: number): string {
  switch (value) {
    case 357090000: return 'Planning';
    case 357090001: return 'Design';
    case 357090002: return 'Development';
    case 357090003: return 'Testing';
    case 357090004: return 'Deployment';
    case 357090005: return 'Closed';
    default:        return 'Unknown';
  }
}

export function useProjects(searchText?: string): UseProjectsReturn {
  const [projects, setProjects] = useState<Cr38e_projects[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let filter: string | undefined;
      if (searchText && searchText.trim()) {
        const q = searchText.trim().replace(/'/g, "''");
        filter = `contains(cr38e_projectname,'${q}')`;
      }

      const result = await Cr38e_projectsService.getAll({
        select: SELECT_FIELDS,
        filter,
        orderBy: ['cr38e_projectname asc'],
      });

      setProjects(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => { fetch(); }, [fetch]);

  return { projects, loading, error };
}
