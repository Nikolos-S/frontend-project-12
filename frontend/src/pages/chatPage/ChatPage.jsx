import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downloadStatusSelector, setStatus } from '../../slices/downloadStatusSlice.js';
import fetchData from '../../slices/fetchData.js';
import { useAuth } from '../../context/index.jsx';
import LoadingComponent from './components/LoadingComponent.jsx';
import Chat from './components/Chat';

const ChatPAge = () => {
  const dispatch = useDispatch();

  const { loadingStatus, error } = useSelector(downloadStatusSelector);
  const { loggedId, logOut } = useAuth();

  useEffect(() => {
    try {
      dispatch(fetchData(loggedId));
    } catch (err) {
      console.log(error);
      if (err.response.status === 401) {
        logOut();
        dispatch(setStatus());
      }
    }
  }, [dispatch]);

  return (loadingStatus === 'loading' ? <LoadingComponent /> : <Chat />);
};

export default ChatPAge;
