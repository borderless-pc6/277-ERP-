import { useState, useRef, useEffect } from 'react';
import './Users.css';
import type { PageType, User } from '../types';

interface UsersProps {
    onLogout: () => void;
    onNavigate?: (page: PageType) => void;
}

// Dados mockados dos usuários baseados na imagem
const mockUsers: User[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        createdAt: new Date('2024-01-15'),
        status: 'active',
        role: 'admin'
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '(21) 97654-3210',
        createdAt: new Date('2024-01-22'),
        status: 'active',
        role: 'editor'
    },
    {
        id: '3',
        name: 'Pedro Costa',
        email: 'pedro.costa@email.com',
        phone: '(31) 96543-2109',
        createdAt: new Date('2024-02-10'),
        status: 'inactive',
        role: 'viewer'
    },
    {
        id: '4',
        name: 'Ana Oliveira',
        email: 'ana.oliveira@email.com',
        phone: '(41) 95432-1098',
        createdAt: new Date('2024-03-05'),
        status: 'active',
        role: 'editor'
    },
    {
        id: '5',
        name: 'Carlos Ferreira',
        email: 'carlos.ferreira@email.com',
        phone: '(51) 94321-0987',
        createdAt: new Date('2024-03-18'),
        status: 'active',
        role: 'viewer'
    },
    {
        id: '6',
        name: 'Juliana Lima',
        email: 'juliana.lima@email.com',
        phone: '(61) 93210-9876',
        createdAt: new Date('2024-03-25'),
        status: 'active',
        role: 'admin'
    }
];

