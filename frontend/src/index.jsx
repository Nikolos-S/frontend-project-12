import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import store from './slises/index.js';
import { SocketContext } from './context/index.js';
import { addMessage } from './slises/messagesSlice.js';
import { addChannel } from './slises/channelsSlice.js';

const startMessage = () => {
  const socket = io();
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
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

  const container = ReactDOM.createRoot(document.getElementById('container'));
  container.render(
    <Provider store={store}>
      <SocketContext.Provider value={{ handleSubmitMessage, handleSubmitChannell }}>
        <App />
      </SocketContext.Provider>
    </Provider>,
  );
};

startMessage();
