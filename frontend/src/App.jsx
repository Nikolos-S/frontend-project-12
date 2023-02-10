import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './common-components/Layout.jsx';
import ErrorPage from './pages/errorPage/ErrorPage.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import ChatPage from './pages/chatPage/ChatPage.jsx';
import SignupPage from './pages/signupPage/SignupPage.jsx';
import { useAuth } from './context/index.jsx';
import AuthProvider from './AuthProvider.jsx';
import routes from './routes.js';

const PrivateRoute = () => {
  const { loggedId } = useAuth();
  return loggedId ? <Outlet /> : <Navigate to={routes.login()} />;
// state={{ from: location }} - при необходимости задавать динамический путь после входа
};

const SetterRoute = () => {
  const { loggedId } = useAuth();
  return loggedId ? <Navigate to={routes.layout()} /> : <Outlet />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.layout()} element={<Layout />}>
          <Route path={routes.login()} element={<SetterRoute />}>
            <Route path={routes.login()} element={<LoginPage />} />
          </Route>
          <Route path={routes.layout()} element={<PrivateRoute />}>
            <Route path={routes.layout()} element={<ChatPage />} />
          </Route>
          <Route path={routes.signup()} element={<SetterRoute />}>
            <Route path={routes.signup()} element={<SignupPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
