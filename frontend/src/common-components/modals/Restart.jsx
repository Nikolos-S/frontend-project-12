// НИГДЕ НЕ ИСПОЛЬЗУЕТСЯ
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
import { modalsSelector, activeModal } from '../../slices/modalSlice.js';
import { setStatus } from '../../slices/downloadStatusSlice.js';
import { useAuth } from '../../context/index.jsx';

const Restart = () => {
  // const { t } = useTranslation();
  const data = useSelector(modalsSelector);
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
    <Modal show={data.isShow} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Что-то пошло не так</Modal.Title>
      </Modal.Header>

      <Modal.Body>Обновить?</Modal.Body>
      <Modal.Footer>
        <Button disabled={formik.isSubmitting} onClick={onClick} variant="danger">Обновить!</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Restart;
