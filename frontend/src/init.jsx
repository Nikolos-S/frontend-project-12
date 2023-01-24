import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider, useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import i18n from './locales/i18n';
import App from './App.jsx';
import store from './slices/index.js';
import { SocketContext } from './context/index.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import getToast from './toast/toast';

const RunApp = () => {
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  const { t } = useTranslation;
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

  const handleSubmitMessage = (payload, callback) => {
    socket.emit('newMessage', payload, (response) => {
      if (response.status) {
        callback();
      }
    });
  };

  const handleSubmitChannell = (payload) => {
    socket.emit('newChannel', payload, (response) => {
      if (response.status) {
        getToast(t('toast.add'), 'success');
      }
    });
  };

  const handleRemoveChannel = (payload) => {
    socket.emit('removeChannel', payload, (response) => {
      if (response.status) {
        getToast(t('toast.remove'), 'success');
      }
    });
  };

  const handleRenameChannel = (payload) => {
    socket.emit('renameChannel', payload, (response) => {
      if (response.status) {
        getToast(t('toast.rename'), 'success');
      }
    });
  };

  const container = ReactDOM.createRoot(document.getElementById('container'));
  container.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider value={
          {
            handleSubmitMessage,
            handleSubmitChannell,
            handleRemoveChannel,
            handleRenameChannel,
          }
        }
        >
          <App />
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>,
  );
};

export default RunApp;
