import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { activeModal } from '../../slices/modalSlice.js';
import { setStatus } from '../../slices/downloadStatusSlice.js';
import { useAuth } from '../../context/index.jsx';

const Restart = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const onHide = () => {
    dispatch(activeModal({ type: null, isShow: false, idChannel: null }));
  };

  const onClick = () => {
    onHide();
    logOut();
    dispatch(setStatus());
  };
  const formik = useFormik({});

  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('404.modalHeading')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('404.update')}</Modal.Body>
      <Modal.Footer>
        <Button disabled={formik.isSubmitting} onClick={onClick} variant="danger">{t('404.ok')}</Button>
      </Modal.Footer>
    </>
  );
};

export default Restart;
