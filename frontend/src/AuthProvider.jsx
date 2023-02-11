import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from './context/index.jsx';
import { setStatus } from './slices/downloadStatusSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const state = JSON.parse(localStorage.getItem('userId'));
  const [loggedId, setLoggedId] = useState(state);
  const logIn = (data) => {
    setLoggedId(data);
    localStorage.setItem('userId', JSON.stringify(data));
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedId(null);
    dispatch(setStatus());
  };

  const value = useMemo(() => ({ loggedId, logIn, logOut }), [loggedId]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
