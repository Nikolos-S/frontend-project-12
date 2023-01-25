import { toast } from 'react-toastify';

const getToast = (text, type) => toast[type](text, {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
});

export default getToast;
