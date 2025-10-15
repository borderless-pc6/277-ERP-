import { useState } from 'react';
import './Configuracoes.css';
import type { PageType } from '../types';

interface ConfiguracoesProps {
    onLogout: () => void;
    onNavigate?: (page: PageType) => void;
}

const Configuracoes = ({ onLogout, onNavigate }: ConfiguracoesProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [settings, setSettings] = useState({
        // Configurações Gerais
        nomeEmpresa: 'ERP Admin Panel',
        emailContato: 'admin@empresa.com',
        telefoneContato: '(11) 99999-9999',
        endereco: 'Rua das Empresas, 123 - São Paulo, SP',

        // Configurações de Sistema
        tema: 'claro',
        idioma: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        formatoData: 'DD/MM/YYYY',

        // Configurações de Notificação
        emailNotificacoes: true,
        smsNotificacoes: false,
        pushNotificacoes: true,

        // Configurações de Segurança
        sessaoTimeout: 30,
        tentativasLogin: 5,
        senhaMinima: 8,
        doisFatores: false,

        // Configurações de Backup
        backupAutomatico: true,
        frequenciaBackup: 'diario',
        retencaoBackup: 30
    });

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        console.log('Configurações salvas:', settings);
        alert('Configurações salvas com sucesso!');
    };

    const handleReset = () => {
        if (confirm('Tem certeza que deseja redefinir todas as configurações?')) {
            setSettings({
                nomeEmpresa: 'ERP Admin Panel',
                emailContato: 'admin@empresa.com',
                telefoneContato: '(11) 99999-9999',
                endereco: 'Rua das Empresas, 123 - São Paulo, SP',
                tema: 'claro',
                idioma: 'pt-BR',
                timezone: 'America/Sao_Paulo',
                formatoData: 'DD/MM/YYYY',
                emailNotificacoes: true,
                smsNotificacoes: false,
                pushNotificacoes: true,
                sessaoTimeout: 30,
                tentativasLogin: 5,
                senhaMinima: 8,
                doisFatores: false,
                backupAutomatico: true,
                frequenciaBackup: 'diario',
                retencaoBackup: 30
            });
        }
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

                    <button className="nav-item active" title="Configurações">
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
                        <h1 className="page-title">Configurações</h1>
                        <p className="page-subtitle">Gerencie as configurações do sistema</p>
                    </div>
                    <div className="user-avatar">
                        <span>A</span>
                    </div>
                </header>

                {/* Settings Container */}
                <div className="settings-container">
                    <div className="settings-grid">
                        {/* Configurações Gerais */}
                        <div className="settings-section">
                            <div className="section-header">
                                <h3 className="section-title">Informações da Empresa</h3>
                                <p className="section-subtitle">Configure os dados básicos da empresa</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="form-label">Nome da Empresa</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={settings.nomeEmpresa}
                                        onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email de Contato</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={settings.emailContato}
                                        onChange={(e) => handleInputChange('emailContato', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Telefone de Contato</label>
                                    <input
                                        type="tel"
                                        className="form-input"
                                        value={settings.telefoneContato}
                                        onChange={(e) => handleInputChange('telefoneContato', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Endereço</label>
                                    <textarea
                                        className="form-textarea"
                                        value={settings.endereco}
                                        onChange={(e) => handleInputChange('endereco', e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Configurações de Sistema */}
                        <div className="settings-section">
                            <div className="section-header">
                                <h3 className="section-title">Preferências do Sistema</h3>
                                <p className="section-subtitle">Personalize a aparência e comportamento</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="form-label">Tema</label>
                                    <select
                                        className="form-select"
                                        value={settings.tema}
                                        onChange={(e) => handleInputChange('tema', e.target.value)}
                                    >
                                        <option value="claro">Claro</option>
                                        <option value="escuro">Escuro</option>
                                        <option value="auto">Automático</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Idioma</label>
                                    <select
                                        className="form-select"
                                        value={settings.idioma}
                                        onChange={(e) => handleInputChange('idioma', e.target.value)}
                                    >
                                        <option value="pt-BR">Português (Brasil)</option>
                                        <option value="en-US">English (US)</option>
                                        <option value="es-ES">Español</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Fuso Horário</label>
                                    <select
                                        className="form-select"
                                        value={settings.timezone}
                                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                                    >
                                        <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                                        <option value="America/New_York">Nova York (GMT-5)</option>
                                        <option value="Europe/London">Londres (GMT+0)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Formato de Data</label>
                                    <select
                                        className="form-select"
                                        value={settings.formatoData}
                                        onChange={(e) => handleInputChange('formatoData', e.target.value)}
                                    >
                                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Configurações de Notificação */}
                        <div className="settings-section">
                            <div className="section-header">
                                <h3 className="section-title">Notificações</h3>
                                <p className="section-subtitle">Configure como receber alertas</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.emailNotificacoes}
                                            onChange={(e) => handleInputChange('emailNotificacoes', e.target.checked)}
                                        />
                                        <span className="checkbox-text">Notificações por Email</span>
                                    </label>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.smsNotificacoes}
                                            onChange={(e) => handleInputChange('smsNotificacoes', e.target.checked)}
                                        />
                                        <span className="checkbox-text">Notificações por SMS</span>
                                    </label>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.pushNotificacoes}
                                            onChange={(e) => handleInputChange('pushNotificacoes', e.target.checked)}
                                        />
                                        <span className="checkbox-text">Notificações Push</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Configurações de Segurança */}
                        <div className="settings-section">
                            <div className="section-header">
                                <h3 className="section-title">Segurança</h3>
                                <p className="section-subtitle">Configure as políticas de segurança</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="form-label">Timeout da Sessão (minutos)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={settings.sessaoTimeout}
                                        onChange={(e) => handleInputChange('sessaoTimeout', parseInt(e.target.value))}
                                        min="5"
                                        max="120"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tentativas de Login</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={settings.tentativasLogin}
                                        onChange={(e) => handleInputChange('tentativasLogin', parseInt(e.target.value))}
                                        min="3"
                                        max="10"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tamanho Mínimo da Senha</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={settings.senhaMinima}
                                        onChange={(e) => handleInputChange('senhaMinima', parseInt(e.target.value))}
                                        min="6"
                                        max="20"
                                    />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.doisFatores}
                                            onChange={(e) => handleInputChange('doisFatores', e.target.checked)}
                                        />
                                        <span className="checkbox-text">Autenticação de Dois Fatores</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Configurações de Backup */}
                        <div className="settings-section">
                            <div className="section-header">
                                <h3 className="section-title">Backup</h3>
                                <p className="section-subtitle">Configure o sistema de backup</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={settings.backupAutomatico}
                                            onChange={(e) => handleInputChange('backupAutomatico', e.target.checked)}
                                        />
                                        <span className="checkbox-text">Backup Automático</span>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Frequência do Backup</label>
                                    <select
                                        className="form-select"
                                        value={settings.frequenciaBackup}
                                        onChange={(e) => handleInputChange('frequenciaBackup', e.target.value)}
                                    >
                                        <option value="diario">Diário</option>
                                        <option value="semanal">Semanal</option>
                                        <option value="mensal">Mensal</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Retenção do Backup (dias)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={settings.retencaoBackup}
                                        onChange={(e) => handleInputChange('retencaoBackup', parseInt(e.target.value))}
                                        min="7"
                                        max="365"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="settings-actions">
                        <button className="btn btn-primary" onClick={handleSave}>
                            Salvar Configurações
                        </button>
                        <button className="btn btn-secondary" onClick={handleReset}>
                            Redefinir Padrões
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Configuracoes;
