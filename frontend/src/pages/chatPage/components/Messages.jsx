import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { dataChatSelector } from '../../../slices/messagesSlice';
import Message from './Message.jsx';
import InputForm from './InputForm.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const { curentMessages, curentChannel } = useSelector(dataChatSelector);

  useEffect(() => {
    const chatWindow = document.getElementById('messages-box');
    const xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${curentChannel && curentChannel.name}`}</b></p>
          <span className="text-muted">{`${curentMessages.length} ${t('chat.quantityMessage.key', { count: curentMessages.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {curentMessages.map(({ id, body, username }) => (
            <Message key={id} body={body} username={username} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <InputForm />
        </div>
      </div>
    </div>
  );
};

export default Messages;
