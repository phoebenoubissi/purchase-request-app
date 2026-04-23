export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          color: '#9ca3af',
          pointerEvents: 'none',
        }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: '40px',
          paddingLeft: '36px',
          paddingRight: '12px',
          fontSize: '14px',
          color: '#111827',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = '#6b7280' }}
        onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb' }}
      />
    </div>
  )
}
