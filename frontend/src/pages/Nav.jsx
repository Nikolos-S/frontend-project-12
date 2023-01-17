import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import useAuth from '../hooks/index.jsx';

const Header = () => {
  const { logOut } = useAuth();
  const location = useLocation();
  const href = location.pathname === '/' ? '/' : '/login';

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to={href}>Messenger</Link>
        {localStorage.getItem('userId') && <Button type="button" onClick={logOut} className="btn btn-primary">Сменить пользователя</Button>}
      </div>
    </nav>
  );
};
export default Header;
