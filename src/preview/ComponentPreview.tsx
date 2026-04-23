import React, { useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterSelect } from '../components/ui/FilterSelect';
import { SortButton } from '../components/ui/SortButton';
import { Avatar } from '../components/ui/Avatar';
import { ViewToggle } from '../components/ui/ViewToggle';
import { Checkbox } from '../components/ui/Checkbox';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { TopNav } from '../components/shared/TopNav';
import { PageHeader } from '../components/shared/PageHeader';
import { StatCard } from '../components/shared/StatCard';
import { FilterBar } from '../components/shared/FilterBar';
import { Tabs } from '../components/shared/Tabs';
import { RequestListItem } from '../components/requests/RequestListItem';
import { ApprovalListItem } from '../components/approvals/ApprovalListItem';
import { CatalogRow } from '../components/catalog/CatalogRow';
import { CatalogTable } from '../components/catalog/CatalogTable';
import { ProjectCard } from '../components/projects/ProjectCard';
import { PendingApprovalsSection } from '../components/dashboard/PendingApprovalsSection';
import { RecentRequestsSection } from '../components/dashboard/RecentRequestsSection';

const DEMO_OPTIONS = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

function BadgePreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Status variants</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {(['critical','high','medium','low','pending','approved','rejected','draft','completed','submitted','in-review','cancelled'] as const).map(v => (
            <Badge key={v} variant={v} label={v} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge variant="approved" label="sm" size="sm" />
          <Badge variant="approved" label="md" size="md" />
        </div>
      </div>
    </div>
  );
}

function ButtonPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Variants</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>States</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button disabled variant="secondary">Disabled Secondary</Button>
        </div>
      </div>
    </div>
  );
}

function SearchBarPreview() {
  const [val, setVal] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <SearchBar value={val} onChange={setVal} placeholder="Search requests..." />
      <p style={{ fontSize: 12, color: '#9ca3af' }}>Value: "{val}"</p>
    </div>
  );
}

function FilterSelectPreview() {
  const [val, setVal] = useState('');
  const [valSm, setValSm] = useState('');
  const [valDis, setValDis] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Variants</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <FilterSelect label="All Status" options={DEMO_OPTIONS} value={val} onChange={setVal} variant="primary" />
          <FilterSelect label="All Status" options={DEMO_OPTIONS} value={val} onChange={setVal} variant="success" />
          <FilterSelect label="All Status" options={DEMO_OPTIONS} value={val} onChange={setVal} variant="danger" />
          <FilterSelect label="All Status" options={DEMO_OPTIONS} value={val} onChange={setVal} variant="warning" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <FilterSelect label="Small" options={DEMO_OPTIONS} value={valSm} onChange={setValSm} size="sm" />
          <FilterSelect label="Medium" options={DEMO_OPTIONS} value={val} onChange={setVal} size="md" />
          <FilterSelect label="Large" options={DEMO_OPTIONS} value={val} onChange={setVal} size="lg" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Disabled</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <FilterSelect label="Disabled" options={DEMO_OPTIONS} value={valDis} onChange={setValDis} disabled />
        </div>
      </div>
    </div>
  );
}

