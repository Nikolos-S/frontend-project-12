import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import store from './slises/index.js';

const container = ReactDOM.createRoot(document.getElementById('container'));
container.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
