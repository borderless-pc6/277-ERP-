import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import type { PageType } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const renderPage = () => {
    if (isAuthenticated && currentPage === 'dashboard') {
      return <Dashboard onLogout={handleLogout} onNavigate={handleNavigation} />;
    }

    if (isAuthenticated && currentPage === 'analytics') {
      return <Analytics onLogout={handleLogout} onNavigate={handleNavigation} />;
    }

    if (isAuthenticated && currentPage === 'users') {
      return <Users onLogout={handleLogout} onNavigate={handleNavigation} />;
    }

    if (currentPage === 'register') {
      return <Register onNavigate={handleNavigation} />;
    }

    return <Login onNavigate={handleNavigation} onLogin={handleLogin} />;
  };

  return <>{renderPage()}</>;
}

export default App;
