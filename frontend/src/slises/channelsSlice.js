/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

export const fetchChannels = fetchData('channels/fetchChannels');

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: '' },
  // reducers: {addchannel, addchannels, removechannel},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
      });
  },
});

// export const { actions } = channelsSlice;
export const channelsSelector = ((state) => state.channels);
export default channelsSlice.reducer;
