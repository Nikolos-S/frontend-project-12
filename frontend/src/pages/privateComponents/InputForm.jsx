import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const InputForm = ({ prop }) => {
  const { t } = useTranslation();
  const { submit } = useSocket();
  const [value, setValue] = useState('');
  const [readyStatus, setReadyStatus] = useState(false);

  useEffect(() => {
    const newReadyStatus = value === '';
    setReadyStatus(newReadyStatus);
  }, [value]);

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
    submit('newMessage', newMessage, callback);
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
          />
          <Button type="submit" disabled={readyStatus} variant="outline-primary">
            {t('chat.send')}
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
