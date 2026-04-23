import { useState, useCallback } from 'react';
import { colors, radius, shadow } from '../styles/theme';
import { Button } from '../components/ui/Button';
import { FilterSelect } from '../components/ui/FilterSelect';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { useMyApprovals } from '../hooks/useMyApprovals';
import { Cr38e_purchaserequestapprovalsService } from '../generated/services/Cr38e_purchaserequestapprovalsService';
import type { Cr38e_purchaserequestapprovals } from '../generated/models/Cr38e_purchaserequestapprovalsModel';

export interface BulkApprovalsPageProps {
  onBack: () => void;
  onSelect: (id: string) => void;
}

const LEVEL_OPTIONS = [
  { value: '1', label: 'Level 1 — Department Staff' },
  { value: '2', label: 'Level 2 — Department Manager' },
  { value: '3', label: 'Level 3 — Purchasing Manager' },
  { value: '4', label: 'Level 4 — Leadership / Director' },
  { value: '5', label: 'Level 5 — CEO' },
  { value: '6', label: 'Level 6 — Board Approval' },
];

const DEPARTMENT_OPTIONS = [
  { value: '0', label: 'Customer Service' },
  { value: '1', label: 'Engineering' },
];

const URGENCY_COLORS: Record<number, { bg: string; text: string; label: string }> = {
  357090000: { bg: colors.low.bg,      text: colors.low.text,      label: 'Low' },
  357090001: { bg: colors.medium.bg,   text: colors.medium.text,   label: 'Medium' },
  357090002: { bg: colors.high.bg,     text: colors.high.text,     label: 'High' },
  357090003: { bg: colors.critical.bg, text: colors.critical.text, label: 'Critical' },
};

function levelLabel(level: number): string {
  switch (level) {
    case 1: return 'Department Staff';
    case 2: return 'Department Manager';
    case 3: return 'Purchasing Manager';
    case 4: return 'Leadership / Director';
    case 5: return 'CEO';
    case 6: return 'Board Approval';
    default: return `Level ${level} Approver`;
  }
}

function levelBgColor(level: number): string {
  switch (level) {
    case 1: return '#6b7280';
    case 2: return '#f97316';
    case 3: return '#22c55e';
    case 4: return '#ef4444';
    case 5: return '#111827';
    case 6: return '#8b5cf6';
    default: return '#6b7280';
  }
}

