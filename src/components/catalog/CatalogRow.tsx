import { colors } from '../../styles/theme';
import { Checkbox } from '../ui/Checkbox';
import { Badge } from '../ui/Badge';
import type { Cr38e_masterorderingcatalogs } from '../../generated/models/Cr38e_masterorderingcatalogsModel';

export interface CatalogRowProps {
  item: Cr38e_masterorderingcatalogs;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
}

// cr38e_department (catalog-specific values)
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

// cr38e_um (UOM — NOTE: this table uses cr38e_um, not cr38e_uom)
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

function truncate(str: string | undefined | null, max: number): string {
  if (!str) return '—';
  return str.length > max ? str.slice(0, max) + '…' : str;
}

const cellStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: '13px',
  color: colors.textPrimary,
  verticalAlign: 'middle',
  borderBottom: `1px solid ${colors.border}`,
};

const mutedCell: React.CSSProperties = {
  ...cellStyle,
  color: colors.textSecondary,
};

export function CatalogRow({ item, selected, onSelect }: CatalogRowProps) {
  const id = item.cr38e_masterorderingcatalogid as string;
  const imageUrl = item.cr38e_imageurl as string | undefined;
  const dept = item.cr38e_department as number | undefined;
  const uom  = item.cr38e_um as number | undefined;

  return (
    <tr style={{ background: selected ? '#f0f9ff' : colors.background }}>

      {/* Checkbox */}
      <td style={{ ...cellStyle, width: 40, textAlign: 'center' }}>
        <Checkbox
          checked={selected}
          onChange={checked => onSelect(id, checked)}
        />
      </td>

      {/* Image */}
      <td style={{ ...cellStyle, width: 52 }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, display: 'block' }}
          />
        ) : (
          <div style={{
            width: 40, height: 40, borderRadius: 4,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
          }} />
        )}
      </td>

      {/* Catalog # */}
      <td style={{ ...cellStyle, fontWeight: 600, whiteSpace: 'nowrap' }}>
        {(item.cr38e_catalognumber as string) || '—'}
      </td>

      {/* Description */}
      <td style={mutedCell}>
        {truncate(item.cr38e_description as string, 40)}
      </td>

      {/* Part # */}
      <td style={mutedCell}>
        {(item.cr38e_partnumber as string) || '—'}
      </td>

      {/* Category */}
      <td style={cellStyle}>
        {item.cr38e_category ? (
          <Badge variant="draft" label={item.cr38e_category as string} size="sm" />
        ) : (
          <span style={{ color: colors.textMuted }}>—</span>
        )}
      </td>

      {/* Department */}
      <td style={cellStyle}>
        {dept !== undefined ? (
          <Badge variant="pending" label={deptLabel(dept)} size="sm" />
        ) : (
          <span style={{ color: colors.textMuted }}>—</span>
        )}
      </td>

      {/* Vendor */}
      <td style={mutedCell}>
        {item.cr38e_vendorname ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {item.cr38e_vendorname as string}
            {item.cr38e_vendorlink && (
              <a
                href={item.cr38e_vendorlink as string}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                aria-label="Open vendor link"
                style={{ color: colors.textMuted, lineHeight: 0 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7M7 1h4m0 0v4m0-4L5 7" />
                </svg>
              </a>
            )}
          </span>
        ) : '—'}
      </td>

      {/* UOM */}
      <td style={mutedCell}>
        {uom !== undefined ? uomLabel(uom) : '—'}
      </td>

    </tr>
  );
}
