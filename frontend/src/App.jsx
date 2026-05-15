import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Protected Pages
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Pomodoro from './pages/Pomodoro';
import Goals from './pages/Goals';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="notes" element={<Notes />} />
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="goals" element={<Goals />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
