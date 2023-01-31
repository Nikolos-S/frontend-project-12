import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as ErrorProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import i18n from './locales/i18n';
import App from './App.jsx';
import store from './slices/index.js';
import { SocketContext } from './context/index.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

const RunApp = () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  const submit = (action, payload, callback) => {
    socket.emit(action, payload, (response) => {
      if (response.status) {
        callback();
      }
    });
  };

  const container = ReactDOM.createRoot(document.getElementById('container'));
  container.render(
    <Provider store={store}>
      <ErrorProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <SocketContext.Provider value={{ submit }}>
              <App />
            </SocketContext.Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </ErrorProvider>
    </Provider>,
  );
};

export default RunApp;
