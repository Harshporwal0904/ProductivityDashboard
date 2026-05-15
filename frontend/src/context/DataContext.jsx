import { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [goals, setGoals] = useState([]);
  const [pomodoroStats, setPomodoroStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===== TASKS =====
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/tasks');
      setTasks(data);
    } catch (err) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    const { data } = await api.post('/api/tasks', taskData);
    setTasks(prev => [data, ...prev]);
    toast.success('Task created!');
    return data;
  };

  const updateTask = async (id, taskData) => {
    const { data } = await api.put(`/api/tasks/${id}`, taskData);
    setTasks(prev => prev.map(t => t._id === id ? data : t));
    toast.success('Task updated!');
    return data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
    toast.success('Task deleted!');
  };

  // ===== NOTES =====
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/notes');
      setNotes(data);
    } catch (err) {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = async (noteData) => {
    const { data } = await api.post('/api/notes', noteData);
    setNotes(prev => [data, ...prev]);
    toast.success('Note created!');
    return data;
  };

  const updateNote = async (id, noteData) => {
    const { data } = await api.put(`/api/notes/${id}`, noteData);
    setNotes(prev => prev.map(n => n._id === id ? data : n));
    toast.success('Note updated!');
    return data;
  };

  const deleteNote = async (id) => {
    await api.delete(`/api/notes/${id}`);
    setNotes(prev => prev.filter(n => n._id !== id));
    toast.success('Note deleted!');
  };

  // ===== GOALS =====
  const fetchGoals = useCallback(async (date) => {
    try {
      setLoading(true);
      const params = date ? { date } : {};
      const { data } = await api.get('/api/goals', { params });
      setGoals(data);
    } catch (err) {
      toast.error('Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  }, []);

  const createGoal = async (goalData) => {
    const { data } = await api.post('/api/goals', goalData);
    setGoals(prev => [data, ...prev]);
    toast.success('Goal added!');
    return data;
  };

  const updateGoal = async (id, goalData) => {
    const { data } = await api.put(`/api/goals/${id}`, goalData);
    setGoals(prev => prev.map(g => g._id === id ? data : g));
    return data;
  };

  const deleteGoal = async (id) => {
    await api.delete(`/api/goals/${id}`);
    setGoals(prev => prev.filter(g => g._id !== id));
    toast.success('Goal removed!');
  };

  // ===== POMODORO =====
  const fetchPomodoroStats = useCallback(async () => {
    try {
      const { data } = await api.get('/api/pomodoro');
      setPomodoroStats(data);
    } catch (err) {
      // silent fail for pomodoro stats
    }
  }, []);

  const logPomodoro = async (sessionData) => {
    const { data } = await api.post('/api/pomodoro', sessionData);
    setPomodoroStats(prev => {
      const idx = prev.findIndex(p =>
        new Date(p.date).toDateString() === new Date(data.date).toDateString()
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = data;
        return updated;
      }
      return [data, ...prev];
    });
    toast.success('Pomodoro session logged!');
    return data;
  };

  return (
    <DataContext.Provider value={{
      tasks, notes, goals, pomodoroStats, loading,
      fetchTasks, createTask, updateTask, deleteTask,
      fetchNotes, createNote, updateNote, deleteNote,
      fetchGoals, createGoal, updateGoal, deleteGoal,
      fetchPomodoroStats, logPomodoro,
    }}>
      {children}
    </DataContext.Provider>
  );
}
