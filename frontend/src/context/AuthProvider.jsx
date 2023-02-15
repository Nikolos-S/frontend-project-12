import React, { useState, useMemo } from 'react';
import { AuthContext } from './index.jsx';

const AuthProvider = ({ children }) => {
  const state = JSON.parse(localStorage.getItem('userId'));
  const [loggedId, setLoggedId] = useState(state);
  const logIn = (data) => {
    setLoggedId(data);
    localStorage.setItem('userId', JSON.stringify(data));
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedId(null);
  };

  const getHeader = () => ({ headers: loggedId ? { Authorization: `Bearer ${loggedId.token}` } : {} });

  const value = useMemo(() => ({
    loggedId,
    logIn,
    logOut,
    getHeader,
  }), [loggedId]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
