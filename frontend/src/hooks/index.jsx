import { useContext } from 'react';
import authContext from '../context';

const useAuth = () => useContext(authContext);

export default useAuth;
