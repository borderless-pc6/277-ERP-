import { useState } from 'react';
import './Analytics.css';
import type { PageType } from '../types';

interface AnalyticsProps {
    onLogout: () => void;
    onNavigate?: (page: PageType) => void;
}

const Analytics = ({ onLogout, onNavigate }: AnalyticsProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState<'revenue' | 'traffic' | 'conversion'>('revenue');

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const metricsData = [
        {
            title: 'Total de Visitas',
            value: '124,543',
            change: '+12.5%',
            changeType: 'positive',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            title: 'Visitantes Únicos',
            value: '89,234',
            change: '+8.2%',
            changeType: 'positive',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55232C18.7122 5.25395 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75695 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            title: 'Taxa de Conversão',
            value: '3.24%',
            change: '+0.4%',
            changeType: 'positive',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3V21H21M9 9L12 6L16 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'Tempo Médio',
            value: '4m 32s',
            change: '+15s',
            changeType: 'positive',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'Taxa de Cliques',
            value: '2.8%',
            change: '+0.3%',
            changeType: 'positive',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 9L12 6L16 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            title: 'Taxa de Rejeição',
            value: '42.3%',
            change: '-2.1%',
            changeType: 'negative',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3V21H21M9 9L12 6L16 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    const trafficSources = [
        { name: 'Busca Orgânica', visits: 56234, percentage: 100 },
        { name: 'Direto', visits: 31234, percentage: 55 },
        { name: 'Redes Sociais', visits: 22456, percentage: 40 },
        { name: 'Referência', visits: 14987, percentage: 27 }
    ];

    const devices = [
        { name: 'Desktop', users: 64923, percentage: 100 },
        { name: 'Mobile', users: 47456, percentage: 73 },
        { name: 'Tablet', users: 12487, percentage: 19 }
    ];

    const monthlyRevenue = [
        { month: 'Jan', value: 15000 },
        { month: 'Fev', value: 18000 },
        { month: 'Mar', value: 22000 },
        { month: 'Abr', value: 25000 },
        { month: 'Mai', value: 28000 },
        { month: 'Jun', value: 32000 },
        { month: 'Jul', value: 35000 },
        { month: 'Ago', value: 38000 },
        { month: 'Set', value: 42000 },
        { month: 'Out', value: 45000 },
        { month: 'Nov', value: 48000 },
        { month: 'Dez', value: 52000 }
    ];

    const maxRevenue = Math.max(...monthlyRevenue.map(item => item.value));

    return (
        <div className="analytics-container">
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
                    <button
                        className="nav-item"
                        title="Dashboard"
                        onClick={() => onNavigate?.('dashboard')}
                    >
                        <div className="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor" />
                            </svg>
                        </div>
                        {!sidebarCollapsed && <span className="nav-text">Dashboard</span>}
                    </button>

                    <button className="nav-item" title="Usuários">
                        <div className="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55232C18.7122 5.25395 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75695 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        {!sidebarCollapsed && <span className="nav-text">Usuários</span>}
                    </button>

                    <button className="nav-item active" title="Análises">
                        <div className="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M3 3V21H21M9 9L12 6L16 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        {!sidebarCollapsed && <span className="nav-text">Análises</span>}
                    </button>

                    <button
                        className="nav-item"
                        title="Atos Administrativos"
                        onClick={() => onNavigate?.('atos-administrativos')}
                    >
                        <div className="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        {!sidebarCollapsed && <span className="nav-text">Atos Administrativos</span>}
                    </button>

                    <button
                        className="nav-item"
                        title="Configurações"
                        onClick={() => onNavigate?.('configuracoes')}
                    >
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
                        <h1 className="page-title">Análises</h1>
                        <p className="page-subtitle">Visualize métricas e estatísticas detalhadas</p>
                    </div>
                    <div className="user-avatar">
                        <span>A</span>
                    </div>
                </header>

                {/* Metrics Cards */}
                <div className="metrics-grid">
                    {metricsData.map((metric, index) => (
                        <div key={index} className="metric-card">
                            <div className="metric-icon">
                                {metric.icon}
                            </div>
                            <div className="metric-content">
                                <h3 className="metric-title">{metric.title}</h3>
                                <p className="metric-value">{metric.value}</p>
                                <div className={`metric-change ${metric.changeType}`}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                        <path d={metric.changeType === 'positive' ? "M7 14L12 9L17 14" : "M17 10L12 15L7 10"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{metric.change} vs. período anterior</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Section */}
                <div className="chart-section">
                    <div className="chart-tabs">
                        <button
                            className={`chart-tab ${activeTab === 'revenue' ? 'active' : ''}`}
                            onClick={() => setActiveTab('revenue')}
                        >
                            Receita
                        </button>
                        <button
                            className={`chart-tab ${activeTab === 'traffic' ? 'active' : ''}`}
                            onClick={() => setActiveTab('traffic')}
                        >
                            Tráfego
                        </button>
                        <button
                            className={`chart-tab ${activeTab === 'conversion' ? 'active' : ''}`}
                            onClick={() => setActiveTab('conversion')}
                        >
                            Conversão
                        </button>
                    </div>

                    {activeTab === 'revenue' && (
                        <div className="chart-panel">
                            <div className="chart-header">
                                <h3 className="chart-title">Receita Mensal</h3>
                                <p className="chart-subtitle">Receita total por mês nos últimos 12 meses</p>
                            </div>
                            <div className="chart-container">
                                <div className="chart-bars">
                                    {monthlyRevenue.map((item, index) => (
                                        <div key={index} className="chart-bar-container">
                                            <div
                                                className="chart-bar"
                                                style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                                            ></div>
                                            <span className="chart-label">{item.month}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="chart-y-axis">
                                    <span>0</span>
                                    <span>15k</span>
                                    <span>30k</span>
                                    <span>45k</span>
                                    <span>60k</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                <div className="analytics-bottom-section">
                    {/* Traffic Sources */}
                    <div className="analytics-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">Principais Fontes de Tráfego</h3>
                            <p className="panel-subtitle">De onde vêm seus visitantes</p>
                        </div>
                        <div className="traffic-list">
                            {trafficSources.map((source, index) => (
                                <div key={index} className="traffic-item">
                                    <span className="traffic-name">{source.name}</span>
                                    <div className="traffic-bar-container">
                                        <div
                                            className="traffic-bar"
                                            style={{ width: `${source.percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="traffic-value">{source.visits.toLocaleString()} visitas</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Devices */}
                    <div className="analytics-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">Dispositivos</h3>
                            <p className="panel-subtitle">Distribuição por tipo de dispositivo</p>
                        </div>
                        <div className="devices-list">
                            {devices.map((device, index) => (
                                <div key={index} className="device-item">
                                    <span className="device-name">{device.name}</span>
                                    <div className="device-bar-container">
                                        <div
                                            className="device-bar"
                                            style={{ width: `${device.percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="device-value">{device.users.toLocaleString()} usuários</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Analytics;
