import "~styles/layout.css";
import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { setAuthCredentials } from '../../../services/authService';
import TabsHeader from "~components/TabsHeader";

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      uuid
      email
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loginUser, { loading, error }] = useLazyQuery(LOGIN_USER, {
    variables: { email, password },
    onCompleted: (data) => {
      setAuthCredentials(data.loginUser.token, data.loginUser.uuid);
      navigate('/home');
    },
  });

  const handleLogin = () => {
    loginUser();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : Please try again</p>;

  return (
    <div className="main">
      <TabsHeader isTitle={true} titleName="Login" />
      <div className="content">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
