import { HiOutlineMenuAlt2, HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onToggleSidebar, title }) {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: '64px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HiOutlineMenuAlt2 size={22} />
        </button>
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>
          {title || 'Dashboard'}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Search bar - desktop only */}
        <div
          className="hide-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            minWidth: '220px',
          }}
        >
          <HiOutlineSearch size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.8125rem',
              width: '100%',
              fontFamily: 'var(--font-primary)',
            }}
          />
        </div>

        {/* Notifications */}
        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          <HiOutlineBell size={20} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            background: 'var(--accent-primary)',
            borderRadius: '50%',
            border: '2px solid var(--bg-secondary)',
          }} />
        </button>

        {/* User avatar */}
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  );
}
