import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { setChannel } from '../../slices/channelsSlice.js';

const Channel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channel, curentId, showModal } = props; // removable
  const handleSetChennel = () => {
    dispatch(setChannel({ id: channel.id }));
  };
  const activeElement = channel.id === curentId ? 'secondary' : 'light';
  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button onClick={handleSetChennel} variant={activeElement} className="w-100 rounded-0 text-start btn">
          <span className="me-1">#</span>
          {filter.clean(channel.name)}
        </Button>
        {channel.removable
        && (
          <Dropdown.Toggle split variant={activeElement} id={channel.id} />
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
