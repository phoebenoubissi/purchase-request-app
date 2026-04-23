export const colors = {
  background:   '#ffffff',
  surface:      '#f9fafb',
  border:       '#e5e7eb',
  borderHover:  '#d1d5db',

  textPrimary:   '#111827',
  textSecondary: '#6b7280',
  textMuted:     '#9ca3af',
  textInverse:   '#ffffff',

  primary:   { bg: '#111827', text: '#ffffff', hover: '#1f2937' },
  secondary: { bg: '#ffffff', text: '#111827', border: '#e5e7eb', hover: '#f9fafb' },
  success:   { bg: '#f0fdf4', text: '#22c55e', solid: '#22c55e' },
  danger:    { bg: '#fef2f2', text: '#ef4444', solid: '#ef4444' },
  warning:   { bg: '#fff7ed', text: '#f97316', solid: '#f97316' },
  info:      { bg: '#eff6ff', text: '#3b82f6', solid: '#3b82f6' },

  critical:  { bg: '#fef2f2', text: '#ef4444' },
  high:      { bg: '#fff7ed', text: '#f97316' },
  medium:    { bg: '#fefce8', text: '#eab308' },
  low:       { bg: '#f3f4f6', text: '#6b7280' },

  pending:   { bg: '#fffbeb', text: '#d97706' },
  approved:  { bg: '#f0fdf4', text: '#22c55e' },
  rejected:  { bg: '#fef2f2', text: '#ef4444' },
  draft:     { bg: '#f3f4f6', text: '#6b7280' },
  completed: { bg: '#eff6ff', text: '#3b82f6' },
  submitted: { bg: '#f5f3ff', text: '#8b5cf6' },
  inReview:  { bg: '#f0f9ff', text: '#0ea5e9' },
  cancelled: { bg: '#f3f4f6', text: '#6b7280' },
};

export const sizes = {
  sm: { fontSize: '11px', padding: '4px 10px',  height: '28px', iconSize: '14px' },
  md: { fontSize: '13px', padding: '8px 16px',  height: '36px', iconSize: '16px' },
  lg: { fontSize: '15px', padding: '10px 20px', height: '44px', iconSize: '18px' },
};

export const radius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  full: '9999px',
};

export const shadow = {
  sm: '0 1px 2px rgba(0,0,0,.05)',
  md: '0 4px 6px rgba(0,0,0,.07)',
  lg: '0 10px 15px rgba(0,0,0,.1)',
};

export type SizeKey    = keyof typeof sizes;
export type ColorKey   = keyof typeof colors;
export type VariantKey = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
