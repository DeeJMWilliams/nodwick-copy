//React
import React, {useState} from 'react';
//Components
import About from '../components/About.tsx';
//Styling
import './Login.css';
//Bootstrap
import Button from 'react-bootstrap/Button';
//Auth
import { useAuth0 } from '@auth0/auth0-react';


type LoginProps = {
    alertText: string;
}

const Login = ({alertText}: LoginProps): JSX.Element => {
    const {logout, loginWithRedirect, isAuthenticated} = useAuth0();
    const [showAbout, setShowAbout] = useState(false);

    const LoginButton = ():JSX.Element => {
        return(
            !isAuthenticated ? <Button onClick={() => loginWithRedirect()}>Log In</Button> : <></>
        )
    };

    const LogoutButton = ():JSX.Element => {
        return(
            isAuthenticated ? <Button onClick={() => logout()}>Log Out</Button> : <></>
        )
    };

    type AlertProps = {
        text: string;
    }
    
    const LoginAlert = ({text}: AlertProps): JSX.Element => {
        if (text !== '') {
            return (<div className='alert'><p>Email {text} not found.</p></div>)
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }

    return (
        <React.Fragment>
            <About active={showAbout} toggle={() => setShowAbout(false)} />
            <div className="header">
                <Button onClick={() => setShowAbout(true)} variant="secondary">About</Button>
            </div>
            <div className="loginBody">
                <h1>Nodwick</h1>
                <h2>The RPG inventory manager.</h2>
                <div className="loginForm">
                    <p>Sign in to start your adventure.</p>
                    <LoginButton />
                    <LogoutButton />
                </div>
            </div>
            <LoginAlert text={alertText}/>
    </React.Fragment>)
};

export default Login;