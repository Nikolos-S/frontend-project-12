import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { modalsSelector } from '../../slices/modalSlice.js';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';
import Restart from './Restart';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
  restart: Restart,
};
const Modals = ({ type }) => {
  const data = useSelector(modalsSelector);
  const Component = modals[type];
  return (
    <Modal show={data.isShow} centered>
      <Component />
    </Modal>
  );
};

export default Modals;
