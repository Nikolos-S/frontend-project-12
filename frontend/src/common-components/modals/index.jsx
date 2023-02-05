import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};
const Modal = ({ type }) => {
  const Component = modals[type];
  return <Component />;
};

export default Modal;
