import axios from 'axios';
import {
  createSlice,
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
  'channels/fetchChannels',
  async () => {
    const response = await axios.get('/api/v1/data', { headers: getAuthHeader() });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: '' },
  // reducers: {addchannel, addchannels, removechannel},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const { channels } = payload;
        // eslint-disable-next-line no-param-reassign
        state.channels = channels;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = ((state) => state.channels);
export default channelsSlice.reducer;
