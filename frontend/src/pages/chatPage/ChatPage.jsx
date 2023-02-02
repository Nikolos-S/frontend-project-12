import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelector } from '../../slices/channelsSlice.js';
import { downloadStatusSelector } from '../../slices/downloadStatusSlice.js';
import { modalsSelector, activeModal } from '../../slices/modalSlice.js';
import Channel from './components/Channel.jsx';
import Messages from './components/Messages.jsx';
import fetchData from '../../slices/fetchData.js';
import getModal from '../../common-components/modals/index.js';
import { useAuth } from '../../context/index.jsx';

const PrivatePAgeChat = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(channelsSelector);
  const { loadingStatus, error } = useSelector(downloadStatusSelector);
  const { type } = useSelector(modalsSelector);

  const { t } = useTranslation();
  const { loggedId } = useAuth();

  useEffect(() => {
    dispatch(fetchData(loggedId));
    if (error) {
      console.log(error);
    }
  }, [dispatch]);

  const showModalAdd = () => {
    dispatch(activeModal({ type: 'adding', isShow: true, idChannel: null }));
  };
  const Modal = getModal(type);
  const spinner = (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <Spinner animation="border" variant="success" />
      </div>
    </div>
  );
  const chat = (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('chat.channels')}</span>
            <button onClick={showModalAdd} type="button" className="btn btn-outline-primary btn-sm">+</button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => (
              channels
              // eslint-disable-next-line max-len
              && <Channel key={channel.id} channel={channel} curentId={currentChannelId} />
            ))}
          </ul>
          {type && <Modal />}
        </div>
        <Messages />
      </div>
    </div>
  );
  return (loadingStatus === 'loading' ? spinner : chat);
};

export default PrivatePAgeChat;
