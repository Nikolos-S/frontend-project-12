/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

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
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        state.push(...messages);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelector = ((state) => state.messages);
export default messagesSlice.reducer;
