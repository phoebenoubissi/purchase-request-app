import { useState } from 'react';
import { colors } from '../styles/theme';
import { PageHeader } from '../components/shared/PageHeader';
import { FilterBar } from '../components/shared/FilterBar';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterSelect } from '../components/ui/FilterSelect';
import { SortButton } from '../components/ui/SortButton';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { RequestListItem } from '../components/requests/RequestListItem';
import { usePurchaseRequests } from '../hooks/usePurchaseRequests';
import type { Cr38e_purchaserequests } from '../generated/models/Cr38e_purchaserequestsModel';

export interface RequestsPageProps {
  onSelect: (id: string) => void;
  onNew: () => void;
}

const STATUS_OPTIONS = [
  { value: '100000000', label: 'Draft' },
  { value: '100000001', label: 'Submitted' },
  { value: '100000002', label: 'In Review' },
  { value: '100000003', label: 'Approved' },
  { value: '100000004', label: 'Rejected' },
  { value: '100000005', label: 'Cancelled' },
];

type SortDir = 'asc' | 'desc' | null;

function InboxIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  );
}

function toItem(r: Cr38e_purchaserequests) {
  return {
    id:            r.cr38e_purchaserequestid as string,
    porNumber:     (r.cr38e_pornumber as string) ?? '—',
    urgencyLevel:  (r.cr38e_urgencylevel as number) ?? 357090000,
    description:   (r.cr38e_itemdescription as string) ?? '—',
    dueDate:       r.cr38e_duedate as string | undefined,
    requestorName: (r.cr38e_requestorname as string) ?? '—',
    totalAmount:   (r.cr38e_totalamount as number) ?? 0,
  };
}

function cycleDir(d: SortDir): SortDir {
  if (d === null) return 'asc';
  if (d === 'asc') return 'desc';
  return null;
}

export function RequestsPage({ onSelect, onNew }: RequestsPageProps) {
  const [search,     setSearch]     = useState('');
  const [status,     setStatus]     = useState('');
  const [sortField,  setSortField]  = useState<string | undefined>(undefined);
  const [sortDir,    setSortDir]    = useState<SortDir>(null);
  const [dateDir,    setDateDir]    = useState<SortDir>(null);
  const [amountDir,  setAmountDir]  = useState<SortDir>(null);

  function handleSort(field: string, current: SortDir, setter: (d: SortDir) => void, others: Array<() => void>) {
    const next = cycleDir(current);
    setter(next);
    others.forEach(fn => fn());
    setSortField(next ? field : undefined);
    setSortDir(next);
  }

  const { requests, loading, error } = usePurchaseRequests({
    statusFilter: status ? parseInt(status, 10) : undefined,
    searchText:   search || undefined,
    sortField:    sortField,
    sortDir:      sortDir ?? undefined,
  });

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader
        title="Purchase Requests"
        subtitle="Manage and track all purchase requests"
        actions={
          <Button variant="primary" onClick={onNew}>
            + New Request
          </Button>
        }
      />

      <FilterBar>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search requests…" />
        </div>
        <FilterSelect
          label="All Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
        />
      </FilterBar>

      {/* Sort controls */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '12px',
        paddingLeft: '4px',
      }}>
        <SortButton
          label="Date"
          direction={dateDir}
          onClick={() => handleSort('cr38e_submitteddate', dateDir, setDateDir, [() => setAmountDir(null)])}
        />
        <SortButton
          label="Amount"
          direction={amountDir}
          onClick={() => handleSort('cr38e_totalamount', amountDir, setAmountDir, [() => setDateDir(null)])}
        />
      </div>

      {/* List */}
      {error && (
        <p style={{ color: colors.danger.text, fontSize: '14px', marginBottom: '16px' }}>{error}</p>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}>
          <Spinner size="lg" />
        </div>
      ) : requests.length === 0 ? (
        <EmptyState
          icon={<InboxIcon />}
          title="No requests found"
          message={search || status ? 'Try adjusting your search or filters.' : 'Create your first purchase request to get started.'}
          action={<Button size="sm" onClick={onNew}>New Request</Button>}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {requests.map(r => {
            const item = toItem(r);
            return (
              <RequestListItem
                key={item.id}
                {...item}
                onClick={onSelect}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
