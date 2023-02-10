import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'fetchData',
  async (data) => {
    const response = await axios.get(routes.dataPath(), data);
    return response.data;
  },
);

export default fetchData;
