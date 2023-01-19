import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useAuth from '../../hooks/index.jsx';

const InputForm = ({ prop }) => {
  const { handleSubmitMessage } = useAuth();
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            placeholder="Введите сообщение"
            aria-label="Новое сообщение"
            autoFocus
            onChange={handleChange}
            value={value}
          />
          <Button type="submit" variant="outline-primary">
            Отправить
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
