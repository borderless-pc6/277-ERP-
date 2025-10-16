import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import AtosAdministrativos from './pages/AtosAdministrativos';
import AprovacaoAtos from './pages/AprovacaoAtos';
import Configuracoes from './pages/Configuracoes';
import type { PageType } from './types';
import './App.css';

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

    if (isAuthenticated && currentPage === 'atos-administrativos') {
      return <AtosAdministrativos onLogout={handleLogout} onNavigate={handleNavigation} />;
    }

    if (isAuthenticated && currentPage === 'aprovacao-atos') {
      return <AprovacaoAtos onLogout={handleLogout} onNavigate={handleNavigation} />;
    }

    if (isAuthenticated && currentPage === 'configuracoes') {
      return <Configuracoes onLogout={handleLogout} onNavigate={handleNavigation} />;
    }

    if (currentPage === 'register') {
      return <Register onNavigate={handleNavigation} />;
    }

    return <Login onNavigate={handleNavigation} onLogin={handleLogin} />;
  };

  return (
    <div className="app-container animate-fade-in">
      {renderPage()}
    </div>
  );
}

export default App;
