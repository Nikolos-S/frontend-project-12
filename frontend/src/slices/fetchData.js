import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'fetchData',
  async (data) => {
    const response = await axios.get(routes.dataPath(), { headers: data ? { Authorization: `Bearer ${data.token}` } : {} });
    return response.data;
  },
);

export default fetchData;
