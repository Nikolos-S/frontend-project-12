import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { channelsSelector, fetchChannels } from '../slises/channelsSlice.js';
import { fetchMessages } from '../slises/messagesSlice.js';
import Channel from './privateComponents/Channel.jsx';
import Messages from './privateComponents/Messages.jsx';

const PrivatePAge = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(channelsSelector);
  const currentId = { current: currentChannelId };

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" className="btn btn-outline-primary btn-sm">+</button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => (
              channels && <Channel key={channel.id} prop={{ channel, currentId }} />
            ))}
          </ul>
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default PrivatePAge;
