import { colors, radius } from '../../styles/theme';
import { Checkbox } from '../ui/Checkbox';
import { EmptyState } from '../ui/EmptyState';
import { CatalogRow } from './CatalogRow';
import type { Cr38e_masterorderingcatalogs } from '../../generated/models/Cr38e_masterorderingcatalogsModel';

export interface CatalogTableProps {
  items: Cr38e_masterorderingcatalogs[];
  selectedIds: Set<string>;
  onSelectionChange: (selectedIds: Set<string>) => void;
}

const COLUMNS = ['', 'Image', 'Catalog #', 'Description', 'Part #', 'Category', 'Department', 'Vendor', 'UOM'];

function InboxIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  );
}

export function CatalogTable({ items, selectedIds, onSelectionChange }: CatalogTableProps) {
  const allSelected  = items.length > 0 && items.every(i => selectedIds.has(i.cr38e_masterorderingcatalogid as string));
  const someSelected = items.some(i => selectedIds.has(i.cr38e_masterorderingcatalogid as string));

  function handleSelectAll(checked: boolean) {
    if (checked) {
      onSelectionChange(new Set(items.map(i => i.cr38e_masterorderingcatalogid as string)));
    } else {
      onSelectionChange(new Set());
    }
  }

  function handleSelectOne(id: string, checked: boolean) {
    const next = new Set(selectedIds);
    checked ? next.add(id) : next.delete(id);
    onSelectionChange(next);
  }

  return (
    <div style={{
      border: `1px solid ${colors.border}`,
      borderRadius: radius.lg,
      overflow: 'hidden',
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: colors.surface }}>
              {COLUMNS.map((col, i) => (
                <th
                  key={col || i}
                  style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: colors.textSecondary,
                    borderBottom: `1px solid ${colors.border}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {i === 0 ? (
                    <Checkbox
                      checked={allSelected}
                      indeterminate={!allSelected && someSelected}
                      onChange={handleSelectAll}
                    />
                  ) : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map(item => (
                <CatalogRow
                  key={item.cr38e_masterorderingcatalogid as string}
                  item={item}
                  selected={selectedIds.has(item.cr38e_masterorderingcatalogid as string)}
                  onSelect={handleSelectOne}
                />
              ))
            ) : (
              <tr>
                <td colSpan={COLUMNS.length} style={{ padding: '48px 24px' }}>
                  <EmptyState
                    icon={<InboxIcon />}
                    title="No catalog items"
                    message="No items match your filters. Try adjusting your search or category."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedIds.size > 0 && (
        <div style={{
          padding: '10px 16px',
          borderTop: `1px solid ${colors.border}`,
          background: colors.surface,
          fontSize: '12px',
          color: colors.textSecondary,
        }}>
          {selectedIds.size} item{selectedIds.size !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}
