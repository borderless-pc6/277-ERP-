import { useState } from 'react';
import './Dashboard.css';
import type { PageType } from '../types';

interface DashboardProps {
  onLogout: () => void;
  onNavigate?: (page: PageType) => void;
}

const Dashboard = ({ onLogout, onNavigate }: DashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor" />
              </svg>
            </div>
            {!sidebarCollapsed && <span className="brand-text">Admin Panel</span>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar} title={sidebarCollapsed ? 'Expandir' : 'Recolher'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d={sidebarCollapsed ? "M9 18L15 12L9 6" : "M15 18L9 12L15 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active" title="Dashboard">
            <div className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor" />
              </svg>
            </div>
            {!sidebarCollapsed && <span className="nav-text">Dashboard</span>}
          </button>

          <button
            className="nav-item"
            title="Usuários"
            onClick={() => onNavigate?.('users')}
          >
            <div className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55232C18.7122 5.25395 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75695 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            {!sidebarCollapsed && <span className="nav-text">Usuários</span>}
          </button>

          <button
            className="nav-item"
            title="Análises"
            onClick={() => onNavigate?.('analytics')}
          >
            <div className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 3V21H21M9 9L12 6L16 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {!sidebarCollapsed && <span className="nav-text">Análises</span>}
          </button>

          <button className="nav-item" title="Configurações">
            <div className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            {!sidebarCollapsed && <span className="nav-text">Configurações</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-button" onClick={onLogout} title="Sair">
            <div className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {!sidebarCollapsed && <span className="nav-text">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-content">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Bem-vindo ao painel administrativo</p>
          </div>
          <div className="user-avatar">
            <span>A</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55232C18.7122 5.25395 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75695 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Total de Usuários</h3>
              <p className="stat-value">2,543</p>
              <div className="stat-change positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>+12.5% vs. mês anterior</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Receita Total</h3>
              <p className="stat-value">R$ 45,231</p>
              <div className="stat-change positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>+8.2% vs. mês anterior</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Pedidos</h3>
              <p className="stat-value">1,234</p>
              <div className="stat-change negative">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M17 10L12 15L7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>-3.1% vs. mês anterior</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 3V21H21M9 9L12 6L16 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">Taxa de Conversão</h3>
              <p className="stat-value">3.24%</p>
              <div className="stat-change positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>+2.4% vs. mês anterior</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Recent Activity */}
          <div className="panel activity-panel">
            <div className="panel-header">
              <h3 className="panel-title">Atividade Recente</h3>
              <p className="panel-subtitle">Últimas ações dos usuários</p>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-info">
                  <span className="activity-user">João Silva</span>
                  <span className="activity-action">Realizou uma compra</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-value">R$ 299,00</span>
                  <span className="activity-time">Há 2 minutos</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-info">
                  <span className="activity-user">Maria Santos</span>
                  <span className="activity-action">Criou uma conta</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-time">Há 15 minutos</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-info">
                  <span className="activity-user">Pedro Costa</span>
                  <span className="activity-action">Atualizou o perfil</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-time">Há 1 hora</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-info">
                  <span className="activity-user">Ana Oliveira</span>
                  <span className="activity-action">Realizou uma compra</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-value">R$ 149,00</span>
                  <span className="activity-time">Há 2 horas</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-info">
                  <span className="activity-user">Carlos Ferreira</span>
                  <span className="activity-action">Cancelou um pedido</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-value">R$ 89,00</span>
                  <span className="activity-time">Há 3 horas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="panel products-panel">
            <div className="panel-header">
              <h3 className="panel-title">Produtos Mais Vendidos</h3>
              <p className="panel-subtitle">Top 5 produtos do mês</p>
            </div>
            <div className="products-list">
              <div className="product-item">
                <span className="product-name">Produto Premium A</span>
                <div className="product-meta">
                  <span className="product-sales">234 vendas</span>
                  <span className="product-revenue">R$ 23,400</span>
                </div>
              </div>

              <div className="product-item">
                <span className="product-name">Produto Standard B</span>
                <div className="product-meta">
                  <span className="product-sales">189 vendas</span>
                  <span className="product-revenue">R$ 18,900</span>
                </div>
              </div>

              <div className="product-item">
                <span className="product-name">Produto Basic C</span>
                <div className="product-meta">
                  <span className="product-sales">156 vendas</span>
                  <span className="product-revenue">R$ 7,800</span>
                </div>
              </div>

              <div className="product-item">
                <span className="product-name">Produto Premium D</span>
                <div className="product-meta">
                  <span className="product-sales">142 vendas</span>
                  <span className="product-revenue">R$ 14,200</span>
                </div>
              </div>

              <div className="product-item">
                <span className="product-name">Produto Standard E</span>
                <div className="product-meta">
                  <span className="product-sales">98 vendas</span>
                  <span className="product-revenue">R$ 9,800</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

