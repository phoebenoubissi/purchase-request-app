import { useState } from 'react';
import { colors } from './styles/theme';
import { TopNav } from './components/shared/TopNav';
import { DashboardPage } from './pages/DashboardPage';
import { RequestsPage } from './pages/RequestsPage';
import { ApprovalsPage } from './pages/ApprovalsPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NewRequestPage } from './pages/NewRequestPage';
import { BulkApprovalsPage } from './pages/BulkApprovalsPage';

type Page = 'dashboard' | 'requests' | 'approvals' | 'catalog' | 'projects' | 'bulk-approvals';

// Nav icons
function DashboardIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function RequestsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function ApprovalsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}
function CatalogIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
function ProjectsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: 'dashboard',  label: 'Dashboard',   icon: <DashboardIcon /> },
  { key: 'requests',   label: 'Requests',    icon: <RequestsIcon /> },
  { key: 'approvals',  label: 'My Approvals',icon: <ApprovalsIcon /> },
  { key: 'catalog',    label: 'Catalog',     icon: <CatalogIcon /> },
  { key: 'projects',   label: 'Projects',    icon: <ProjectsIcon /> },
];

function App() {
  const [activePage,        setActivePage]        = useState<Page>('dashboard');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [showNewRequest,    setShowNewRequest]    = useState(false);

  function navigate(page: string, id?: string) {
    setActivePage(page as Page);
    setSelectedRequestId(id ?? null);
    setShowNewRequest(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.surface }}>
      <TopNav
        appName="Purchase Request"
        subtitle="CodeApp"
        navItems={NAV_ITEMS}
        activeKey={activePage}
        onNavigate={key => navigate(key)}
      />

      {/* Version tag — top right, fixed */}
      <div style={{
        position: 'fixed',
        top: '16px',
        right: '24px',
        fontSize: '11px',
        color: colors.textMuted,
        zIndex: 200,
        pointerEvents: 'none',
      }}>
        v1.2.0
      </div>

      <main>
        {activePage === 'dashboard' && (
          <DashboardPage onNavigate={navigate} />
        )}
        {activePage === 'requests' && !showNewRequest && (
          <RequestsPage
            onSelect={id => navigate('requests', id)}
            onNew={() => setShowNewRequest(true)}
          />
        )}
        {activePage === 'requests' && showNewRequest && (
          <NewRequestPage onBack={() => setShowNewRequest(false)} />
        )}
        {activePage === 'approvals' && (
          <ApprovalsPage
            onSelect={id => navigate('approvals', id)}
            onBulkApprove={() => navigate('bulk-approvals')}
          />
        )}
        {activePage === 'bulk-approvals' && (
          <BulkApprovalsPage
            onBack={() => navigate('approvals')}
            onSelect={id => navigate('approvals', id)}
          />
        )}
        {activePage === 'catalog' && (
          <CatalogPage
            onAddItem={() => {/* future: open add-item form */}}
            onImportCSV={() => {/* future: open CSV import */}}
          />
        )}
        {activePage === 'projects' && (
          <ProjectsPage
            onSelect={id => navigate('projects', id)}
          />
        )}
      </main>

      {/* Selected request ID available for future detail panel */}
      {selectedRequestId && null}
    </div>
  );
}

export default App;
