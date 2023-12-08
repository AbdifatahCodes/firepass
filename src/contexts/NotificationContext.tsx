import '~styles/components/notification.css'; // Make sure to create the corresponding CSS file
import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import type { ReactNode, FunctionComponent } from 'react';
import { FaTimes } from 'react-icons/fa';

// Define the shape of your context data
interface NotificationContextType {
  notify: ({ message, type }: { message: string; type: string }) => void;
}

// Provide a default value that matches the context type
const NotificationContext = createContext<NotificationContextType>({
  notify: () => {}, // Empty function as a placeholder
});

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const hideNotification = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    setNotification({ message: '', type: '', show: false });
  };

  const notify = ({ message, type }: { message: string; type: string }) => {
    setNotification({ message, type, show: true });
    timeoutId.current = setTimeout(() => {
      hideNotification();
    }, 5000);
  };

  useEffect(() => {
    // Clean up the timeout when the component unmounts
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <FaTimes className="notification-close" onClick={hideNotification} />
        </div>
      )}
    </NotificationContext.Provider>
  );
};