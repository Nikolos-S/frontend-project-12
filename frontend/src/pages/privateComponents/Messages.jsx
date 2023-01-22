import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../slices/messagesSlice';
import { channelsSelector } from '../../slices/channelsSlice';
import Message from './Message.jsx';
import InputForm from './InputForm.jsx';

const Messages = () => {
  const { messages } = useSelector(messagesSelector);
  const { channels, currentChannelId } = useSelector(channelsSelector);
  console.log(messages);

  const curentMessages = messages
    .filter((message) => message.channelId === currentChannelId);
  const curentChannel = channels.find((channel) => channel.id === currentChannelId);

  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e) => {
    const element = e.target;
    if (Math.abs(element.scrollHeight - element.offsetHeight - element.scrollTop) > 50) {
      setIsAutoScroll(false);
    } else {
      setIsAutoScroll(true);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      const chatWindow = document.getElementById('messages-box');
      const xH = chatWindow.scrollHeight;
      chatWindow.scrollTo(0, xH);
    }
  }, [messages, isAutoScroll]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${curentChannel && curentChannel.name}`}</b></p>
          <span className="text-muted">{`${curentMessages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" onScroll={scrollHandler}>
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
