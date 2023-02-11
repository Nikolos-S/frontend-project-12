import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { modalsSelector } from '../../../slices/modalSlice.js';
import Modal from '../../../common-components/modals';

const LoadingComponent = () => {
  const { type } = useSelector(modalsSelector);
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <Spinner animation="border" variant="success" />
      </div>
      {type && <Modal type={type} />}
    </div>
  );
};

export default LoadingComponent;
