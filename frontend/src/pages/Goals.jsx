import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  HiOutlineFlag, 
  HiOutlinePlus, 
  HiOutlineTrash,
  HiOutlineFire,
  HiOutlineCheck
} from 'react-icons/hi';

export default function Goals() {
  const { goals, fetchGoals, createGoal, updateGoal, deleteGoal, loading } = useData();
  const [goalText, setGoalText] = useState('');

  useEffect(() => {
    fetchGoals(new Date());
  }, [fetchGoals]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!goalText.trim()) return;
    await createGoal({ goalText });
    setGoalText('');
  };

  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="animate-fadeIn" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Daily Goals</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Focus on the most important objectives for today.</p>
      </header>

      {/* Progress Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '32px', background: 'var(--accent-gradient)', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', color: 'white' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Daily Progress</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>{completedCount} of {totalCount} goals completed</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineFire size={24} />
            <span style={{ fontWeight: '800', fontSize: '1.25rem' }}>5 Day Streak!</span>
          </div>
        </div>
        <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, background: 'white' }}></div>
        </div>
      </div>

      {/* Goal Input */}
      <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input 
          className="input" 
          placeholder="Add a new goal for today..." 
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          <HiOutlinePlus /> Add Goal
        </button>
      </form>

      {/* Goals List */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {goals.map(goal => (
          <div key={goal._id} className="card" style={{ 
            padding: '16px 20px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            opacity: goal.completed ? 0.7 : 1
          }}>
            <button 
              onClick={() => updateGoal(goal._id, { completed: !goal.completed })}
              style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: '2px solid',
                borderColor: goal.completed ? 'var(--success)' : 'var(--border-color)',
                background: goal.completed ? 'var(--success)' : 'transparent',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'var(--transition)'
              }}
            >
              {goal.completed && <HiOutlineCheck size={16} />}
            </button>
            
            <span style={{ 
              flex: 1, color: 'var(--text-primary)', fontWeight: '500',
              textDecoration: goal.completed ? 'line-through' : 'none'
            }}>
              {goal.goalText}
            </span>

            <button className="btn-icon" onClick={() => deleteGoal(goal._id)} style={{ color: 'var(--danger)' }}>
              <HiOutlineTrash size={18} />
            </button>
          </div>
        ))}

        {goals.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No goals set for today yet.
          </div>
        )}
      </div>
    </div>
  );
}
