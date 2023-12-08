import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Logins from './components/screens/vault/Logins';
import Login from './components/screens/account/Login';
import Logout from './components/screens/account/Logout'
import { verifyAuth } from './services/authService';
import { TabProvider } from './contexts/TabContext';
import { NotificationProvider } from '~contexts/NotificationContext';
import ViewLoginItem from '~components/screens/vault/ViewLoginItem';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function IndexPopup() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const { currentTab } = useTabState(); // Import and use the tab state here

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyAuth();
      setIsAuthenticated(result);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <TabProvider>
      <NotificationProvider>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<MainLayout />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          <Route path="/home" element={<MainLayout />} />
          <Route path="/logins" element={<Logins />} />
          <Route path="/view-login-item" element={<ViewLoginItem />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
          {/* ... Other unauthenticated routes */}
        </Routes>
      </Router>
      </NotificationProvider>
      </TabProvider>
    </ApolloProvider>
  );
}

export default IndexPopup;
