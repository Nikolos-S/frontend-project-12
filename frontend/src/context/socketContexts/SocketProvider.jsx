import React from 'react';
import { SocketContext } from '../index.jsx';
import buildChatAPI from './buildChatAPI.js';

const SocketProvider = ({ children, socket }) => {
  const requests = buildChatAPI(socket);
  return (
    <SocketContext.Provider value={requests}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
