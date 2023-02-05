import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingComponent = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <Spinner animation="border" variant="success" />
    </div>
  </div>
);

export default LoadingComponent;