function SortButtonPreview() {
  const [dir1, setDir1] = useState<'asc' | 'desc' | null>(null);
  const [dir2, setDir2] = useState<'asc' | 'desc' | null>('asc');
  const [dir3, setDir3] = useState<'asc' | 'desc' | null>('desc');

  function cycle(d: 'asc' | 'desc' | null): 'asc' | 'desc' | null {
    if (d === null) return 'asc';
    if (d === 'asc') return 'desc';
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>States (click to cycle)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <SortButton label="Date" direction={dir1} onClick={() => setDir1(cycle(dir1))} />
          <SortButton label="Amount" direction={dir2} onClick={() => setDir2(cycle(dir2))} />
          <SortButton label="Name" direction={dir3} onClick={() => setDir3(cycle(dir3))} />
        </div>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>null · asc · desc</p>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <SortButton label="Small" direction="asc" onClick={() => {}} size="sm" />
          <SortButton label="Medium" direction="asc" onClick={() => {}} size="md" />
          <SortButton label="Large" direction="asc" onClick={() => {}} size="lg" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Disabled</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <SortButton label="Disabled" direction={null} onClick={() => {}} disabled />
          <SortButton label="Disabled Asc" direction="asc" onClick={() => {}} disabled />
        </div>
      </div>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Variants</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Avatar level={1} variant="primary" />
          <Avatar level={2} variant="secondary" />
          <Avatar level={3} variant="success" />
          <Avatar level={4} variant="danger" />
          <Avatar level={5} variant="warning" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Avatar level={5} size="sm" />
          <Avatar level={5} size="md" />
          <Avatar level={5} size="lg" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Disabled</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Avatar level={3} disabled />
          <Avatar level={3} variant="success" disabled />
        </div>
      </div>
    </div>
  );
}

function ViewTogglePreview() {
  const [view1, setView1] = useState<'grid' | 'list'>('grid');
  const [view2, setView2] = useState<'grid' | 'list'>('list');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Interactive (click to toggle)</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ViewToggle view={view1} onChange={setView1} />
          <span style={{ fontSize: 12, color: '#9ca3af' }}>Active: {view1}</span>
          <ViewToggle view={view2} onChange={setView2} />
          <span style={{ fontSize: 12, color: '#9ca3af' }}>Active: {view2}</span>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ViewToggle view="grid" onChange={() => {}} size="sm" />
          <ViewToggle view="grid" onChange={() => {}} size="md" />
          <ViewToggle view="grid" onChange={() => {}} size="lg" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Disabled</p>
        <ViewToggle view="grid" onChange={() => {}} disabled />
      </div>
    </div>
  );
}

function CheckboxPreview() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>States (click to toggle)</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13 }}>
            <Checkbox checked={a} onChange={setA} /> Unchecked
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13 }}>
            <Checkbox checked={b} onChange={setB} /> Checked
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13 }}>
            <Checkbox checked={c} onChange={setC} indeterminate /> Indeterminate
          </label>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Variants</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Checkbox checked variant="primary"   onChange={() => {}} />
          <Checkbox checked variant="secondary" onChange={() => {}} />
          <Checkbox checked variant="success"   onChange={() => {}} />
          <Checkbox checked variant="danger"    onChange={() => {}} />
          <Checkbox checked variant="warning"   onChange={() => {}} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Checkbox checked size="sm" onChange={() => {}} />
          <Checkbox checked size="md" onChange={() => {}} />
          <Checkbox checked size="lg" onChange={() => {}} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Disabled</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Checkbox checked={false} disabled onChange={() => {}} />
          <Checkbox checked disabled onChange={() => {}} />
          <Checkbox checked={false} indeterminate disabled onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}

function SpinnerPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Variants</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <Spinner variant="primary" />
          <Spinner variant="secondary" />
          <Spinner variant="success" />
          <Spinner variant="danger" />
          <Spinner variant="warning" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Sizes</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Disabled</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Spinner disabled />
          <Spinner variant="success" disabled />
        </div>
      </div>
    </div>
  );
}

const CATALOG_HEADERS = ['', 'Image', 'Catalog #', 'Description', 'Part #', 'Category', 'Department', 'Vendor', 'UOM'];

