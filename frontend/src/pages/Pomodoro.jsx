import { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  HiOutlinePlay, 
  HiOutlinePause, 
  HiOutlineRefresh,
  HiOutlineClock
} from 'react-icons/hi';

export default function Pomodoro() {
  const { logPomodoro } = useData();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [sessions, setSessions] = useState(0);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleTimerComplete = async () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    
    if (mode === 'work') {
      setSessions(prev => prev + 1);
      await logPomodoro({ sessionsCompleted: 1, totalMinutes: 25 });
      // Switch to break
      setMode('break');
      setTimeLeft(5 * 60);
    } else {
      // Switch to work
      setMode('work');
      setTimeLeft(25 * 60);
    }
    
    // Play sound or alert
    alert(`${mode === 'work' ? 'Work' : 'Break'} session finished!`);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((mode === 'work' ? 25 * 60 : 5 * 60) - timeLeft) / (mode === 'work' ? 25 * 60 : 5 * 60) * 100;

  return (
    <div className="animate-fadeIn" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Pomodoro Timer</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Focus deeply with structured work intervals.</p>
      </header>

      <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
        {/* Mode Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          <button 
            className={`btn-secondary ${mode === 'work' ? 'active-mode' : ''}`}
            onClick={() => { setMode('work'); setTimeLeft(25 * 60); setIsActive(false); }}
            style={{ 
              background: mode === 'work' ? 'var(--accent-glow)' : 'transparent',
              borderColor: mode === 'work' ? 'var(--accent-primary)' : 'var(--border-color)',
              color: mode === 'work' ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}
          >
            Work
          </button>
          <button 
            className={`btn-secondary ${mode === 'break' ? 'active-mode' : ''}`}
            onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
            style={{ 
              background: mode === 'break' ? 'var(--accent-glow)' : 'transparent',
              borderColor: mode === 'break' ? 'var(--accent-primary)' : 'var(--border-color)',
              color: mode === 'break' ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}
          >
            Break
          </button>
        </div>

        {/* Timer Display */}
        <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto 40px' }}>
          {/* Simple circular progress representation */}
          <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            <circle cx="120" cy="120" r="110" fill="none" stroke="var(--bg-tertiary)" strokeWidth="8" />
            <circle 
              cx="120" cy="120" r="110" fill="none" 
              stroke="var(--accent-primary)" strokeWidth="8" 
              strokeDasharray="691" 
              strokeDashoffset={691 - (691 * progress / 100)}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div style={{ 
            position: 'absolute', inset: 0, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3.5rem', fontWeight: '800', color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button className="btn-primary" onClick={toggleTimer} style={{ padding: '12px 32px', fontSize: '1rem' }}>
            {isActive ? <HiOutlinePause size={20} /> : <HiOutlinePlay size={20} />}
            {isActive ? 'Pause' : 'Start Focus'}
          </button>
          <button className="btn-secondary" onClick={resetTimer} style={{ padding: '12px 20px' }}>
            <HiOutlineRefresh size={20} />
          </button>
        </div>

        {/* Stats */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sessions Today</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>{sessions}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Focus Goal</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>4 / 8</div>
          </div>
        </div>
      </div>
    </div>
  );
}
