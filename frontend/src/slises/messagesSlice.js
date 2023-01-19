/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

export const fetchMessages = fetchData('channels/fetchMessages');

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.push(payload);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelectors = ((state) => state.messages);
export default messagesSlice.reducer;
