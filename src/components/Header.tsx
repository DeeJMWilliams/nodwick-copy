//React, Routing
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Redux
import { selectUser, resetUser } from '../slices/userSlice.tsx';
import { useSelector, useDispatch } from 'react-redux';
//Components
import About from './About.tsx';
import UserEditPopup from './UserEditPopup.tsx';
//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
//Types
import { User } from '../types.tsx';
// Auth
import { useAuth0 } from '@auth0/auth0-react';

type headerProps = {
  buttons: () => JSX.Element;
  title: () => JSX.Element;
};

const Header = ({ buttons, title }: headerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [about, setAbout] = useState(false);
  const [options, setOptions] = useState(false);
  const user: User = useSelector(selectUser);
  const { logout } = useAuth0();

  const signout = () => {
    logout();
    dispatch(resetUser());
    navigate('/');
  };

  return (
    <React.Fragment>
      <UserEditPopup active={options} toggle={() => setOptions(false)} />
      <About active={about} toggle={() => setAbout(!about)} />
      <Navbar className='page__header'>
        <Navbar.Brand className='pageTitle'>Nodwick</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => setAbout(!about)}>About</Nav.Link>
          <NavDropdown title={user.name}>
            <NavDropdown.Item onClick={() => setOptions(true)}>
              Options
            </NavDropdown.Item>
            <NavDropdown.Item onClick={signout}>Logout</NavDropdown.Item>
          </NavDropdown>
          {buttons()}
        </Nav>
        {title()}
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
