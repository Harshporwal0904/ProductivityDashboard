import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  HiOutlinePlus, 
  HiOutlineTrash, 
  HiOutlineCalendar,
  HiOutlineFilter,
  HiOutlineChevronDown
} from 'react-icons/hi';

export default function Tasks() {
  const { tasks, fetchTasks, createTask, updateTask, deleteTask, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [category, setCategory] = useState('All');

  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [taskCategory, setTaskCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTask({
      title,
      description: desc,
      category: taskCategory,
      priority,
      dueDate: dueDate || null
    });
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setTaskCategory('Work');
    setPriority('Medium');
    setDueDate('');
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'All' ? true : 
                        filter === 'Completed' ? task.completed : !task.completed;
    const categoryMatch = category === 'All' ? true : task.category === category;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Task Manager</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Manage and track your daily activities.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <HiOutlinePlus /> New Task
        </button>
      </div>

      {/* Filters Bar */}
      <div className="card" style={{ padding: '12px 20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <HiOutlineFilter /> Filters:
        </div>
        
        <select 
          className="select" 
          style={{ width: 'auto', padding: '6px 32px 6px 12px' }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select 
          className="select" 
          style={{ width: 'auto', padding: '6px 32px 6px 12px' }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Tasks List */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            No tasks found. Start by creating one!
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} className="card" style={{ 
              padding: '16px 20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              opacity: task.completed ? 0.7 : 1,
              borderLeft: `4px solid ${
                task.priority === 'High' ? 'var(--danger)' : 
                task.priority === 'Medium' ? 'var(--warning)' : 'var(--success)'
              }`
            }}>
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => updateTask(task._id, { completed: !task.completed })}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
              />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: 'var(--text-primary)',
                  textDecoration: task.completed ? 'line-through' : 'none'
                }}>
                  {task.title}
                </h4>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <span className={`badge badge-${
                    task.category === 'Work' ? 'info' : 
                    task.category === 'Health' ? 'success' : 'purple'
                  }`}>
                    {task.category}
                  </span>
                  {task.dueDate && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <HiOutlineCalendar /> {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <button className="btn-icon" onClick={() => deleteTask(task._id)} style={{ color: 'var(--danger)' }}>
                <HiOutlineTrash size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* New Task Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card animate-fadeInScale" style={{ 
            width: '100%', 
            maxWidth: '500px', 
            padding: '32px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>Create New Task</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Title</label>
                <input required className="input" placeholder="What needs to be done?" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Description (Optional)</label>
                <textarea className="textarea" placeholder="Add more details..." value={desc} onChange={e => setDesc(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Category</label>
                  <select className="select" value={taskCategory} onChange={e => setTaskCategory(e.target.value)}>
                    <option>Work</option>
                    <option>Study</option>
                    <option>Personal</option>
                    <option>Health</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Priority</label>
                  <select className="select" value={priority} onChange={e => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Due Date</label>
                <input type="date" className="input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
