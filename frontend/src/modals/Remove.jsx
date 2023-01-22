import React from 'react';
import { Modal, FormGroup, FormText } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../hooks/index.jsx';
import { channelsSelector, setChannel } from '../slices/channelsSlice.js';

const Remove = (props) => {
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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <FormText className="text-muted">
              <p className="lead">Уверены?</p>
            </FormText>
          </FormGroup>
          <div className="d-flex justify-content-end mt-2">
            <button onClick={onHide} type="button" className="me-2 btn btn-secondary">Отменить</button>
            <button type="submit" className="btn btn-danger">Удалить</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
