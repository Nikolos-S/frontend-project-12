/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

export const fetchMessages = fetchData('channels/fetchMessages');

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  // reducers: {addmessage, addmessages, removemessage},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      });
  },
});

// export const { actions } = messagesSlice;
export const messagesSelectors = ((state) => state.messages);
export default messagesSlice.reducer;
