import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelector } from '../../../slices/channelsSlice.js';
import { modalsSelector, activeModal } from '../../../slices/modalSlice.js';
import Channel from './Channel.jsx';
import Messages from './Messages.jsx';
import Modals from '../../../common-components/modals/index.jsx';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector(channelsSelector);
  const { type } = useSelector(modalsSelector);

  const showModalAdd = () => {
    dispatch(activeModal({ type: 'adding', isShow: true, idChannel: null }));
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('chat.channels')}</span>
            <button onClick={showModalAdd} type="button" className="btn btn-outline-primary btn-sm">+</button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => (
              <Channel key={channel.id} channel={channel} curentId={currentChannelId} />
            ))}
          </ul>
          {type && <Modals type={type} />}
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default Chat;
