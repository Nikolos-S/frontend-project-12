import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const InputForm = () => {
  console.log('fd');
  return (
    <Form>
      <Form.Group>
        <InputGroup>
          <Form.Control
            placeholder="Введите сообщение"
            aria-label="Новое сообщение"
            autoFocus
          />
          <Button type="submit" variant="outline-primary">
            Button
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
