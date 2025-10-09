import { useState } from 'react';
import './Register.css';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        console.log('Registro:', { fullName, email, password });
        // Aqui você implementará a lógica de registro
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <div className="admin-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4 6V11C4 16.55 7.84 21.74 13 23C18.16 21.74 22 16.55 22 11V6L12 2ZM12 11.99H20C19.47 16.11 16.72 19.78 13 20.93V12H4V7.3L12 3.69V11.99Z" fill="white" />
                        </svg>
                    </div>
                    <h1 className="admin-title">Admin</h1>
                </div>

                <div className="register-content">
                    <h2 className="register-title">Criar conta</h2>
                    <p className="register-subtitle">
                        Preencha os dados abaixo para criar sua conta administrativa
                    </p>

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label htmlFor="fullName" className="form-label">Nome completo</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.5 17.5C17.5 14.7386 14.1421 12.5 10 12.5C5.85786 12.5 2.5 14.7386 2.5 17.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="João Silva"
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.33334 3.33334H16.6667C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6667 16.6667H3.33334C2.41668 16.6667 1.66668 15.9167 1.66668 15V5.00001C1.66668 4.08334 2.41668 3.33334 3.33334 3.33334Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.3333 5L10 10.8333L1.66666 5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@exemplo.com"
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8333 9.16667H4.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91286 16.7538 9.16667 15.8333 9.16667Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83334 9.16667V5.83334C5.83334 4.72827 6.27233 3.66846 7.05373 2.88706C7.83513 2.10566 8.89494 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10566 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83334V9.16667" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••"
                                    className="form-input"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirmar senha</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8333 9.16667H4.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91286 16.7538 9.16667 15.8333 9.16667Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.83334 9.16667V5.83334C5.83334 4.72827 6.27233 3.66846 7.05373 2.88706C7.83513 2.10566 8.89494 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10566 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83334V9.16667" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••"
                                    className="form-input"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-button">
                            Criar conta
                        </button>

                        <div className="divider">
                            <span>OU</span>
                        </div>

                        <p className="login-text">
                            Já tem uma conta? <a href="#" className="login-link">Fazer login</a>
                        </p>
                    </form>
                </div>

                <div className="register-footer">
                    <p>
                        Ao criar uma conta, você concorda com nossos{' '}
                        <a href="#" className="footer-link">Termos de Serviço</a> e{' '}
                        <a href="#" className="footer-link">Política de Privacidade</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

