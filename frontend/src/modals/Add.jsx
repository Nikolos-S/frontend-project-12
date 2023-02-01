import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { channelsSelector } from '../slices/channelsSlice.js';
import { useSocket } from '../hooks/index.jsx';
import getToast from '../toast/toast.js';

const Add = (props) => {
  const { t } = useTranslation();

  const { channels } = useSelector(channelsSelector);
  const { onHide } = props;
  const { handleSubmitChannell } = useSocket();

  const getChannels = channels.reduce((acc, { name }) => [...acc, name], []);

  const schema = yup.object().shape({
    name: yup.string()
      .min(3, t('err.limitName'))
      .max(20, t('err.limitName'))
      .required(t('err.required'))
      .notOneOf([getChannels], t('err.notOneOf')),
  });

  const [isBlock, setBlock] = useState(false);

  const callback = () => {
    getToast(t('toast.add'), 'success');
    setBlock(false);
    onHide();
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: (value) => {
      setBlock(true);
      handleSubmitChannell(value, callback);
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
            <FloatingLabel controlId="name" label={t('modals.placeholder')} className="mb-3">
              <FormControl
                required
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.values.name}
                data-testid="input-body"
                name="name"
                placeholder={t('modals.placeholder')}
                isInvalid={formik.touched.name}
              />
              <FormControl.Feedback type="invalid">{formik.errors.name}</FormControl.Feedback>
            </FloatingLabel>
          </FormGroup>
          <div className="d-flex justify-content-end mt-2">
            <button type="button" onClick={onHide} className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
            <button type="submit" disabled={isBlock} className="btn btn-primary">{t('modals.add')}</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
