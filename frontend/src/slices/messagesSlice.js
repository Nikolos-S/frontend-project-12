/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';
import { removeChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
    removeMessages(state, { payload }) {
      state.messages.filter((message) => message.channelId !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const newList = state.messages.filter((message) => message.channelId !== payload.id);
        return newList;
      });
  },
});

export const { addMessage, removeMessages } = messagesSlice.actions;
export const messagesSelector = ((state) => state.messages);
export default messagesSlice.reducer;
