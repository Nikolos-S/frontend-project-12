/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './pages/Nav.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PrivatePage from './pages/PrivatePage.jsx';
import { AuthContext } from './context/index.js';
import { useAuth } from './hooks/index.jsx';

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

const PrivateRoute = ({ children }) => {
  const { loggedId } = useAuth();
  return loggedId ? children : <Navigate to="/login" />;
// state={{ from: location }} - при необходимости задавать динамический путь после входа
// const location = useLocation();
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
