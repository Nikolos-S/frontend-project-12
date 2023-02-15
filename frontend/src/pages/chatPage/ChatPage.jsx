import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { downloadStatusSelector, setStatus, fetchData } from '../../slices/downloadStatusSlice.js';
import { useAuth } from '../../context/index.jsx';
import LoadingComponent from './components/LoadingComponent.jsx';
import Chat from './components/Chat';
import getToast from '../../toast/toast.js';
import { activeModal } from '../../slices/modalSlice.js';

const ChatPAge = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loadingStatus, error } = useSelector(downloadStatusSelector);
  const { logOut, getHeader } = useAuth();
  useEffect(() => {
    const data = getHeader();
    dispatch(fetchData(data));
    return () => dispatch(setStatus());
  }, [dispatch]);

  useEffect(() => {
    if (loadingStatus === 'failed') {
      if (!error.code === 'ERR_BAD_REQUEST') {
        dispatch(activeModal({ type: 'restart', isShow: true, idChannel: null }));
      } else {
        getToast(t('toast.error'), 'error');
      }
      logOut();
    }
  }, [error, loadingStatus]);

  return (loadingStatus !== 'sent' ? <LoadingComponent /> : <Chat />);
};

export default ChatPAge;
