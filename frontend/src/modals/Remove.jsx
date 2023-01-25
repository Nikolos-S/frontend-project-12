import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../hooks/index.jsx';
import { channelsSelector, setChannel } from '../slices/channelsSlice.js';
import getToast from '../toast/toast.js';

const Remove = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector(channelsSelector);

  const { modalInfo, onHide } = props;
  const { handleRemoveChannel } = useSocket();

  const [block, setBlock] = useState(false);

  const callback = () => {
    getToast(t('toast.remove'), 'success');
    setBlock(false);
    onHide();
  };

  const onClick = () => {
    setBlock(true);
    handleRemoveChannel({ id: modalInfo.item }, callback);
    if (currentChannelId === modalInfo.item) {
      dispatch(setChannel({ id: 1 }));
    }
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('modals.sure')}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} type="button" variant="secondary">{t('modals.cancel')}</Button>
        <Button disabled={block} onClick={onClick} variant="danger">{t('modals.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
