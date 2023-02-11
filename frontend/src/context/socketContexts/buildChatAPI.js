import store from '../../slices/index.js';
import { addMessage } from '../../slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setChannel,
} from '../../slices/channelsSlice.js';

const buildChatAPI = (socket) => {
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

  const handleSubmitChannell = (payload, callback) => {
    socket.emit('newChannel', payload, (response) => {
      if (response.status) {
        const newIdChannel = { id: response.data.id };
        store.dispatch(setChannel(newIdChannel));
        store.dispatch(addChannel(response.data));
        callback();
      }
    });
  };

  const handleRemoveChannel = (payload, callback) => {
    socket.emit('removeChannel', payload, (response) => {
      if (response.status) {
        callback();
      }
    });
  };

  const handleRenameChannel = (payload, callback) => {
    socket.emit('renameChannel', payload, (response) => {
      if (response.status) {
        callback();
      }
    });
  };
  return {
    handleSubmitMessage,
    handleSubmitChannell,
    handleRemoveChannel,
    handleRenameChannel,
  };
};

export default buildChatAPI;
