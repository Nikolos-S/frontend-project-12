import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const InputForm = ({ prop }) => {
  const { t } = useTranslation();
  const { handleSubmitMessage } = useSocket();
  const [value, setValue] = useState('');
  const [readyStatus, setReadyStatus] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    const newReadyStatus = value === '';
    setReadyStatus(newReadyStatus);
    inputRef.current.focus();
  }, [value, prop]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const callback = () => {
    setValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReadyStatus(true);
    if (!value) {
      return;
    }

    const currentName = JSON.parse(localStorage.getItem('userId')).username;
    const newMessage = { body: value, channelId: prop, username: currentName };
    handleSubmitMessage(newMessage, callback);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            placeholder={t('chat.enterAmessage')}
            aria-label="Новое сообщение"
            autoFocus
            onChange={handleChange}
            value={value}
            ref={inputRef}
          />
          <Button type="submit" disabled={readyStatus} variant="outline-primary">
            <img src="./submitChat.png" width="20" height="20" alt="Войти" />
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
