import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './common-components/Layout.jsx';
import ErrorPage from './pages/errorPage/ErrorPage.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import PrivatePAgeChat from './pages/chatPage/ChatPage.jsx';
import SignupPage from './pages/signupPage/SignupPage.jsx';
import { useAuth } from './context/index.jsx';
import AuthProvider from './AuthProvider.jsx';
import routes from './routes.js';

const PrivateRoute = ({ children }) => {
  const { loggedId } = useAuth();
  return loggedId ? children : <Navigate to={routes.login()} />;
// state={{ from: location }} - при необходимости задавать динамический путь после входа
};

const SetterRoute = ({ children }) => {
  const { loggedId } = useAuth();
  return loggedId ? <Navigate to={routes.layout()} /> : children;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.layout()} element={<Layout />}>
          <Route
            path={routes.login()}
            element={(
              <SetterRoute>
                <LoginPage />
              </SetterRoute>
            )}
          />
          <Route
            path={routes.layout()}
            element={(
              <PrivateRoute>
                <PrivatePAgeChat />
              </PrivateRoute>
          )}
          />
          <Route
            path={routes.signup()}
            element={(
              <SetterRoute>
                <SignupPage />
              </SetterRoute>
            )}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
