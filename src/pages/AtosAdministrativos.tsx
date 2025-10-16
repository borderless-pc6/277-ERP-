import { useState } from 'react';
import './AtosAdministrativos.css';
import type { PageType } from '../types';

interface AtosAdministrativosProps {
    onLogout: () => void;
    onNavigate?: (page: PageType) => void;
}

const AtosAdministrativos = ({ onLogout, onNavigate }: AtosAdministrativosProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [formData, setFormData] = useState({
        tipo: 'Conselho Administrativo',
        mes: '09',
        ano: '2025',
        descricao: 'ATA DE REUNIÃO EXTRAORDINÁRIA DA CÚPULA DIRETIVA DO PREVPARAISO',
        arquivo: null as File | null
    });

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleInputChange = (field: string, value: string | File) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        handleInputChange('arquivo', file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
        // Aqui você pode implementar a lógica de envio
        alert('Atos administrativos cadastrado com sucesso!');
    };

    const handleClear = () => {
        setFormData({
            tipo: 'Conselho Administrativo',
            mes: '09',
            ano: '2025',
            descricao: 'ATA DE REUNIÃO EXTRAORDINÁRIA DA CÚPULA DIRETIVA DO PREVPARAISO',
            arquivo: null
        });
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

                    <button className="nav-item active" title="Atos Administrativos">
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
                        title="Aprovação de Atos"
                        onClick={() => onNavigate?.('aprovacao-atos')}
                    >
                        <div className="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        {!sidebarCollapsed && <span className="nav-text">Aprovação de Atos</span>}
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
                        <h1 className="page-title">Atos Administrativos</h1>
                        <p className="page-subtitle">Cadastro de documentos administrativos</p>
                    </div>
                    <div className="user-avatar">
                        <span>A</span>
                    </div>
                </header>

                {/* Form Container */}
                <div className="form-container">
                    <form className="atos-form" onSubmit={handleSubmit}>
                        {/* Tipo */}
                        <div className="form-group">
                            <label htmlFor="tipo" className="form-label">Tipo</label>
                            <select
                                id="tipo"
                                className="form-select"
                                value={formData.tipo}
                                onChange={(e) => handleInputChange('tipo', e.target.value)}
                            >
                                <option value="Conselho Administrativo">Conselho Administrativo</option>
                                <option value="Portaria">Portaria</option>
                                <option value="Decreto">Decreto</option>
                                <option value="Resolução">Resolução</option>
                                <option value="Lei">Lei</option>
                            </select>
                        </div>

                        {/* Mês */}
                        <div className="form-group">
                            <label htmlFor="mes" className="form-label">Mês</label>
                            <input
                                type="text"
                                id="mes"
                                className="form-input"
                                value={formData.mes}
                                onChange={(e) => handleInputChange('mes', e.target.value)}
                                placeholder="MM"
                                maxLength={2}
                            />
                        </div>

                        {/* Ano */}
                        <div className="form-group">
                            <label htmlFor="ano" className="form-label">Ano</label>
                            <input
                                type="text"
                                id="ano"
                                className="form-input"
                                value={formData.ano}
                                onChange={(e) => handleInputChange('ano', e.target.value)}
                                placeholder="AAAA"
                                maxLength={4}
                            />
                        </div>

                        {/* Descrição do Arquivo */}
                        <div className="form-group">
                            <label htmlFor="descricao" className="form-label">Descrição do Arquivo</label>
                            <textarea
                                id="descricao"
                                className="form-textarea"
                                value={formData.descricao}
                                onChange={(e) => handleInputChange('descricao', e.target.value)}
                                rows={3}
                                placeholder="Digite a descrição do arquivo..."
                            />
                        </div>

                        {/* Arquivo */}
                        <div className="form-group">
                            <label htmlFor="arquivo" className="form-label">Arquivo</label>
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    id="arquivo"
                                    className="file-input"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                />
                                <label htmlFor="arquivo" className="file-input-label">
                                    <span className="file-button">Escolher ficheiro</span>
                                    {formData.arquivo && (
                                        <span className="file-name">{formData.arquivo.name}</span>
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleClear}>
                                Limpar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AtosAdministrativos;
