import { createContext, useContext } from 'react';

export const AuthContext = createContext({});
export const SocketContext = createContext(null);

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
