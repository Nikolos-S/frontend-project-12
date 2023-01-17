import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const fetchData = (request) => {
  const data = createAsyncThunk(
    `${request}`,
    async () => {
      const response = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      return response.data;
    },
  );
  return data;
};

export default fetchData;
