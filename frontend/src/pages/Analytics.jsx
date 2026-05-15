import { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  HiOutlineChartPie, 
  HiOutlineChartSquareBar,
  HiOutlineTrendingUp
} from 'react-icons/hi';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area
} from 'recharts';

export default function Analytics() {
  const { tasks, pomodoroStats, fetchTasks, fetchPomodoroStats } = useData();

  useEffect(() => {
    fetchTasks();
    fetchPomodoroStats();
  }, [fetchTasks, fetchPomodoroStats]);

  // Process data for charts
  const categoryData = ['Work', 'Study', 'Personal', 'Health', 'Other'].map(cat => ({
    name: cat,
    total: tasks.filter(t => t.category === cat).length,
    completed: tasks.filter(t => t.category === cat && t.completed).length
  }));

  const pomodoroTrend = pomodoroStats.slice(0, 14).reverse().map(p => ({
    date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    minutes: p.totalMinutes,
    sessions: p.sessionsCompleted
  }));

  return (
    <div className="animate-fadeIn">
      <header style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Productivity Analytics</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into your performance and habits.</p>
      </header>

      <div style={{ display: 'grid', gap: '24px' }}>
        {/* Task Category Performance */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineChartSquareBar style={{ color: 'var(--accent-primary)' }} />
            Task Distribution by Category
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Total Tasks" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="var(--success)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pomodoro Trends */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineTrendingUp style={{ color: 'var(--accent-primary)' }} />
            Focus Trends (Last 14 Days)
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <AreaChart data={pomodoroTrend}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="minutes" name="Focus Minutes" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorMinutes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
