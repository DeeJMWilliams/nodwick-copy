//React, Routing
import React, {useState} from 'react';
//Redux
import {selectUser, resetUser} from '../slices/userSlice.tsx';
import {useSelector, useDispatch} from 'react-redux';
//Components
import About from './About.tsx';
//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//Types
import {User} from '../types.tsx';
// Auth
import { useAuth0 } from "@auth0/auth0-react";

type headerProps = {
    buttons: () => JSX.Element;
    title: () => JSX.Element;
}

const Header = ({buttons, title}:headerProps) => {
    const dispatch = useDispatch();
    const [about, setAbout] = useState(false);
    const user:User = useSelector(selectUser);
    const {logout} = useAuth0();

    return(
        <React.Fragment>
            <About active={about} toggle={() => setAbout(!about)} />
            <Navbar>
                <Navbar.Brand className='pageTitle'>Nodwick</Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={()=>setAbout(!about)}>About</Nav.Link>
                    <Nav.Link>{user.name}</Nav.Link>
                    {buttons()}
                    <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                </Nav>
                {title()}
            </Navbar>
        </React.Fragment>
    )
}

export default Header;