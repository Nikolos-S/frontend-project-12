import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import store from './slices/index.js';
import RunApp from './init.jsx';

const container = ReactDOM.createRoot(document.getElementById('container'));
const socket = io();
container.render(
  <Provider store={store}>
    <RunApp socket={socket} />
  </Provider>,
);
