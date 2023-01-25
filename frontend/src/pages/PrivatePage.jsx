import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelector } from '../slices/channelsSlice.js';
import Channel from './privateComponents/Channel.jsx';
import Messages from './privateComponents/Messages.jsx';
import fetchData from '../slices/fetchData.js';
import getModal from '../modals/index.js';

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const PrivatePAge = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(channelsSelector);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('chat.channels')}</span>
            <button onClick={() => showModal('adding')} type="button" className="btn btn-outline-primary btn-sm">+</button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => (
              channels
              // eslint-disable-next-line max-len
              && <Channel key={channel.id} channel={channel} curentId={currentChannelId} showModal={showModal} />
            ))}
          </ul>
          {renderModal(modalInfo, hideModal)}
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default PrivatePAge;
