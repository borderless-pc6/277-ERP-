import React, { useEffect } from 'react';
import './Notification.css';

export interface NotificationProps {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
    onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                );
            case 'error':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M10.29 3.86L1.82 18C1.64547 18.3024 1.5729 18.6453 1.61227 18.9823C1.65164 19.3193 1.80122 19.6345 2.04 19.88C2.27877 20.1255 2.59405 20.2884 2.931 20.346C3.26795 20.4036 3.61076 20.3532 3.91 20.2L13.09 15.54C13.3863 15.3889 13.6261 15.1613 13.7815 14.8856C13.9369 14.6099 14.0013 14.2978 14.0013 13.98C14.0013 13.6622 13.9369 13.3501 13.7815 13.0744C13.6261 12.7987 13.3863 12.5711 13.09 12.42L3.91 7.76C3.61076 7.6068 3.26795 7.5564 2.931 7.614C2.59405 7.6716 2.27877 7.8345 2.04 8.08C1.80122 8.3255 1.65164 8.6407 1.61227 8.9777C1.5729 9.3147 1.64547 9.6576 1.82 9.96L10.29 24.14C10.465 24.4429 10.7207 24.6902 11.0289 24.8538C11.337 25.0174 11.6858 25.0909 12.035 25.0669C12.3842 25.0429 12.7195 24.9227 12.9981 24.7219C13.2767 24.5211 13.4867 24.2481 13.6 23.94L22.89 2.06C23.0033 1.7519 23.0133 1.4189 22.9187 1.1051C22.8241 0.7913 22.6298 0.5107 22.36 0.3C22.0902 0.0893 21.7574 -0.0407 21.41 -0.06C21.0626 -0.0793 20.7158 0.0029 20.42 0.18L10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'info':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`notification notification-${type}`}>
            <div className="notification-icon">
                {getIcon()}
            </div>
            <div className="notification-content">
                <h4 className="notification-title">{title}</h4>
                <p className="notification-message">{message}</p>
            </div>
            <button
                className="notification-close"
                onClick={() => onClose(id)}
                aria-label="Fechar notificação"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default Notification;