function formatCurrency(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function ChecklistIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

function toRow(a: Cr38e_purchaserequestapprovals) {
  return {
    id:             a.cr38e_purchaserequestapprovalid as string,
    porNumber:      (a.cr38e_approvalname as string) ?? '—',
    level:          (a.cr38e_level as number) ?? 1,
    description:    (a.cr38e_approvalname as string) ?? '—',
    requiredDate:   (a.cr38e_approvaldate as string) ?? '',
    urgency:        357090001 as number,
    totalAmount:    0,
    approvalStatus: (a.cr38e_approvalstatus as number) ?? 357090000,
  };
}

export function BulkApprovalsPage({ onBack, onSelect }: BulkApprovalsPageProps) {
  const [levelFilter, setLevelFilter] = useState('');
  const [, setDeptFilter] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const { pending, loading, error, refetch } = useMyApprovals(
    levelFilter ? Number(levelFilter) : undefined
  );

  const rows = pending.map(toRow);

  const selectedRows = rows.filter(r => selected.has(r.id));
  const selectedTotal = selectedRows.reduce((s, r) => s + r.totalAmount, 0);

  function toggleRow(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === rows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(rows.map(r => r.id)));
    }
  }

  function clearSelection() {
    setSelected(new Set());
  }

  const bulkUpdate = useCallback(async (approvalStatus: number) => {
    setProcessing(true);
    setActionError(null);
    const ids = [...selected];
    try {
      await Promise.all(
        ids.map(id =>
          Cr38e_purchaserequestapprovalsService.update(id, {
            cr38e_approvalstatus: approvalStatus as never,
          })
        )
      );
      setSelected(new Set());
      refetch();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Action failed.');
    } finally {
      setProcessing(false);
    }
  }, [selected, refetch]);

  return (
    <div style={{ padding: '24px' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 4px' }}>
            Bulk Approvals
          </h1>
          <p style={{ fontSize: '13px', color: colors.textSecondary, margin: 0 }}>
            Process multiple approval requests at once
          </p>
        </div>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '13px',
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ← Back to My Approvals
        </button>
      </div>

      {/* Selection summary bar */}
      {selected.size > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.lg,
          marginBottom: '20px',
          boxShadow: shadow.sm,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>
            {selected.size} request{selected.size !== 1 ? 's' : ''} selected
          </span>
          {selectedTotal > 0 && (
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>
              · Total: {formatCurrency(selectedTotal)}
            </span>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={clearSelection}
              style={{
                background: 'none',
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                padding: '5px 12px',
                cursor: 'pointer',
                fontSize: '13px',
                color: colors.textSecondary,
              }}
            >
              Clear Selection
            </button>
            <Button
              variant="secondary"
              size="sm"
              loading={processing}
              onClick={() => bulkUpdate(357090002)}
            >
              <span style={{ color: colors.danger.text }}>✕ Reject All</span>
            </Button>
            <button
              disabled={processing}
              onClick={() => bulkUpdate(357090001)}
              style={{
                background: '#22c55e',
                border: 'none',
                borderRadius: radius.md,
                padding: '5px 14px',
                cursor: processing ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                opacity: processing ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {processing ? '…' : '✓ Approve All'}
            </button>
          </div>
        </div>
      )}

      {/* Action error */}
      {actionError && (
        <div style={{
          background: colors.danger.bg,
          color: colors.danger.text,
          fontSize: '13px',
          padding: '10px 14px',
          borderRadius: radius.md,
          marginBottom: '16px',
        }}>
          {actionError}
        </div>
      )}

      {/* Filter row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <FilterSelect
          label="All Levels"
          options={LEVEL_OPTIONS}
          value={levelFilter}
          onChange={setLevelFilter}
        />
        <FilterSelect
          label="All Departments"
          options={DEPARTMENT_OPTIONS}
          value=""
          onChange={setDeptFilter}
        />
        <span style={{ marginLeft: 'auto', fontSize: '13px', color: colors.textSecondary, whiteSpace: 'nowrap' }}>
          {loading ? '—' : rows.length} pending approval{rows.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Pending section */}
      <div style={{
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        boxShadow: shadow.sm,
        overflow: 'hidden',
      }}>
        {/* Section header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: `1px solid ${colors.border}`,
          background: colors.surface,
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>
            Pending Approvals
          </span>
          {!loading && rows.length > 0 && (
            <button
              onClick={toggleAll}
              style={{
                background: 'none',
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textSecondary,
              }}
            >
              {selected.size === rows.length ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <Spinner size="lg" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ padding: '24px', color: colors.danger.text, fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && rows.length === 0 && (
          <div style={{ padding: '40px' }}>
            <EmptyState
              icon={<ChecklistIcon />}
              title="No pending approvals"
              message={levelFilter ? 'No pending approvals at this level.' : "You're all caught up."}
            />
          </div>
        )}

        {/* Rows */}
        {!loading && !error && rows.length > 0 && (
          <div>
            {rows.map((row, idx) => {
              const isSelected = selected.has(row.id);
              const urgencyMeta = URGENCY_COLORS[row.urgency] ?? URGENCY_COLORS[357090001];
              return (
                <div
                  key={row.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 20px',
                    borderBottom: idx < rows.length - 1 ? `1px solid ${colors.border}` : 'none',
                    background: isSelected ? '#f0fdf4' : 'transparent',
                    transition: 'background 0.1s',
                  }}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRow(row.id)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0 }}
                  />

                  {/* Level badge */}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: levelBgColor(row.level),
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {row.level}
                  </span>

                  {/* Main info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: colors.textPrimary }}>{row.porNumber}</span>
                      <span style={{ fontSize: '12px', color: colors.textMuted }}>·</span>
                      <span style={{ fontSize: '12px', color: colors.textSecondary }}>{levelLabel(row.level)}</span>
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: colors.textSecondary,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {row.description}
                    </p>
                    {row.requiredDate && (
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: colors.textMuted }}>
                        Required: {new Date(row.requiredDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Right side */}
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: radius.full,
                      background: urgencyMeta.bg,
                      color: urgencyMeta.text,
                    }}>
                      {urgencyMeta.label}
                    </span>
                    {row.totalAmount > 0 && (
                      <span style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>
                        {formatCurrency(row.totalAmount)}
                      </span>
                    )}
                    <Badge variant="pending" label="Pending Approval" size="sm" />
                    <button
                      onClick={() => onSelect(row.id)}
                      style={{
                        background: 'none',
                        border: `1px solid ${colors.border}`,
                        borderRadius: radius.md,
                        padding: '4px 10px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: colors.textSecondary,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
