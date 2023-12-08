import '~styles/components/notification.css'; // Make sure to create the corresponding CSS file
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const NotificationComponent = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <FaTimes className="notification-close" onClick={() => setIsVisible(false)} />
    </div>
  );
};

export default NotificationComponent;
