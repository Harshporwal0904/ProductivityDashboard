import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      setLoading(true);
      await register(name, email, password);
      toast.success('Account created! Welcome!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
      <div className="animate-fadeInScale" style={{ width: '100%', maxWidth: '420px' }}>
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
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>ProDash</span>
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
          }}>Create account</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '28px' }}>
            Start your productivity journey
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Name</label>
              <div style={{ position: 'relative' }}>
                <HiOutlineUser size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input id="signup-name" type="text" className="input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} style={{ paddingLeft: '38px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <HiOutlineMail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input id="signup-email" type="email" className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ paddingLeft: '38px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <HiOutlineLockClosed size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input id="signup-password" type="password" className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingLeft: '38px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <HiOutlineLockClosed size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input id="signup-confirm-password" type="password" className="input" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ paddingLeft: '38px' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
              {loading ? <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} /> : <>Create Account <HiOutlineArrowRight /></>}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
