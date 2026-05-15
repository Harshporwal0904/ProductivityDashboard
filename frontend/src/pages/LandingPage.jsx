import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineFlag,
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from 'react-icons/hi';

const features = [
  { icon: HiOutlineClipboardList, title: 'Task Manager', desc: 'Organize and track your tasks with priorities and categories' },
  { icon: HiOutlineDocumentText, title: 'Smart Notes', desc: 'Capture ideas with searchable, pinnable notes' },
  { icon: HiOutlineClock, title: 'Pomodoro Timer', desc: 'Stay focused with built-in work/break intervals' },
  { icon: HiOutlineFlag, title: 'Daily Goals', desc: 'Set and track daily goals with streak counting' },
  { icon: HiOutlineChartBar, title: 'Analytics', desc: 'Visualize your productivity with beautiful charts' },
  { icon: HiOutlineSparkles, title: 'Dark Mode', desc: 'Beautiful dark and light themes for comfort' },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
          }}>P</div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
          }}>ProDash</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {user ? (
            <Link to="/dashboard" className="btn-primary" style={{ textDecoration: 'none' }}>
              Go to Dashboard <HiOutlineArrowRight />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none' }}>
                Get Started <HiOutlineArrowRight />
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 32px 60px',
        textAlign: 'center',
      }}>
        <div className="animate-fadeIn" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'var(--accent-glow)',
          borderRadius: '100px',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          marginBottom: '24px',
        }}>
          <HiOutlineLightningBolt style={{ color: 'var(--accent-primary)' }} />
          <span style={{
            fontSize: '0.8125rem',
            fontWeight: '600',
            color: 'var(--accent-primary)',
          }}>
            Your Personal Productivity Hub
          </span>
        </div>

        <h1 className="animate-fadeIn" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '20px',
          animationDelay: '0.1s',
        }}>
          Master Your
          <br />
          <span className="gradient-text">Productivity</span>
        </h1>

        <p className="animate-fadeIn" style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: '1.7',
          animationDelay: '0.2s',
        }}>
          All-in-one dashboard to manage tasks, capture notes, track goals,
          and analyze your productivity with beautiful charts and timers.
        </p>

        <div className="animate-fadeIn" style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          animationDelay: '0.3s',
        }}>
          <Link to={user ? '/dashboard' : '/signup'} className="btn-primary" style={{
            textDecoration: 'none',
            padding: '14px 32px',
            fontSize: '1rem',
          }}>
            {user ? 'Open Dashboard' : 'Start for Free'} <HiOutlineArrowRight />
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fadeIn" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginTop: '60px',
          animationDelay: '0.4s',
        }}>
          {[
            { num: '6+', label: 'Modules' },
            { num: '100%', label: 'Free' },
            { num: '∞', label: 'Possibilities' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'var(--accent-primary)',
              }}>{num}</div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                fontWeight: '500',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 32px 80px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}>
            Everything You Need
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
          }}>
            A complete productivity toolkit in one beautiful dashboard
          </p>
        </div>

        <div
          className="stagger-children"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card" style={{
              padding: '28px',
              cursor: 'default',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--accent-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Icon size={22} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <h3 style={{
                fontSize: '1.0625rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}>{title}</h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 32px 100px',
        textAlign: 'center',
      }}>
        <div className="card" style={{
          padding: '48px 32px',
          background: 'var(--accent-gradient)',
          border: 'none',
        }}>
          <HiOutlineShieldCheck size={36} style={{ color: 'white', marginBottom: '16px' }} />
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '12px',
          }}>
            Ready to boost your productivity?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '28px',
            fontSize: '1rem',
          }}>
            Join now and start managing your tasks, goals, and time like a pro.
          </p>
          <Link to={user ? '/dashboard' : '/signup'} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            background: 'white',
            color: '#6366f1',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '0.9375rem',
            transition: 'var(--transition)',
          }}>
            Get Started <HiOutlineArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '24px 32px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
        }}>
          © {new Date().getFullYear()} ProDash — Personal Productivity Dashboard
        </p>
      </footer>
    </div>
  );
}
