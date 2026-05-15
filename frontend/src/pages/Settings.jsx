import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  HiOutlineMoon, 
  HiOutlineSun,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineBell
} from 'react-icons/hi';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="animate-fadeIn" style={{ maxWidth: '800px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Settings</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Customize your dashboard experience.</p>
      </header>

      <div style={{ display: 'grid', gap: '24px' }}>
        {/* Appearance */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Appearance
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Dark Mode</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Toggle between light and dark themes.</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="btn-secondary"
              style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '20px' }}>Profile Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '50%', 
                background: 'var(--accent-gradient)', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', color: 'white',
                fontSize: '1.5rem', fontWeight: '700'
              }}>
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h4 style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{user?.name}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Security placeholders */}
        <div className="card" style={{ padding: '24px', opacity: 0.7 }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '20px' }}>Account & Security</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <HiOutlineShieldCheck style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Password hashing active</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <HiOutlineBell style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Browser notifications enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
