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
import { useSelector, useDispatch } from 'react-redux';
import { channelsSelector, setChannel } from '../slices/channelsSlice.js';
import { useSocket } from '../hooks/index.jsx';

const Rename = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(channelsSelector);
  const { modalInfo, onHide } = props;
  const { handleRenameChannel } = useSocket();

  const getChannels = channels.reduce((acc, { name }) => [...acc, name], []);

  const schema = yup.object().shape({
    name: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('поле обязательно')
      .notOneOf([getChannels], 'должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: (value) => {
      handleRenameChannel({ id: modalInfo.item, name: value.name });
      if (currentChannelId === modalInfo.id) {
        dispatch(setChannel({ id: modalInfo.item }));
      }
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
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
            <button type="submit" className="btn btn-primary">{t('modals.rename')}</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
