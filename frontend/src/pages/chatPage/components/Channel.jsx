import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { setChannel } from '../../../slices/channelsSlice.js';
import { activeModal } from '../../../slices/modalSlice.js';

const Channel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channel, curentId } = props;

  const handleSetChennel = () => {
    dispatch(setChannel({ id: channel.id }));
  };

  const showModal = (modalType, channelId) => {
    dispatch(activeModal({ type: modalType, isShow: true, idChannel: channelId }));
  };

  const activeElement = channel.id === curentId ? 'secondary' : 'light';

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button onClick={handleSetChennel} variant={activeElement} className="w-100 rounded-0 text-start btn text-truncate">
          <span className="me-1">#</span>
          {filter.clean(channel.name)}
        </Button>
        {channel.removable
        && (
          <Dropdown.Toggle className="br-0" split variant={activeElement} id={channel.id}>
            <span className="visually-hidden">{t('chat.visuallyHidden')}</span>
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('removing', channel.id)} id={channel.id}>{t('modals.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('renaming', channel.id)} id={channel.id}>{t('modals.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
