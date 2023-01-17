import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const Channel = ({ prop }) => {
  const { channel, currentId } = prop; // removable
  const activeElement = channel.id === currentId.current ? 'secondary' : 'light';
  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button variant={activeElement} className="w-100 rounded-0 text-start btn">
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        {channel.removable
        && (
          <Dropdown.Toggle split variant={activeElement} id={channel.id} />
        )}
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
