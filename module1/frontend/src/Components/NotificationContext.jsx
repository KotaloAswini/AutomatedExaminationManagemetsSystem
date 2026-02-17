import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
            {children}
            {/* Notification Toast Overlay */}
            <div className="notification-overlay">
                {notifications.map((n) => (
                    <div key={n.id} className={`notification-toast ${n.type}`}>
                        <div className="notification-content">
                            {n.type === 'error' && '❌'} 
                            {n.type === 'success' && '✅'} 
                            {n.type === 'info' && 'ℹ️'}
                            {n.type === 'warning' && '⚠️'}
                            <span>{n.message}</span>
                        </div>
                        <button onClick={() => removeNotification(n.id)} className="notification-close">×</button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within NotificationProvider');
    return context;
};
