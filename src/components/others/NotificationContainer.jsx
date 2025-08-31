import React from 'react';
import { useNotification } from '../../context/NotificationProvider';
import { FiX, FiInfo, FiCheckCircle, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotification();

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <FiCheckCircle className="text-green-500" />;
            case 'warning':
                return <FiAlertTriangle className="text-yellow-500" />;
            case 'error':
                return <FiAlertCircle className="text-red-500" />;
            default:
                return <FiInfo className="text-blue-500" />;
        }
    };

    const getBackgroundColor = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${getBackgroundColor(notification.type)} border rounded-lg p-4 shadow-lg max-w-sm animate-slide-in`}
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-0.5">
                            {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-800">
                                {notification.message}
                            </p>
                        </div>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationContainer;
