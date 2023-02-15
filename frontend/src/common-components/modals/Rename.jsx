import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { modalsSelector, activeModal } from '../../slices/modalSlice.js';
import { channelsSelector } from '../../slices/channelsSlice.js';
import { useSocket } from '../../context/index.jsx';
import getToast from '../../toast/toast.js';

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector(modalsSelector);
  const { channels } = useSelector(channelsSelector);

  const onHide = () => {
    dispatch(activeModal({ type: null, isShow: false, idChannel: null }));
  };

  const { handleRenameChannel } = useSocket();

  const getChannels = channels.reduce((acc, { name }) => [...acc, name], []);

  const schema = yup.object().shape({
    name: yup.string()
      .min(3, 'limitName')
      .max(20, 'limitName')
      .required('required')
      .notOneOf([getChannels], 'notOneOf'),
  });

  const callback = () => {
    getToast(t('toast.rename'), 'success');
    onHide();
  };
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: async (value) => {
      await handleRenameChannel({ id: data.idChannel, name: value.name }, callback);
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <FormControl.Feedback type="invalid">{t(`err.${formik.errors.name}`)}</FormControl.Feedback>
            </FloatingLabel>
          </FormGroup>
          <div className="d-flex justify-content-end mt-2">
            <button type="button" onClick={onHide} className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
            <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">{t('modals.rename')}</button>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default Rename;