const SAMPLE_ITEMS = [
  { cr38e_masterorderingcatalogid: '1', cr38e_catalognumber: 'CAT-001', cr38e_description: 'Dell XPS 15 Laptop 16GB RAM 512GB SSD', cr38e_partnumber: 'XPS15-9520', cr38e_category: 'Hardware', cr38e_vendorname: 'Dell', cr38e_vendorlink: 'https://dell.com', cr38e_imageurl: null, cr38e_department: 357090000, cr38e_um: 357090000 },
  { cr38e_masterorderingcatalogid: '2', cr38e_catalognumber: 'CAT-002', cr38e_description: 'A4 Copy Paper 80gsm 500 sheets', cr38e_partnumber: 'PPR-A4-80', cr38e_category: 'Office Supplies', cr38e_vendorname: 'Staples', cr38e_vendorlink: null, cr38e_imageurl: null, cr38e_department: 357090001, cr38e_um: 357090001 },
  { cr38e_masterorderingcatalogid: '3', cr38e_catalognumber: 'CAT-003', cr38e_description: 'Adobe Creative Cloud Annual Licence', cr38e_partnumber: 'ADO-CC-ANN', cr38e_category: 'Software', cr38e_vendorname: 'Adobe', cr38e_vendorlink: 'https://adobe.com', cr38e_imageurl: null, cr38e_department: 357090004, cr38e_um: 357090009 },
];

const SAMPLE_REQUESTS = [
  { id: '1', porNumber: 'POR-2026-001', urgencyLevel: 357090003, description: 'Emergency server replacement for production environment', dueDate: '2026-04-30', requestorName: 'Alice Johnson', totalAmount: 24500 },
  { id: '2', porNumber: 'POR-2026-002', urgencyLevel: 357090002, description: 'Office supplies and stationery restock Q2', dueDate: '2026-05-15', requestorName: 'Bob Smith', totalAmount: 1250 },
  { id: '3', porNumber: 'POR-2026-003', urgencyLevel: 357090001, description: 'Software licences for engineering team — annual renewal', dueDate: '2026-06-01', requestorName: 'Carol White', totalAmount: 8750 },
  { id: '4', porNumber: 'POR-2026-004', urgencyLevel: 357090000, description: 'Conference room chairs (12 units)', dueDate: '2026-07-01', requestorName: 'David Lee', totalAmount: 3600 },
  { id: '5', porNumber: 'POR-2026-005', urgencyLevel: 357090001, description: 'Replacement laptop — engineering', requestorName: 'Eve Martinez', totalAmount: 1899 },
];

function RecentRequestsSectionPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 700 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With requests</p>
        <RecentRequestsSection requests={SAMPLE_REQUESTS} onViewAll={() => {}} onSelect={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Loading state</p>
        <RecentRequestsSection requests={[]} loading onViewAll={() => {}} onSelect={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Empty state</p>
        <RecentRequestsSection requests={[]} onViewAll={() => {}} onSelect={() => {}} />
      </div>
    </div>
  );
}

const SAMPLE_APPROVALS = [
  { id: '1', level: 2, approver: 'Sarah Connor',  porNumber: 'POR-2026-001', description: 'Emergency server replacement', totalAmount: 24500,  approvalStatus: 357090000 },
  { id: '2', level: 3, approver: 'John Smith',    porNumber: 'POR-2026-003', description: 'Software licences — annual renewal', totalAmount: 8750, approvalStatus: 357090000 },
  { id: '3', level: 1, approver: 'Maria Garcia',  porNumber: 'POR-2026-005', description: 'Office chairs (12 units)',  totalAmount: 3600,  approvalStatus: 357090003 },
];

function PendingApprovalsSectionPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With approvals</p>
        <PendingApprovalsSection approvals={SAMPLE_APPROVALS} onSelect={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Loading state</p>
        <PendingApprovalsSection approvals={[]} loading onSelect={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Empty state</p>
        <PendingApprovalsSection approvals={[]} onSelect={() => {}} />
      </div>
    </div>
  );
}

function ProjectCardPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>All phases (2-column grid)</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <ProjectCard id="1" name="ERP System Upgrade"      projectType={357090000} description="Full migration from legacy ERP to Microsoft Dynamics 365. Includes data migration, staff training, and phased rollout across all departments." phase={357090000} onClick={() => {}} />
          <ProjectCard id="2" name="Customer Portal v2"      projectType={357090001} description="Redesign and rebuild of the customer-facing self-service portal with improved UX and mobile support." phase={357090001} onClick={() => {}} />
          <ProjectCard id="3" name="Warehouse Automation"    projectType={357090002} description="Installation of automated picking and packing systems to reduce manual labour and improve throughput." phase={357090002} onClick={() => {}} />
          <ProjectCard id="4" name="ISO 27001 Certification" projectType={357090003} description="Achieve ISO 27001 information security certification by end of Q3. Covers policy, controls, and audit." phase={357090003} onClick={() => {}} />
          <ProjectCard id="5" name="Cloud Infrastructure"   projectType={357090000} description="Migrate all on-premise servers to Azure. Improve availability, reduce hardware costs, and enable remote access." phase={357090004} onClick={() => {}} />
          <ProjectCard id="6" name="Legacy App Retirement"   projectType={357090003} description="Decommission the 2008 inventory system after successful ERP migration. Archive all historical data." phase={357090005} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

function CatalogTablePreview() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With items (select-all + row selection)</p>
        <CatalogTable items={SAMPLE_ITEMS as never} selectedIds={selected} onSelectionChange={setSelected} />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Empty state</p>
        <CatalogTable items={[]} selectedIds={new Set()} onSelectionChange={() => {}} />
      </div>
    </div>
  );
}

function CatalogRowPreview() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string, checked: boolean) => {
    setSelected(prev => { const s = new Set(prev); checked ? s.add(id) : s.delete(id); return s; });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 0 }}>Table rows (click checkboxes)</p>
      <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {CATALOG_HEADERS.map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ITEMS.map(item => (
              <CatalogRow
                key={item.cr38e_masterorderingcatalogid}
                item={item as never}
                selected={selected.has(item.cr38e_masterorderingcatalogid)}
                onSelect={toggle}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12, color: '#9ca3af' }}>Selected: {selected.size > 0 ? [...selected].join(', ') : 'none'}</p>
    </div>
  );
}

function ApprovalListItemPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>All statuses</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ApprovalListItem id="1" level={1} approver="Sarah Connor" porNumber="POR-2026-001" description="Emergency server replacement for production" totalAmount={24500} approvalStatus={357090000} onClick={() => {}} />
          <ApprovalListItem id="2" level={2} approver="John Smith"   porNumber="POR-2026-002" description="Office supplies and stationery restock Q2" totalAmount={1250}  approvalStatus={357090001} onClick={() => {}} />
          <ApprovalListItem id="3" level={3} approver="Maria Garcia" porNumber="POR-2026-003" description="Software licences — annual renewal"        totalAmount={8750}  approvalStatus={357090002} onClick={() => {}} />
          <ApprovalListItem id="4" level={4} approver="Tom Baker"    porNumber="POR-2026-004" description="Conference room furniture replacement"     totalAmount={42000} approvalStatus={357090003} onClick={() => {}} />
          <ApprovalListItem id="5" level={5} approver="CEO Office"   porNumber="POR-2026-005" description="Capital equipment — manufacturing line"    totalAmount={125000} approvalStatus={357090004} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

function RequestListItemPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>All urgency levels</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RequestListItem id="1" porNumber="POR-2026-001" urgencyLevel={357090003} description="Emergency server replacement for production environment" dueDate="2026-04-30" requestorName="Alice Johnson" totalAmount={24500} onClick={() => {}} />
          <RequestListItem id="2" porNumber="POR-2026-002" urgencyLevel={357090002} description="Office supplies and stationery restock Q2" dueDate="2026-05-15" requestorName="Bob Smith" totalAmount={1250} onClick={() => {}} />
          <RequestListItem id="3" porNumber="POR-2026-003" urgencyLevel={357090001} description="Software licences for engineering team — annual renewal" dueDate="2026-06-01" requestorName="Carol White" totalAmount={8750} onClick={() => {}} />
          <RequestListItem id="4" porNumber="POR-2026-004" urgencyLevel={357090000} description="Conference room chairs (12 units)" dueDate="2026-07-01" requestorName="David Lee" totalAmount={3600} onClick={() => {}} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>No due date</p>
        <RequestListItem id="5" porNumber="POR-2026-005" urgencyLevel={357090001} description="Replacement laptop — engineering" requestorName="Eve Martinez" totalAmount={1899} onClick={() => {}} />
      </div>
    </div>
  );
}

