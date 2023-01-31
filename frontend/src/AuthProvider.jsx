/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { AuthContext } from './context/index.js';

const AuthProvider = ({ children }) => {
  const [loggedId, setLoggedId] = useState(null);
  const logIn = () => setLoggedId(true);
  const logOut = () => {
    localStorage.clear();
    setLoggedId(false);
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
