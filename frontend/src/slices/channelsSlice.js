/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: '' },
  reducers: {
    addChannel(state, { payload }) {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    setChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },
    removeChannel(state, { payload }) {
      const newChannels = state.channels.filter((channel) => channel.id !== payload.id);
      state.channels = newChannels;
    },
    renameChannel(state, { payload }) {
      state.channels = state.channels.reduce((acc, channel) => {
        const curentName = channel.id === payload.id ? payload.name : channel.name;
        return [...acc, { id: channel.id, name: curentName, removable: channel.removable }];
      }, []);
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

export const {
  addChannel,
  setChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export const channelsSelector = ((state) => state.channels);
export default channelsSlice.reducer;