function TabsPreview() {
  const [active1, setActive1] = useState('pending');
  const [active2, setActive2] = useState('pending');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With counts (Approvals page)</p>
        <Tabs
          activeKey={active1}
          onChange={setActive1}
          tabs={[
            { key: 'pending',   label: 'Pending',   count: 3 },
            { key: 'completed', label: 'Completed', count: 18 },
          ]}
        />
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>Active: {active1}</p>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Without counts</p>
        <Tabs
          activeKey={active2}
          onChange={setActive2}
          tabs={[
            { key: 'pending',  label: 'Pending' },
            { key: 'approved', label: 'Approved' },
            { key: 'rejected', label: 'Rejected' },
          ]}
        />
      </div>
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: '100000001', label: 'Submitted' },
  { value: '100000002', label: 'In Review' },
  { value: '100000003', label: 'Approved' },
  { value: '100000004', label: 'Rejected' },
];
const DEPT_OPTIONS = [
  { value: '0', label: 'Customer Service' },
  { value: '1', label: 'Engineering' },
];

function FilterBarPreview() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dept,   setDept]   = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Requests page filter bar</p>
        <FilterBar>
          <div style={{ flex: 1, minWidth: 200 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search requests..." />
          </div>
          <FilterSelect label="All Status"      options={STATUS_OPTIONS} value={status} onChange={setStatus} />
          <FilterSelect label="All Departments" options={DEPT_OPTIONS}   value={dept}   onChange={setDept}   />
        </FilterBar>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Search only (Projects page)</p>
        <FilterBar>
          <div style={{ flex: 1, minWidth: 200 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search projects..." />
          </div>
        </FilterBar>
      </div>
    </div>
  );
}

const TotalIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const PendingIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const ApprovedIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const RejectedIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
const ValueIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;

function StatCardPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Dashboard row (all 5 variants)</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          <StatCard label="Total Requests" value={42}         icon={<TotalIcon />}    variant="default" />
          <StatCard label="Pending"        value={8}          icon={<PendingIcon />}  variant="warning" />
          <StatCard label="Approved"       value={29}         icon={<ApprovedIcon />} variant="success" />
          <StatCard label="Rejected"       value={5}          icon={<RejectedIcon />} variant="danger"  />
          <StatCard label="Total Value"    value="$124,350"   icon={<ValueIcon />}    variant="info"    />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Approvals row (3 cards)</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <StatCard label="Pending Approvals" value={3}  icon={<PendingIcon />}  variant="warning" />
          <StatCard label="Approved"          value={18} icon={<ApprovedIcon />} variant="success" />
          <StatCard label="Rejected"          value={2}  icon={<RejectedIcon />} variant="danger"  />
        </div>
      </div>
    </div>
  );
}

function PageHeaderPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Title only</p>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 24 }}>
          <PageHeader title="Purchase Requests" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With subtitle</p>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 24 }}>
          <PageHeader title="Dashboard" subtitle="Welcome back — here's what's happening" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With actions</p>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 24 }}>
          <PageHeader
            title="Purchase Requests"
            subtitle="Manage and track all purchase requests"
            actions={<>
              <Button variant="secondary" size="sm">Export</Button>
              <Button variant="primary" size="sm">New Request</Button>
            </>}
          />
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { key: 'requests',  label: 'Requests',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { key: 'catalog',   label: 'Catalog',   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
  { key: 'approvals', label: 'Approvals', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
  { key: 'projects',  label: 'Projects',  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
];

function TopNavPreview() {
  const [active, setActive] = useState('dashboard');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With subtitle (click tabs)</p>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <TopNav
            appName="Purchase Request Manager"
            subtitle="Dev Environment"
            navItems={NAV_ITEMS}
            activeKey={active}
            onNavigate={setActive}
          />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Without subtitle</p>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <TopNav
            appName="Purchase Request Manager"
            navItems={NAV_ITEMS}
            activeKey="requests"
            onNavigate={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

const InboxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
  </svg>
);

function EmptyStatePreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>With icon, message, and action</p>
        <EmptyState
          icon={<InboxIcon />}
          title="No purchase requests"
          message="There are no requests matching your filters. Try adjusting your search or create a new request."
          action={<Button size="sm">New Request</Button>}
        />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Title only</p>
        <EmptyState title="Nothing to show" />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Variants</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <EmptyState icon={<InboxIcon />} title="Success variant" variant="success" size="sm" />
          <EmptyState icon={<InboxIcon />} title="Danger variant"  variant="danger"  size="sm" />
          <EmptyState icon={<InboxIcon />} title="Warning variant" variant="warning" size="sm" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Disabled</p>
        <EmptyState icon={<InboxIcon />} title="Disabled state" message="Nothing here." disabled size="sm" />
      </div>
    </div>
  );
}

const sections: { title: string; element: React.ReactNode }[] = [
  { title: 'Badge',        element: <BadgePreview /> },
  { title: 'Button',       element: <ButtonPreview /> },
  { title: 'SearchBar',    element: <SearchBarPreview /> },
  { title: 'FilterSelect', element: <FilterSelectPreview /> },
  { title: 'SortButton',   element: <SortButtonPreview /> },
  { title: 'Avatar',       element: <AvatarPreview /> },
  { title: 'ViewToggle',   element: <ViewTogglePreview /> },
  { title: 'Checkbox',     element: <CheckboxPreview /> },
  { title: 'Spinner',      element: <SpinnerPreview /> },
  { title: 'EmptyState',   element: <EmptyStatePreview /> },
  { title: 'TopNav',       element: <TopNavPreview /> },
  { title: 'PageHeader',   element: <PageHeaderPreview /> },
  { title: 'StatCard',     element: <StatCardPreview /> },
  { title: 'FilterBar',    element: <FilterBarPreview /> },
  { title: 'Tabs',             element: <TabsPreview /> },
  { title: 'RequestListItem',  element: <RequestListItemPreview /> },
  { title: 'ApprovalListItem', element: <ApprovalListItemPreview /> },
  { title: 'CatalogRow',       element: <CatalogRowPreview /> },
  { title: 'CatalogTable',     element: <CatalogTablePreview /> },
  { title: 'ProjectCard',             element: <ProjectCardPreview /> },
  { title: 'PendingApprovalsSection',  element: <PendingApprovalsSectionPreview /> },
  { title: 'RecentRequestsSection',    element: <RecentRequestsSectionPreview /> },
];

export function ComponentPreview() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <div style={{ width: 200, background: '#f9fafb', borderRight: '1px solid #e5e7eb', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 16px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: '#9ca3af' }}>
          Components
        </div>
        {sections.map(s => (
          <button
            key={s.title}
            onClick={() => setActive(s.title)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '8px 16px', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: active === s.title ? 600 : 400,
              background: active === s.title ? '#e5e7eb' : 'transparent',
              color: active === s.title ? '#111827' : '#374151',
            }}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, padding: 40, background: '#ffffff' }}>
        {active === null && (
          <div style={{ color: '#9ca3af', marginTop: 40, textAlign: 'center' }}>
            ← Select a component
          </div>
        )}
        {sections.filter(s => s.title === active).map(s => (
          <div key={s.title}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 24 }}>{s.title}</h2>
            {s.element}
          </div>
        ))}
      </div>
    </div>
  );
}
