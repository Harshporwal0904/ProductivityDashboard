import { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  HiOutlineClipboardList, 
  HiOutlineCheckCircle, 
  HiOutlineClock, 
  HiOutlineDocumentText,
  HiOutlineTrendingUp
} from 'react-icons/hi';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const { 
    tasks, notes, goals, pomodoroStats, loading,
    fetchTasks, fetchNotes, fetchGoals, fetchPomodoroStats 
  } = useData();

  useEffect(() => {
    fetchTasks();
    fetchNotes();
    fetchGoals(new Date());
    fetchPomodoroStats();
  }, [fetchTasks, fetchNotes, fetchGoals, fetchPomodoroStats]);

  // Calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const pieData = [
    { name: 'Completed', value: completedTasks, color: 'var(--success)' },
    { name: 'Pending', value: pendingTasks, color: 'var(--accent-primary)' },
  ];

  // Mock weekly data if none exists
  const weeklyData = pomodoroStats.length > 0 
    ? pomodoroStats.slice(0, 7).reverse().map(p => ({
        name: new Date(p.date).toLocaleDateString('en-US', { weekday: 'short' }),
        minutes: p.totalMinutes
      }))
    : [
        { name: 'Mon', minutes: 120 },
        { name: 'Tue', minutes: 150 },
        { name: 'Wed', minutes: 80 },
        { name: 'Thu', minutes: 200 },
        { name: 'Fri', minutes: 170 },
        { name: 'Sat', minutes: 90 },
        { name: 'Sun', minutes: 40 },
      ];

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: HiOutlineClipboardList, color: 'var(--accent-primary)' },
    { label: 'Completed', value: completedTasks, icon: HiOutlineCheckCircle, color: 'var(--success)' },
    { label: 'Notes Count', value: notes.length, icon: HiOutlineDocumentText, color: 'var(--accent-secondary)' },
    { label: 'Productivity', value: `${completionRate}%`, icon: HiOutlineTrendingUp, color: 'var(--warning)' },
  ];

  if (loading && tasks.length === 0) {
    return <div className="loading-overlay"><div className="spinner"></div></div>;
  }

  return (
    <div className="animate-fadeIn">
      <header style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          Welcome back, {user?.name}! 👋
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with your productivity today.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px',
        marginBottom: '32px'
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  {stat.label}
                </p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {stat.value}
                </h3>
              </div>
              <div style={{ 
                padding: '10px', 
                borderRadius: '12px', 
                background: `${stat.color}15`, 
                color: stat.color 
              }}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '24px' 
      }}>
        {/* Weekly Activity */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineClock style={{ color: 'var(--accent-primary)' }} />
            Weekly Focus (Minutes)
          </h3>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-card)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }} 
                />
                <Bar dataKey="minutes" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineCheckCircle style={{ color: 'var(--success)' }} />
            Task Status
          </h3>
          <div style={{ width: '100%', height: '250px', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ paddingLeft: '20px' }}>
              {pieData.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: d.color }}></div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
