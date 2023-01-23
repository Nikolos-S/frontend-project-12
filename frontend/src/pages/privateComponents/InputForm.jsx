import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setValue(e.target.value);
    setReadyStatus(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    setReadyStatus(false);
    const currentName = JSON.parse(localStorage.getItem('userId')).username;
    const newMessage = { body: value, channelId: prop, username: currentName };
    handleSubmitMessage(newMessage);
    setValue('');
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
          <Button type="submit" disabled={!readyStatus} variant="outline-primary">
            {t('chat.send')}
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
