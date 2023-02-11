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
const Modal = ({ type }) => {
  const Component = modals[type];
  return <Component />;
};

export default Modal;
