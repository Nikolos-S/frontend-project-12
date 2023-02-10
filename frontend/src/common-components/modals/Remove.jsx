import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { modalsSelector, activeModal } from '../../slices/modalSlice.js';
import { useSocket } from '../../context/index.jsx';
import getToast from '../../toast/toast.js';

const Remove = () => {
  const { t } = useTranslation();
  const data = useSelector(modalsSelector);
  const dispatch = useDispatch();

  const onHide = () => {
    dispatch(activeModal({ type: null, isShow: false, idChannel: null }));
  };

  const { handleRemoveChannel } = useSocket();

  const callback = () => {
    getToast(t('toast.remove'), 'success');
    onHide();
  };

  const onClick = async () => {
    await handleRemoveChannel({ id: data.idChannel }, callback);
  };
  const formik = useFormik({});

  return (
    <Modal show={data.isShow} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('modals.sure')}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} type="button" variant="secondary">{t('modals.cancel')}</Button>
        <Button disabled={formik.isSubmitting} onClick={onClick} variant="danger">{t('modals.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
