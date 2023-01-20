import React from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../slises/messagesSlice';
import { channelsSelector } from '../../slises/channelsSlice';
import Message from './Message.jsx';
import InputForm from './InputForm.jsx';

const Messages = () => {
  const messages = useSelector(messagesSelector);
  const { channels, currentChannelId } = useSelector(channelsSelector);

  const curentMessages = messages
    .filter((message) => message.channelId === currentChannelId);
  const curentChannel = channels.find((channel) => channel.id === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${curentChannel && curentChannel.name}`}</b></p>
          <span className="text-muted">{`${curentMessages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {curentMessages && curentMessages.map(({ id, body, username }) => (
            <Message key={id} props={{ body, username }} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <InputForm prop={currentChannelId} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
