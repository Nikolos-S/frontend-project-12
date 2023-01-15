import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, fetchChannels } from '../slises/channelsSlice';

const PrivatePAge = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);
  console.log(channels);
  return <div>Messenger</div>;
};

export default PrivatePAge;
