import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './pages/Nav.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PrivatePAgeChat from './pages/PrivatePAgeChat.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { useAuth } from './hooks/index.jsx';
import AuthProvider from './AuthProvider.jsx';

const PrivateRoute = ({ children, loginPath }) => {
  const { loggedId } = useAuth();
  return loggedId ? children : <Navigate to={loginPath} />;
// state={{ from: location }} - при необходимости задавать динамический путь после входа
};

const SetterRoute = ({ children }) => {
  const { loggedId } = useAuth();
  return loggedId ? <Navigate to="/" /> : children;
};

const App = () => {
  const loginPath = '/login';
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Header />
          <Routes>
            <Route
              path={loginPath}
              element={(
                <SetterRoute>
                  <LoginPage />
                </SetterRoute>
              )}
            />
            <Route
              path="/"
              element={(
                <PrivateRoute loginPath={loginPath}>
                  <PrivatePAgeChat />
                </PrivateRoute>
            )}
            />
            <Route
              path="/signup"
              element={(
                <SetterRoute>
                  <SignupPage />
                </SetterRoute>
              )}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
