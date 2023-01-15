import axios from 'axios';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const fetchChannels = createAsyncThunk(
  'fetchChannels',
  async () => {
    const response = await axios.get('/api/v1/data', { headers: getAuthHeader() });
    return response.data;
  },
);

const tasksAdapter = createEntityAdapter();
const initialState = tasksAdapter.getInitialState();
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addchannel: tasksAdapter.addOne,
    addchannels: tasksAdapter.addMany,
    removechannel: tasksAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        tasksAdapter.addMany(state, action);
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = tasksAdapter.getSelectors((state) => state.tasks);
export default channelsSlice.reducer;
