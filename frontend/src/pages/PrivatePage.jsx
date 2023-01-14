import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};
const PrivatePAge = () => {
  const [responseData, setData] = useState(null);
  const auth = getAuthHeader();
  useEffect(() => {
    const response = async () => {
      const data = await axios.get('/api/v1/data', { headers: auth });
      setData(data);
    };
    response();
    console.log(responseData.data);
  }, []);

  return (
    <div>Messenger</div>
  );
};

export default PrivatePAge;
