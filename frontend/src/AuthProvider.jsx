/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { AuthContext } from './context/index.jsx';

const AuthProvider = ({ children }) => {
  const state = JSON.parse(localStorage.getItem('userId'));
  const [loggedId, setLoggedId] = useState(state);
  const logIn = (data) => setLoggedId(data);
  const logOut = () => {
    localStorage.clear();
    setLoggedId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedId,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
