import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import store from './slices/index.js';
import { SocketContext } from './context/index.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

const startMessage = () => {
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

  const handleSubmitMessage = (payload) => {
    socket.emit('newMessage', payload, (response) => {
      console.log(response.status);
    });
  };

  const handleSubmitChannell = (payload) => {
    socket.emit('newChannel', payload, (response) => {
      console.log(response.status);
    });
  };

  const handleRemoveChannel = (payload) => {
    socket.emit('removeChannel', payload, (response) => {
      console.log(response.status);
    });
  };

  const handleRenameChannel = (payload) => {
    socket.emit('renameChannel', payload, (response) => {
      console.log(response.status);
    });
  };

  const container = ReactDOM.createRoot(document.getElementById('container'));
  container.render(
    <Provider store={store}>
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
    </Provider>,
  );
};

startMessage();
