import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '20px',
    }}>
      <div className="animate-fadeInScale" style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '800',
              color: 'white',
            }}>P</div>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
            }}>ProDash</span>
          </Link>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            Welcome back
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '28px',
          }}>
            Login to access your dashboard
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
              }}>Email</label>
              <div style={{ position: 'relative' }}>
                <HiOutlineMail size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }} />
                <input
                  id="login-email"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <HiOutlineLockClosed size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }} />
                <input
                  id="login-password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                marginTop: '4px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
              ) : (
                <>Login <HiOutlineArrowRight /></>
              )}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{
            color: 'var(--accent-primary)',
            fontWeight: '600',
            textDecoration: 'none',
          }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
