import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import downloadStatusReducer from './downloadStatusSlice.js';
import modalsReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    downloadStatus: downloadStatusReducer,
    modals: modalsReducer,
  },
});
