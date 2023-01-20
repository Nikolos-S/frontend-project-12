/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: '' },
  // reducers: {addchannel, addchannels, removechannel},
  reducers: {
    addChannel(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels.push(channels);
      state.currentChannelId = currentChannelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
      });
  },
});

export const { addChannel } = channelsSlice.actions;
export const channelsSelector = ((state) => state.channels);
export default channelsSlice.reducer;
