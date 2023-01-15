import { useSelector } from 'react-redux';
import { selectors } from '../slises/channelsSlice';

const PrivatePAge = () => {
  const channels = useSelector(selectors.selectAll);
  console.log(channels);
  return <div>Messenger</div>;
};

export default PrivatePAge;
