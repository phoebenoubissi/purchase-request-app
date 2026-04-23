import { useState } from 'react';
import { colors, radius, shadow } from '../styles/theme';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { useProjects } from '../hooks/useProjects';
import { useSavePurchaseRequest } from '../hooks/useSavePurchaseRequest';

export interface NewRequestPageProps {
  onBack: () => void;
}

interface LineItem {
  id: number;
  name: string;
  description: string;
  partNumber: string;
  qty: number;
  priceEach: number;
}

const DEPARTMENT_OPTIONS = [
  { value: '0',   label: 'Customer Service' },
  { value: '1',   label: 'Engineering' },
];

const ITEM_TYPE_OPTIONS = [
  { value: '357090000', label: 'Equipment' },
  { value: '357090001', label: 'Supplies' },
  { value: '357090002', label: 'Services' },
  { value: '357090003', label: 'Software' },
  { value: '357090004', label: 'Hardware' },
];

const REQUEST_TYPE_OPTIONS = [
  { value: '357090000', label: 'Standard' },
  { value: '357090001', label: 'Urgent' },
  { value: '357090002', label: 'Capital' },
  { value: '357090003', label: 'Recurring' },
];

const PRIORITY_OPTIONS = [
  { value: '357090000', label: 'Low' },
  { value: '357090001', label: 'Medium' },
  { value: '357090002', label: 'High' },
];

const URGENCY_OPTIONS = [
  { value: '357090000', label: 'Low' },
  { value: '357090001', label: 'Medium' },
  { value: '357090002', label: 'High' },
  { value: '357090003', label: 'Critical' },
];

function getApprovalLevel(total: number): { level: number; label: string } {
  if (total <= 1000)    return { level: 1, label: 'Up to $1,000 — Department Staff' };
  if (total <= 5000)    return { level: 2, label: '$1,001–$5,000 — Department Manager' };
  if (total <= 25000)   return { level: 3, label: '$5,001–$25,000 — Purchasing Manager' };
  if (total <= 100000)  return { level: 4, label: '$25,001–$100,000 — Leadership/Directors' };
  if (total <= 500000)  return { level: 5, label: '$100,001–$500,000 — CEO' };
  return { level: 6, label: 'Over $500,000 — Board Approval' };
}

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '14px',
  color: colors.textPrimary,
  background: colors.background,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  outline: 'none',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: colors.textSecondary,
  marginBottom: '6px',
};

const sectionStyle = {
  background: colors.background,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.lg,
  padding: '24px',
  boxShadow: shadow.sm,
  marginBottom: '20px',
};

