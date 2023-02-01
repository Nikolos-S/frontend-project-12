import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk(
  'fetchData',
  async (data) => {
    const response = await axios.get('/api/v1/data', { headers: data ? { Authorization: `Bearer ${data.token}` } : {} });
    return response.data;
  },
);

export default fetchData;