const Users = ({ onLogout, onNavigate }: UsersProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editForm, setEditForm] = useState<Partial<User>>({});
    const [addForm, setAddForm] = useState<Partial<User>>({
        name: '',
        email: '',
        phone: '',
        status: 'active',
        role: 'viewer'
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR');
    };

    const toggleDropdown = (userId: string) => {
        setOpenDropdown(openDropdown === userId ? null : userId);
    };

    const handleAction = (action: string, user: User) => {
        setSelectedUser(user);
        setOpenDropdown(null);

        switch (action) {
            case 'Editar':
                setEditForm({ ...user });
                setShowEditModal(true);
                break;
            case 'Ver Detalhes':
                setShowDetailsModal(true);
                break;
            case 'Desativar':
                setShowDeactivateModal(true);
                break;
        }
    };

    const closeModals = () => {
        setShowEditModal(false);
        setShowDetailsModal(false);
        setShowDeactivateModal(false);
        setShowAddModal(false);
        setSelectedUser(null);
        setEditForm({});
        setAddForm({
            name: '',
            email: '',
            phone: '',
            status: 'active',
            role: 'viewer'
        });
    };

    const handleSaveEdit = () => {
        if (selectedUser && editForm) {
            setUsers(users.map(user =>
                user.id === selectedUser.id ? { ...user, ...editForm } : user
            ));
            closeModals();
        }
    };

    const handleDeactivate = () => {
        if (selectedUser) {
            setUsers(users.map(user =>
                user.id === selectedUser.id ? { ...user, status: 'inactive' } : user
            ));
            closeModals();
        }
    };

    const handleAddUser = () => {
        if (addForm.name && addForm.email && addForm.phone) {
            const newUser: User = {
                id: Date.now().toString(),
                name: addForm.name,
                email: addForm.email,
                phone: addForm.phone,
                status: addForm.status || 'active',
                role: addForm.role || 'viewer',
                createdAt: new Date()
            };
            setUsers([...users, newUser]);
            closeModals();
        }
    };

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            const isDropdownItem = target.closest('.dropdown-item');
            const isDropdownButton = target.closest('.user-menu-button');

            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !isDropdownItem &&
                !isDropdownButton) {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="users-container">
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

                    <button className="nav-item active" title="Usuários">
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
                        <h1 className="page-title">Usuários</h1>
                        <p className="page-subtitle">Gerencie os usuários do sistema</p>
                    </div>
                    <div className="header-actions">
                        <button className="add-user-button" onClick={() => setShowAddModal(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM22 21V19C22.0011 18.1137 21.7081 17.2528 21.1614 16.5523C20.6147 15.8519 19.8507 15.3516 19 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            + Adicionar Usuário
                        </button>
                        <div className="user-avatar">
                            <span>A</span>
                        </div>
                    </div>
                </header>

                {/* Search Bar */}
                <div className="search-container">
                    <div className="search-input">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar por nome ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Users Grid */}
                <div className="users-grid">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="user-card">
                            <div className="user-card-header">
                                <div className="user-avatar-card">
                                    <span>{getInitials(user.name)}</span>
                                </div>
                                <div className="user-menu-container" ref={dropdownRef}>
                                    <button
                                        className="user-menu-button"
                                        onClick={() => toggleDropdown(user.id)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="1" fill="currentColor" />
                                            <circle cx="12" cy="5" r="1" fill="currentColor" />
                                            <circle cx="12" cy="19" r="1" fill="currentColor" />
                                        </svg>
                                    </button>

                                    {openDropdown === user.id && (
                                        <div className="user-dropdown">
                                            <div className="dropdown-header">Ações</div>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleAction('Editar', user)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleAction('Ver Detalhes', user)}
                                            >
                                                Ver Detalhes
                                            </button>
                                            <button
                                                className="dropdown-item danger"
                                                onClick={() => handleAction('Desativar', user)}
                                            >
                                                Desativar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="user-info">
                                <h3 className="user-name">{user.name}</h3>
                                <div className={`user-status ${user.status}`}>
                                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                                </div>
                            </div>

                            <div className="user-details">
                                <div className="user-detail">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{user.email}</span>
                                </div>

                                <div className="user-detail">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92H4.18C3.90264 21.9451 3.62312 21.9119 3.35929 21.8227C3.09546 21.7335 2.85322 21.5901 2.64796 21.4019C2.4427 21.2136 2.27909 20.9845 2.16747 20.7293C2.05585 20.4742 1.9989 20.1985 2 19.92V16.92L12 11.92L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 6.92L12 1.92L2 6.92L12 11.92L22 6.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{user.phone}</span>
                                </div>

                                <div className="user-detail">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{formatDate(user.createdAt)}</span>
                                </div>
                            </div>

                            <div className="user-role">
                                {user.role === 'admin' ? 'Admin' : user.role === 'editor' ? 'Editor' : 'Viewer'}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal de Editar Usuário */}
            {showEditModal && selectedUser && (
                <div className="modal-overlay" onClick={closeModals}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Editar Usuário</h2>
                            <button className="modal-close" onClick={closeModals}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={editForm.name || ''}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={editForm.email || ''}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Telefone</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={editForm.phone || ''}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    value={editForm.status || 'active'}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'active' | 'inactive' })}
                                >
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Função</label>
                                <select
                                    className="form-select"
                                    value={editForm.role || 'viewer'}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'admin' | 'editor' | 'viewer' })}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModals}>
                                Cancelar
                            </button>
                            <button className="btn btn-primary" onClick={handleSaveEdit}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Ver Detalhes */}
            {showDetailsModal && selectedUser && (
                <div className="modal-overlay" onClick={closeModals}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Detalhes do Usuário</h2>
                            <button className="modal-close" onClick={closeModals}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="user-details-modal">
                                <div className="user-avatar-large">
                                    <span>{getInitials(selectedUser.name)}</span>
                                </div>

                                <div className="user-details-info">
                                    <h3 className="user-details-name">{selectedUser.name}</h3>
                                    <div className={`user-details-status ${selectedUser.status}`}>
                                        {selectedUser.status === 'active' ? 'Ativo' : 'Inativo'}
                                    </div>

                                    <div className="user-details-list">
                                        <div className="detail-item">
                                            <span className="detail-label">Email:</span>
                                            <span className="detail-value">{selectedUser.email}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Telefone:</span>
                                            <span className="detail-value">{selectedUser.phone}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Data de Criação:</span>
                                            <span className="detail-value">{formatDate(selectedUser.createdAt)}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Função:</span>
                                            <span className="detail-value">
                                                {selectedUser.role === 'admin' ? 'Admin' :
                                                    selectedUser.role === 'editor' ? 'Editor' : 'Viewer'}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">ID:</span>
                                            <span className="detail-value">{selectedUser.id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={closeModals}>
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Desativar Usuário */}
            {showDeactivateModal && selectedUser && (
                <div className="modal-overlay" onClick={closeModals}>
                    <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Desativar Usuário</h2>
                            <button className="modal-close" onClick={closeModals}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="warning-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div className="warning-content">
                                <h3 className="warning-title">Tem certeza?</h3>
                                <p className="warning-text">
                                    Você está prestes a desativar o usuário <strong>{selectedUser.name}</strong>.
                                    Esta ação pode ser revertida posteriormente.
                                </p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModals}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={handleDeactivate}>
                                Desativar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Adicionar Usuário */}
            {showAddModal && (
                <div className="modal-overlay" onClick={closeModals}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Adicionar Usuário</h2>
                            <button className="modal-close" onClick={closeModals}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Nome *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={addForm.name || ''}
                                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                                    placeholder="Digite o nome completo"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={addForm.email || ''}
                                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                                    placeholder="Digite o email"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Telefone *</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={addForm.phone || ''}
                                    onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                                    placeholder="(11) 99999-9999"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    value={addForm.status || 'active'}
                                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value as 'active' | 'inactive' })}
                                >
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Função</label>
                                <select
                                    className="form-select"
                                    value={addForm.role || 'viewer'}
                                    onChange={(e) => setAddForm({ ...addForm, role: e.target.value as 'admin' | 'editor' | 'viewer' })}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModals}>
                                Cancelar
                            </button>
                            <button className="btn btn-primary" onClick={handleAddUser}>
                                Adicionar Usuário
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
