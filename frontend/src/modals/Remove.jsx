import React from 'react';
import { Modal, FormGroup, FormText } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../hooks/index.jsx';
import { channelsSelector, setChannel } from '../slices/channelsSlice.js';

const Remove = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector(channelsSelector);

  const { modalInfo, onHide } = props;
  const { handleRemoveChannel } = useSocket();

  const onSubmit = () => {
    handleRemoveChannel({ id: modalInfo.item });
    if (currentChannelId === modalInfo.item) {
      dispatch(setChannel({ id: 1 }));
    }
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <FormText className="text-muted">
              <p className="lead">{t('modals.sure')}</p>
            </FormText>
          </FormGroup>
          <div className="d-flex justify-content-end mt-2">
            <button onClick={onHide} type="button" className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
            <button type="submit" className="btn btn-danger">{t('modals.remove')}</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
