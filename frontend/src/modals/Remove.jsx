import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../hooks/index.jsx';
import getToast from '../toast/toast.js';

const Remove = (props) => {
  const { t } = useTranslation();

  const { modalInfo, onHide } = props;
  const { handleRemoveChannel } = useSocket();

  const [isBlock, setBlock] = useState(false);

  const callback = () => {
    getToast(t('toast.remove'), 'success');
    setBlock(false);
    onHide();
  };

  const onClick = () => {
    setBlock(true);
    handleRemoveChannel({ id: modalInfo.item }, callback);
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('modals.sure')}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} type="button" variant="secondary">{t('modals.cancel')}</Button>
        <Button disabled={isBlock} onClick={onClick} variant="danger">{t('modals.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
