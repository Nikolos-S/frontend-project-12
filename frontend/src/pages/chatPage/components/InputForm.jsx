import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { channelsSelector } from '../../../slices/channelsSlice.js';
import { useSocket, useAuth } from '../../../context/index.jsx';

const InputForm = () => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector(channelsSelector);
  const { handleSubmitMessage } = useSocket();

  const { loggedId } = useAuth();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { text: '' },
    onSubmit: ({ text }) => {
      const callback = () => {
        formik.resetForm();
      };
      const newMessage = { body: text, channelId: currentChannelId, username: loggedId.username };
      handleSubmitMessage(newMessage, callback);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            required
            placeholder={t('chat.enterAmessage')}
            aria-label={t('chat.newMessage')}
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.text}
            name="text"
            ref={inputRef}
            disabled={formik.isSubmitting}
          />
          <Button type="submit" disabled={formik.isSubmitting || formik.values.text === ''} variant="outline-primary">
            <img src="./submitChat.png" width="20" height="20" alt="Войти" />
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputForm;
