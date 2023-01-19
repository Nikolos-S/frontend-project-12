/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { io } from 'socket.io-client';
// import store from './slises/index.js';
import { useDispatch } from 'react-redux';
import { addMessage } from './slises/messagesSlice.js';
import { addChannel } from './slises/channelsSlice.js';
import Header from './pages/Nav.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PrivatePage from './pages/PrivatePage.jsx';
import AuthContext from './context/index.js';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedId, setLoggedId] = useState(null);
  const logIn = () => setLoggedId(true);
  const logOut = () => {
    localStorage.clear();
    setLoggedId(false);
  };

  const dispatch = useDispatch();
  const socket = io();
  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });

  const handleSubmitMessage = (payload) => {
    socket.emit('newMessage', payload);
  };

  const handleSubmitChannell = (payload) => {
    socket.emit('newChannel', payload);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedId,
        logIn,
        logOut,
        handleSubmitMessage,
        handleSubmitChannell,
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