const sectionTitleStyle = {
  fontSize: '15px',
  fontWeight: 700,
  color: colors.textPrimary,
  marginBottom: '20px',
  paddingBottom: '12px',
  borderBottom: `1px solid ${colors.border}`,
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: colors.danger.text, marginLeft: '2px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, cursor: 'pointer' }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

let nextId = 1;

export function NewRequestPage({ onBack }: NewRequestPageProps) {
  // Form fields
  const [itemDescription, setItemDescription] = useState('');
  const [department,      setDepartment]      = useState('');
  const [itemType,        setItemType]        = useState('357090000');
  const [requestType,     setRequestType]     = useState('357090000');
  const [priority,        setPriority]        = useState('357090001');
  const [urgency,         setUrgency]         = useState('357090001');
  const [projectId,       setProjectId]       = useState('');
  const [dueDate,         setDueDate]         = useState('');
  const [dateRequired,    setDateRequired]    = useState('');
  const [deliveryLocation,setDeliveryLocation]= useState('');
  const [suppliers,       setSuppliers]       = useState('');
  const [notes,           setNotes]           = useState('');
  const [lineItems,       setLineItems]       = useState<LineItem[]>([
    { id: nextId++, name: '', description: '', partNumber: '', qty: 1, priceEach: 0 },
  ]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { projects, loading: projectsLoading } = useProjects();
  const { save, saving } = useSavePurchaseRequest();

  const totalCost = lineItems.reduce((sum, li) => sum + li.qty * li.priceEach, 0);
  const { level, label: approvalLabel } = getApprovalLevel(totalCost);

  function addLineItem() {
    setLineItems(prev => [
      ...prev,
      { id: nextId++, name: '', description: '', partNumber: '', qty: 1, priceEach: 0 },
    ]);
  }

  function removeLineItem(id: number) {
    setLineItems(prev => prev.filter(li => li.id !== id));
  }

  function updateLineItem(id: number, field: keyof LineItem, value: string | number) {
    setLineItems(prev =>
      prev.map(li => li.id === id ? { ...li, [field]: value } : li)
    );
  }

  async function handleSave(status: number) {
    setSubmitError(null);
    if (!itemDescription.trim()) { setSubmitError('Item Description is required.'); return; }
    if (!dueDate)                 { setSubmitError('Due Date is required.'); return; }
    if (!dateRequired)            { setSubmitError('Date Required is required.'); return; }

    try {
      const payload: Record<string, unknown> = {
        cr38e_itemdescription:    itemDescription,
        cr38e_itemtype:           parseInt(itemType, 10),
        cr38e_portype:            parseInt(requestType, 10),
        cr38e_priority:           parseInt(priority, 10),
        cr38e_urgencylevel:       parseInt(urgency, 10),
        cr38e_duedate:            dueDate,
        cr38e_daterequired:       dateRequired,
        cr38e_deliverylocation:   deliveryLocation,
        cr38e_suppliers:          suppliers,
        cr38e_purchasingnotes:    notes,
        cr38e_totalamount:        totalCost,
        cr38e_totalcosts:         totalCost,
        cr38e_status:             status,
        cr38e_currentlevel:       level,
        cr38e_requiredapprovallevel: level,
        cr38e_creatorapprovallevel:  level,
        cr38e_currentapprovallevel:  1,
        cr38e_purchasestatus:     status === 100000000 ? 0 : 1,
        cr38e_quantityneeded:     lineItems.reduce((s, li) => s + li.qty, 0),
        cr38e_pornumber:          `POR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        cr38e_company:            '',
        cr38e_createdby:          '',
        cr38e_uom:                357090000,
        statecode:                0,
        ownerid:                  '',
        owneridtype:              'systemusers',
      };

      if (department) payload['cr38e_department'] = parseInt(department, 10);
      if (projectId)  payload['cr38e_Project@odata.bind'] = `/cr38e_projects(${projectId})`;
      if (status === 100000001) payload['cr38e_submitteddate'] = new Date().toISOString();

      await save(payload as Parameters<typeof save>[0]);
      onBack();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Save failed.');
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '13px',
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
            New Purchase Request
          </h1>
          <p style={{ fontSize: '13px', color: colors.textSecondary, margin: '2px 0 0' }}>
            Fill in the details below and submit for approval.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

        {/* Left column */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Section 1 — Request Information */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Request Information</div>
            <Field label="Item Description" required>
              <input
                type="text"
                value={itemDescription}
                onChange={e => setItemDescription(e.target.value)}
                placeholder="Short title for this request"
                style={inputStyle}
              />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Department">
                <Select
                  value={department}
                  onChange={setDepartment}
                  options={DEPARTMENT_OPTIONS}
                  placeholder="Select department"
                />
              </Field>
              <Field label="Item Type">
                <Select value={itemType} onChange={setItemType} options={ITEM_TYPE_OPTIONS} />
              </Field>
              <Field label="Request Type">
                <Select value={requestType} onChange={setRequestType} options={REQUEST_TYPE_OPTIONS} />
              </Field>
              <Field label="Priority">
                <Select value={priority} onChange={setPriority} options={PRIORITY_OPTIONS} />
              </Field>
              <Field label="Urgency">
                <Select value={urgency} onChange={setUrgency} options={URGENCY_OPTIONS} />
              </Field>
              <Field label="Project">
                {projectsLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '38px' }}>
                    <Spinner size="sm" />
                    <span style={{ fontSize: '13px', color: colors.textMuted }}>Loading…</span>
                  </div>
                ) : (
                  <select
                    value={projectId}
                    onChange={e => setProjectId(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">No project</option>
                    {projects.map(p => (
                      <option key={p.cr38e_projectid} value={p.cr38e_projectid as string}>
                        {p.cr38e_projectname as string}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          </div>

          {/* Section 2 — Dates & Delivery */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Dates &amp; Delivery</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Due Date" required>
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label="Date Required" required>
                <input
                  type="date"
                  value={dateRequired}
                  onChange={e => setDateRequired(e.target.value)}
                  style={inputStyle}
                />
              </Field>
              <Field label="Delivery Location">
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={e => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Warehouse A, Room 203"
                  style={inputStyle}
                />
              </Field>
              <Field label="Preferred Suppliers">
                <input
                  type="text"
                  value={suppliers}
                  onChange={e => setSuppliers(e.target.value)}
                  placeholder="Vendor names"
                  style={inputStyle}
                />
              </Field>
            </div>
          </div>

          {/* Section 3 — Line Items */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Line Items</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr>
                    {['Name', 'Description', 'Part #', 'Qty', 'Price Each', 'Total', ''].map(h => (
                      <th key={h} style={{
                        textAlign: 'left',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: colors.textSecondary,
                        borderBottom: `1px solid ${colors.border}`,
                        whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((li, idx) => (
                    <tr key={li.id} style={{ background: idx % 2 === 1 ? colors.surface : 'transparent' }}>
                      <td style={{ padding: '6px 10px' }}>
                        <input
                          type="text"
                          value={li.name}
                          onChange={e => updateLineItem(li.id, 'name', e.target.value)}
                          placeholder="Item name"
                          style={{ ...inputStyle, minWidth: '120px' }}
                        />
                      </td>
                      <td style={{ padding: '6px 10px' }}>
                        <input
                          type="text"
                          value={li.description}
                          onChange={e => updateLineItem(li.id, 'description', e.target.value)}
                          placeholder="Description"
                          style={{ ...inputStyle, minWidth: '140px' }}
                        />
                      </td>
                      <td style={{ padding: '6px 10px' }}>
                        <input
                          type="text"
                          value={li.partNumber}
                          onChange={e => updateLineItem(li.id, 'partNumber', e.target.value)}
                          placeholder="Part #"
                          style={{ ...inputStyle, minWidth: '90px' }}
                        />
                      </td>
                      <td style={{ padding: '6px 10px' }}>
                        <input
                          type="number"
                          min="1"
                          value={li.qty}
                          onChange={e => updateLineItem(li.id, 'qty', parseFloat(e.target.value) || 0)}
                          style={{ ...inputStyle, minWidth: '60px', width: '70px' }}
                        />
                      </td>
                      <td style={{ padding: '6px 10px' }}>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={li.priceEach}
                          onChange={e => updateLineItem(li.id, 'priceEach', parseFloat(e.target.value) || 0)}
                          style={{ ...inputStyle, minWidth: '90px', width: '100px' }}
                        />
                      </td>
                      <td style={{ padding: '6px 10px', whiteSpace: 'nowrap', color: colors.textPrimary, fontWeight: 600 }}>
                        ${(li.qty * li.priceEach).toFixed(2)}
                      </td>
                      <td style={{ padding: '6px 10px' }}>
                        <button
                          onClick={() => removeLineItem(li.id)}
                          disabled={lineItems.length === 1}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: lineItems.length === 1 ? 'not-allowed' : 'pointer',
                            color: lineItems.length === 1 ? colors.textMuted : colors.danger.text,
                            fontSize: '16px',
                            padding: '4px',
                            opacity: lineItems.length === 1 ? 0.4 : 1,
                          }}
                          title="Remove row"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Button variant="secondary" size="sm" onClick={addLineItem}>
                + Add Item
              </Button>
            </div>
          </div>

          {/* Section 4 — Additional Notes */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Additional Notes</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any additional context, notes, or instructions…"
              rows={5}
              style={{
                ...inputStyle,
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: '1.5',
              }}
            />
          </div>
        </div>

        {/* Right sidebar — sticky summary */}
        <div style={{
          width: '280px',
          flexShrink: 0,
          position: 'sticky',
          top: '80px',
        }}>
          <div style={{
            background: colors.background,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.lg,
            padding: '24px',
            boxShadow: shadow.md,
          }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary, marginBottom: '20px' }}>
              Summary
            </div>

            {/* Total Cost */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary, marginBottom: '4px' }}>
                TOTAL COST
              </div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary }}>
                ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Line item count */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderTop: `1px solid ${colors.border}`,
            }}>
              <span style={{ fontSize: '13px', color: colors.textSecondary }}>Line Items</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 700,
                color: colors.textPrimary,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.full,
                padding: '2px 10px',
              }}>
                {lineItems.length}
              </span>
            </div>

            {/* Approval Level */}
            <div style={{
              padding: '12px 0',
              borderTop: `1px solid ${colors.border}`,
              marginBottom: '20px',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary, marginBottom: '8px' }}>
                APPROVAL LEVEL REQUIRED
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '6px',
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: colors.primary.bg,
                  color: colors.primary.text,
                  fontSize: '15px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {level}
                </span>
                <span style={{ fontSize: '12px', color: colors.textSecondary, lineHeight: '1.4' }}>
                  {approvalLabel}
                </span>
              </div>
            </div>

            {/* Error */}
            {submitError && (
              <div style={{
                background: colors.danger.bg,
                color: colors.danger.text,
                fontSize: '12px',
                padding: '10px 12px',
                borderRadius: radius.md,
                marginBottom: '12px',
                lineHeight: '1.4',
              }}>
                {submitError}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button
                variant="primary"
                loading={saving}
                onClick={() => handleSave(100000001)}
              >
                Submit for Approval
              </Button>
              <Button
                variant="secondary"
                loading={saving}
                onClick={() => handleSave(100000000)}
              >
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
