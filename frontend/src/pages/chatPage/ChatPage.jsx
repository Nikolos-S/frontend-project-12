import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { downloadStatusSelector, setStatus } from '../../slices/downloadStatusSlice.js';
import fetchData from '../../slices/fetchData.js';
import { useAuth } from '../../context/index.jsx';
import LoadingComponent from './components/LoadingComponent.jsx';
import Chat from './components/Chat';
import getToast from '../../toast/toast.js';
// import { activeModal } from '../../slices/modalSlice.js';

const ChatPAge = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loadingStatus, error } = useSelector(downloadStatusSelector);
  const { loggedId, logOut } = useAuth();

  useEffect(() => {
    const data = { headers: loggedId ? { Authorization: `Bearer ${loggedId.token}` } : {} };
    dispatch(fetchData(data));
    if (loadingStatus === 'failed') { //  error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK'
      logOut();
      getToast(t('toast.error'), 'error');
      // dispatch(activeModal({ type: 'restart', isShow: true, idChannel: null }));
      dispatch(setStatus());
      // return () => dispatch(setStatus()); ---> размонтирование, выдает ошибку.
    }
  }, [dispatch, error]);

  return (loadingStatus !== 'sent' ? <LoadingComponent /> : <Chat />);
};

export default ChatPAge;
