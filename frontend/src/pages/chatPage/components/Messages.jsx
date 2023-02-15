import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import Message from './Message.jsx';
import InputForm from './InputForm.jsx';
import useScrollToLastMessage from './useScrollToLastMessage';

const Messages = () => {
  const { t } = useTranslation();

  const {
    isAutoScroll,
    messagesEndRef,
    setIsAutoScroll,
    curentMessages,
    curentChannel,
  } = useScrollToLastMessage();

  const setAvto = () => {
    setIsAutoScroll(false);
    messagesEndRef.current.scrollTo(0, messagesEndRef.current.scrollHeight);
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-column">
              <p className="m-0"><b>{`# ${curentChannel && curentChannel.name}`}</b></p>
              <span className="text-muted">{`${curentMessages.length} ${t('chat.quantityMessage.key', { count: curentMessages.length })}`}</span>
            </div>
            {isAutoScroll && <Button onClick={setAvto} className="d-flex" variant="secondary">{t('chat.newMessage')}</Button>}
          </div>
        </div>
        <div ref={messagesEndRef} id="messages-box" className="chat-messages overflow-auto px-5">
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
