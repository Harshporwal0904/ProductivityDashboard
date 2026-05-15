import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineFlag,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineX,
} from 'react-icons/hi';

const navItems = [
  { path: '/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
  { path: '/tasks', icon: HiOutlineClipboardList, label: 'Tasks' },
  { path: '/notes', icon: HiOutlineDocumentText, label: 'Notes' },
  { path: '/pomodoro', icon: HiOutlineClock, label: 'Pomodoro' },
  { path: '/goals', icon: HiOutlineFlag, label: 'Goals' },
  { path: '/analytics', icon: HiOutlineChartBar, label: 'Analytics' },
  { path: '/settings', icon: HiOutlineCog, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '260px',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : '',
          transition: 'transform 0.3s ease',
        }}
        className={`${!isOpen ? 'max-md:-translate-x-full' : ''}`}
      >
        {/* Logo Area */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '800',
              color: 'white',
            }}>
              P
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
            }}>
              ProDash
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* User Info */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{
                color: '#f1f5f9',
                fontWeight: '600',
                fontSize: '0.875rem',
              }}>
                {user?.name || 'User'}
              </div>
              <div style={{
                color: '#64748b',
                fontSize: '0.75rem',
              }}>
                {user?.email || ''}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: '12px 12px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? '#ffffff' : '#94a3b8',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(99,102,241,0.3)'
                  : '1px solid transparent',
                transition: 'all 0.2s ease',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.background = 'rgba(148, 163, 184, 0.08)';
                  e.currentTarget.style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current');
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{
          padding: '12px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: '#94a3b8',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(148, 163, 184, 0.08)';
              e.currentTarget.style.color = '#e2e8f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            {theme === 'dark' ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: '#ef4444',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <HiOutlineLogout size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
