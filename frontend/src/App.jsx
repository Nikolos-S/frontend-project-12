import React, { useState, useMemo } from 'react';
import {
  Routes,
  Route,
  Navigate,
  // useLocation,
} from 'react-router-dom';
import Header from './pages/Nav.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LoginForm from './pages/LoginForm.jsx';
import Messenger from './pages/Messenger.jsx';
import AuthContext from './context/index.js';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);

  const value = useMemo(() => ({ loggedIn, setLoggedIn }), [loggedIn]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  // const location = useLocation();
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/login" />; // state={{ from: location }} - при необходимости задавать динамический путь после входа
};

const App = () => (
  <AuthProvider>
    <Header />
    <div className="container p-3">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Messenger />
            </PrivateRoute>
          )}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  </AuthProvider>
);

export default App;
