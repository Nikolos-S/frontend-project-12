import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Alert,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { channelsSelector } from '../slices/channelsSlice.js';
import { useSocket } from '../hooks/index.jsx';

const Add = (props) => {
  const { t } = useTranslation();
  const { channels } = useSelector(channelsSelector);
  const { onHide } = props;
  const { handleSubmitChannell } = useSocket();

  const getChannels = channels.reduce((acc, { name }) => [...acc, name], []);

  const schema = yup.object().shape({
    name: yup.string()
      .min(3, t('err.limit'))
      .max(20, t('err.limit'))
      .required(t('err.required'))
      .notOneOf([getChannels], t('err.notOneOf')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: (value) => {
      handleSubmitChannell(value);
      onHide();
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
              placeholder={t('modals.placeholder')}
              name="name"
              id="name"
            />
          </FormGroup>
          <Alert show={!!formik.errors.name} variant="danger">{formik.errors.name}</Alert>
          <div className="d-flex justify-content-end mt-2">
            <button type="button" onClick={onHide} className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
            <button type="submit" className="btn btn-primary">{t('modals.add')}</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;