import React, { createContext, useContext, useState, type ReactNode } from 'react';
import Notification from '../components/Notification';
import '../components/Notification.css';

export interface NotificationData {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
}

interface NotificationContextType {
    notifications: NotificationData[];
    addNotification: (notification: Omit<NotificationData, 'id'>) => void;
    removeNotification: (id: string) => void;
    success: (title: string, message: string, duration?: number) => void;
    error: (title: string, message: string, duration?: number) => void;
    warning: (title: string, message: string, duration?: number) => void;
    info: (title: string, message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const addNotification = (notification: Omit<NotificationData, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification: NotificationData = {
            ...notification,
            id,
        };

        setNotifications(prev => [...prev, newNotification]);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const success = (title: string, message: string, duration?: number) => {
        addNotification({ type: 'success', title, message, duration });
    };

    const error = (title: string, message: string, duration?: number) => {
        addNotification({ type: 'error', title, message, duration });
    };

    const warning = (title: string, message: string, duration?: number) => {
        addNotification({ type: 'warning', title, message, duration });
    };

    const info = (title: string, message: string, duration?: number) => {
        addNotification({ type: 'info', title, message, duration });
    };

    const value: NotificationContextType = {
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        warning,
        info,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <div className="notifications-container">
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        {...notification}
                        onClose={removeNotification}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
