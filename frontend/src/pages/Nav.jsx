import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to="/login">Messenger</Link>
    </div>
  </nav>
);

export default Header;

/*
<Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/login">Messenger</Navbar.Brand>
    </Container>
  </Navbar>
*/
