import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', { email, password });
        // Aqui você implementará a lógica de autenticação
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="admin-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4 6V11C4 16.55 7.84 21.74 13 23C18.16 21.74 22 16.55 22 11V6L12 2ZM12 11.99H20C19.47 16.11 16.72 19.78 13 20.93V12H4V7.3L12 3.69V11.99Z" fill="white" />
                        </svg>
                    </div>
                    <h1 className="admin-title">Admin</h1>
                </div>

                <div className="login-content">
                    <h2 className="welcome-title">Bem-vindo de volta</h2>
                    <p className="welcome-subtitle">
                        Entre com suas credenciais para acessar o painel administrativo
                    </p>

                    <form onSubmit={handleSubmit} className="login-form">
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
                            <div className="label-row">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <a href="#" className="forgot-link">Esqueceu a senha?</a>
                            </div>
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
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-button">
                            Entrar
                        </button>

                        <div className="divider">
                            <span>OU</span>
                        </div>

                        <p className="signup-text">
                            Não tem uma conta? <a href="#" className="signup-link">Criar conta</a>
                        </p>
                    </form>
                </div>

                <div className="login-footer">
                    <p>
                        Ao continuar, você concorda com nossos{' '}
                        <a href="#" className="footer-link">Termos de Serviço</a> e{' '}
                        <a href="#" className="footer-link">Política de Privacidade</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

