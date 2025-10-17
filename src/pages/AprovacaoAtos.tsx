import { useState } from 'react';
import './AprovacaoAtos.css';
import { useNotifications } from '../context/NotificationContext';
import type { PageType } from '../types';

interface AprovacaoAtosProps {
    onLogout: () => void;
    onNavigate?: (page: PageType) => void;
}

interface AtoAdministrativo {
    id: string;
    prefeitura: string;
    tipo: string;
    mesAno: string;
    descricao: string;
    status: 'pendente' | 'aprovado' | 'reprovado';
    arquivo: string;
    dataEnvio: string;
}

const AprovacaoAtos = ({ onLogout, onNavigate }: AprovacaoAtosProps) => {
    const { success, error } = useNotifications();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'todos' | 'pendente' | 'aprovado' | 'reprovado'>('todos');
    const [selectedAto, setSelectedAto] = useState<AtoAdministrativo | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [atoToReject, setAtoToReject] = useState<AtoAdministrativo | null>(null);

    // Dados mockados para demonstração
    const [atosData, setAtosData] = useState<AtoAdministrativo[]>([
        {
            id: '1',
            prefeitura: 'Prefeitura de São Paulo',
            tipo: 'Decreto',
            mesAno: 'Dezembro/2024',
            descricao: 'Decreto de Reajuste Salarial dos Servidores',
            status: 'pendente',
            arquivo: 'decreto_reajuste_2024.pdf',
            dataEnvio: '15/12/2024'
        },
        {
            id: '2',
            prefeitura: 'Prefeitura do Rio de Janeiro',
            tipo: 'Lei',
            mesAno: 'Dezembro/2024',
            descricao: 'Lei de Orçamento Anual 2025',
            status: 'aprovado',
            arquivo: 'lei_orcamento_2025.pdf',
            dataEnvio: '10/12/2024'
        },
        {
            id: '3',
            prefeitura: 'Prefeitura de Belo Horizonte',
            tipo: 'Portaria',
            mesAno: 'Novembro/2024',
            descricao: 'Portaria de Contratação de Serviços',
            status: 'reprovado',
            arquivo: 'portaria_contratacao.pdf',
            dataEnvio: '28/11/2024'
        },
        {
            id: '4',
            prefeitura: 'Prefeitura de Salvador',
            tipo: 'Resolução',
            mesAno: 'Dezembro/2024',
            descricao: 'Resolução sobre Política de Transparência',
            status: 'pendente',
            arquivo: 'resolucao_transparencia.pdf',
            dataEnvio: '20/12/2024'
        },
        {
            id: '5',
            prefeitura: 'Prefeitura de Brasília',
            tipo: 'Decreto',
            mesAno: 'Dezembro/2024',
            descricao: 'Decreto de Criação de Secretaria',
            status: 'aprovado',
            arquivo: 'decreto_criacao_secretaria.pdf',
            dataEnvio: '18/12/2024'
        }
    ]);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleAprovar = (id: string) => {
        setAtosData(prev => prev.map(ato =>
            ato.id === id ? { ...ato, status: 'aprovado' as const } : ato
        ));
        success('Atos Aprovado', 'O atos administrativo foi aprovado com sucesso!');
    };

    const handleReprovar = (ato: AtoAdministrativo) => {
        setAtoToReject(ato);
        setShowRejectModal(true);
    };

    const confirmReject = () => {
        if (atoToReject && rejectReason.trim()) {
            setAtosData(prev => prev.map(ato =>
                ato.id === atoToReject.id ? { ...ato, status: 'reprovado' as const } : ato
            ));
            setShowRejectModal(false);
            setRejectReason('');
            setAtoToReject(null);
            error('Atos Reprovado', `O atos administrativo foi reprovado.\nMotivo: ${rejectReason}`);
        }
    };

    const cancelReject = () => {
        setShowRejectModal(false);
        setRejectReason('');
        setAtoToReject(null);
    };

    const handleVerArquivo = (ato: AtoAdministrativo) => {
        setSelectedAto(ato);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAto(null);
    };

    const filteredAtos = atosData.filter(ato => {
        const matchesSearch = ato.prefeitura.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ato.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ato.tipo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'todos' || ato.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pendente':
                return '#6B7280'; // Cinza neutro
            case 'aprovado':
                return '#10B981'; // Verde
            case 'reprovado':
                return '#EF4444'; // Vermelho
            default:
                return '#6B7280';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pendente':
                return 'Pendente';
            case 'aprovado':
                return 'Aprovado';
            case 'reprovado':
                return 'Reprovado';
            default:
                return status;
        }
    };

    return (
        <div className="aprovacao-atos-container">
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
                    <button className="nav-item" title="Dashboard" onClick={() => onNavigate?.('dashboard')}>
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

                    <button
                        className="nav-item active"
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
                        <h1 className="page-title">Aprovação de Atos</h1>
                        <p className="page-subtitle">Gerencie a aprovação de documentos administrativos</p>
                    </div>
                    <div className="user-avatar">
                        <span>A</span>
                    </div>
                </header>

                {/* Filters */}
                <div className="filters-container">
                    <div className="search-container">
                        <div className="search-input">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar por prefeitura, tipo ou descrição..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="status-filter">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                        >
                            <option value="todos">Todos os Status</option>
                            <option value="pendente">Pendente</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="reprovado">Reprovado</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="table-container">
                    <table className="atos-table">
                        <thead>
                            <tr>
                                <th>Prefeitura</th>
                                <th>Tipo</th>
                                <th>Mês/Ano</th>
                                <th>Descrição</th>
                                <th>Status</th>
                                <th>Data Envio</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAtos.map((ato) => (
                                <tr key={ato.id} className="table-row">
                                    <td className="prefeitura-cell">
                                        <div className="prefeitura-info">
                                            <span className="prefeitura-name">{ato.prefeitura}</span>
                                        </div>
                                    </td>
                                    <td className="tipo-cell">
                                        <span className="tipo-badge">{ato.tipo}</span>
                                    </td>
                                    <td className="mes-ano-cell">{ato.mesAno}</td>
                                    <td className="descricao-cell">
                                        <span className="descricao-text">{ato.descricao}</span>
                                    </td>
                                    <td className="status-cell">
                                        <span
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(ato.status) }}
                                        >
                                            {getStatusText(ato.status)}
                                        </span>
                                    </td>
                                    <td className="data-cell">{ato.dataEnvio}</td>
                                    <td className="actions-cell">
                                        <div className="actions-buttons">
                                            <button
                                                className="action-btn view-btn"
                                                onClick={() => handleVerArquivo(ato)}
                                                title="Ver Arquivo"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                            </button>
                                            {ato.status === 'pendente' && (
                                                <>
                                                    <button
                                                        className="action-btn approve-btn"
                                                        onClick={() => handleAprovar(ato.id)}
                                                        title="Aprovar"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="action-btn reject-btn"
                                                        onClick={() => handleReprovar(ato)}
                                                        title="Reprovar"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredAtos.length === 0 && (
                        <div className="no-results">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <h3>Nenhum ato encontrado</h3>
                            <p>Tente ajustar os filtros de busca para encontrar o que procura.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal de Visualização */}
            {showModal && selectedAto && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Visualizar Arquivo</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="file-info">
                                <div className="file-details">
                                    <h3>{selectedAto.descricao}</h3>
                                    <p><strong>Prefeitura:</strong> {selectedAto.prefeitura}</p>
                                    <p><strong>Tipo:</strong> {selectedAto.tipo}</p>
                                    <p><strong>Mês/Ano:</strong> {selectedAto.mesAno}</p>
                                    <p><strong>Arquivo:</strong> {selectedAto.arquivo}</p>
                                    <p><strong>Data de Envio:</strong> {selectedAto.dataEnvio}</p>
                                    <p><strong>Status:</strong>
                                        <span
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(selectedAto.status) }}
                                        >
                                            {getStatusText(selectedAto.status)}
                                        </span>
                                    </p>
                                </div>
                                <div className="file-preview">
                                    <div className="preview-placeholder">
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>Visualização do arquivo PDF</p>
                                        <button className="download-btn">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Baixar Arquivo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal}>
                                Fechar
                            </button>
                            {selectedAto.status === 'pendente' && (
                                <>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            closeModal();
                                            handleReprovar(selectedAto);
                                        }}
                                    >
                                        Reprovar
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleAprovar(selectedAto.id);
                                            closeModal();
                                        }}
                                    >
                                        Aprovar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Recusa */}
            {showRejectModal && atoToReject && (
                <div className="modal-overlay" onClick={cancelReject}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Recusar Atos Administrativo</h2>
                            <button className="modal-close" onClick={cancelReject}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="reject-info">
                                <h3>Você está prestes a recusar o seguinte atos:</h3>
                                <div className="ato-details">
                                    <p><strong>Prefeitura:</strong> {atoToReject.prefeitura}</p>
                                    <p><strong>Tipo:</strong> {atoToReject.tipo}</p>
                                    <p><strong>Descrição:</strong> {atoToReject.descricao}</p>
                                    <p><strong>Mês/Ano:</strong> {atoToReject.mesAno}</p>
                                </div>
                                <div className="reason-section">
                                    <label htmlFor="reject-reason" className="reason-label">
                                        Motivo da recusa <span className="required">*</span>
                                    </label>
                                    <textarea
                                        id="reject-reason"
                                        className="reason-textarea"
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Digite o motivo pelo qual este atos está sendo recusado..."
                                        rows={4}
                                        required
                                    />
                                    {!rejectReason.trim() && (
                                        <p className="error-message">Por favor, informe o motivo da recusa.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={cancelReject}>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={confirmReject}
                                disabled={!rejectReason.trim()}
                            >
                                Confirmar Recusa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AprovacaoAtos;
