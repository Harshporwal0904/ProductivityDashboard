import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Map paths to page titles
const pageTitles = {
  '/dashboard': 'Dashboard',
  '/tasks': 'Task Manager',
  '/notes': 'Notes',
  '/pomodoro': 'Pomodoro Timer',
  '/goals': 'Daily Goals',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area offset by sidebar width on desktop */}
      <div
        style={{
          flex: 1,
          marginLeft: '260px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
        className="max-md:!ml-0"
      >
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={title}
        />
        <main
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
