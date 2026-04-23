import { useState, useMemo } from 'react';
import { colors, radius, shadow } from '../styles/theme';
import { PageHeader } from '../components/shared/PageHeader';
import { FilterBar } from '../components/shared/FilterBar';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterSelect } from '../components/ui/FilterSelect';
import { ViewToggle } from '../components/ui/ViewToggle';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { CatalogTable } from '../components/catalog/CatalogTable';
import { useCatalogItems } from '../hooks/useCatalogItems';
import type { Cr38e_masterorderingcatalogs } from '../generated/models/Cr38e_masterorderingcatalogsModel';

export interface CatalogPageProps {
  onAddItem?: () => void;
  onImportCSV?: () => void;
}

const DEPARTMENT_OPTIONS = [
  { value: '357090000', label: 'IT' },
  { value: '357090001', label: 'Finance' },
  { value: '357090002', label: 'Operations' },
  { value: '357090003', label: 'HR' },
  { value: '357090004', label: 'Engineering' },
  { value: '357090005', label: 'Marketing' },
];

// cr38e_department integer → label (catalog-specific)
function deptLabel(value: number): string {
  switch (value) {
    case 357090000: return 'IT';
    case 357090001: return 'Finance';
    case 357090002: return 'Operations';
    case 357090003: return 'HR';
    case 357090004: return 'Engineering';
    case 357090005: return 'Marketing';
    default:        return 'Other';
  }
}

// cr38e_um integer → label
function uomLabel(value: number): string {
  switch (value) {
    case 357090000: return 'Each';
    case 357090001: return 'Box';
    case 357090002: return 'Case';
    case 357090003: return 'Dozen';
    case 357090004: return 'Pound';
    case 357090005: return 'Kilogram';
    case 357090006: return 'Liter';
    case 357090007: return 'Gallon';
    default:        return '—';
  }
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function GridEmptyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

// Grid card for a single catalog item
function CatalogGridCard({
  item,
  selected,
  onSelect,
}: {
  item: Cr38e_masterorderingcatalogs;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
}) {
  const id = item.cr38e_masterorderingcatalogid as string;
  const imageUrl = item.cr38e_imageurl as string | undefined;
  const dept = item.cr38e_department as number | undefined;
  const uom  = item.cr38e_um as number | undefined;

  return (
    <div style={{
      background: colors.background,
      border: `1px solid ${selected ? colors.textPrimary : colors.border}`,
      borderRadius: radius.lg,
      padding: '16px',
      boxShadow: shadow.sm,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      cursor: 'pointer',
      transition: 'border-color 0.12s, box-shadow 0.12s',
    }}
      onClick={() => onSelect(id, !selected)}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = shadow.md; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = shadow.sm; }}
    >
      {/* Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.cr38e_description as string ?? ''}
          style={{ width: '100%', height: '120px', objectFit: 'contain', borderRadius: radius.md, background: colors.surface }}
        />
      ) : (
        <div style={{
          width: '100%', height: '120px', borderRadius: radius.md,
          background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <GridEmptyIcon />
        </div>
      )}

      {/* Catalog # + description */}
      <div>
        <p style={{ margin: 0, fontSize: '11px', color: colors.textMuted, fontWeight: 600, letterSpacing: '0.04em' }}>
          {item.cr38e_catalognumber as string ?? '—'}
        </p>
        <p style={{
          margin: '3px 0 0', fontSize: '13px', fontWeight: 600, color: colors.textPrimary,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.cr38e_description as string ?? '—'}
        </p>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
        {item.cr38e_category && (
          <Badge variant="draft" label={item.cr38e_category as string} size="sm" />
        )}
        {dept !== undefined && (
          <Badge variant="submitted" label={deptLabel(dept)} size="sm" />
        )}
      </div>

      {/* Vendor + UOM footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: colors.textSecondary, marginTop: 'auto' }}>
        <span>{item.cr38e_vendorname as string ?? '—'}</span>
        {uom !== undefined && <span>{uomLabel(uom)}</span>}
      </div>
    </div>
  );
}

export function CatalogPage({ onAddItem, onImportCSV }: CatalogPageProps) {
  const [searchText,       setSearchText]       = useState('');
  const [categoryFilter,   setCategoryFilter]   = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [view,             setView]             = useState<'list' | 'grid'>('list');
  const [selectedIds,      setSelectedIds]      = useState<Set<string>>(new Set());

  const { items, loading, error, refetch } = useCatalogItems({
    searchText:       searchText       || undefined,
    categoryFilter:   categoryFilter   || undefined,
    departmentFilter: departmentFilter ? Number(departmentFilter) : undefined,
  });

  // Derive distinct category options from loaded items (free-text field)
  const categoryOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { value: string; label: string }[] = [];
    for (const item of items) {
      const cat = item.cr38e_category as string | undefined;
      if (cat && !seen.has(cat)) {
        seen.add(cat);
        opts.push({ value: cat, label: cat });
      }
    }
    return opts.sort((a, b) => a.label.localeCompare(b.label));
  }, [items]);

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader
        title="Master Ordering Catalog"
        subtitle="Browse and manage catalog items"
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" icon={<UploadIcon />} onClick={onImportCSV}>
              Import CSV
            </Button>
            <Button variant="primary" icon={<PlusIcon />} onClick={onAddItem}>
              Add Item
            </Button>
          </div>
        }
      />

      <FilterBar>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            placeholder="Search description, part #, vendor, keywords…"
          />
        </div>
        <FilterSelect
          label="All Categories"
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <FilterSelect
          label="All Departments"
          options={DEPARTMENT_OPTIONS}
          value={departmentFilter}
          onChange={setDepartmentFilter}
        />
        <ViewToggle view={view} onChange={setView} />
      </FilterBar>

      {/* Result count + selection summary */}
      {!loading && !error && (
        <p style={{ margin: '16px 0 12px', fontSize: '13px', color: colors.textSecondary }}>
          {items.length} {items.length === 1 ? 'item' : 'items'}
          {selectedIds.size > 0 && ` · ${selectedIds.size} selected`}
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
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Failed to load catalog</p>
          <p style={{ margin: '0 0 12px' }}>{error}</p>
          <Button variant="secondary" onClick={refetch}>Retry</Button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && items.length === 0 && (
        <EmptyState
          icon={<GridEmptyIcon />}
          title="No catalog items found"
          message={searchText || categoryFilter || departmentFilter
            ? 'Try adjusting your search or filters.'
            : 'Add your first catalog item to get started.'}
          action={<Button variant="primary" icon={<PlusIcon />} onClick={onAddItem}>Add Item</Button>}
        />
      )}

      {/* List view */}
      {!loading && !error && items.length > 0 && view === 'list' && (
        <CatalogTable
          items={items}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      )}

      {/* Grid view */}
      {!loading && !error && items.length > 0 && view === 'grid' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}>
          {items.map(item => (
            <CatalogGridCard
              key={item.cr38e_masterorderingcatalogid as string}
              item={item}
              selected={selectedIds.has(item.cr38e_masterorderingcatalogid as string)}
              onSelect={(id, checked) => {
                const next = new Set(selectedIds);
                checked ? next.add(id) : next.delete(id);
                setSelectedIds(next);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
