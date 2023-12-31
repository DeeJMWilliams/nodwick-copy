import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { persistor, store } from './store.tsx';
import {Auth0Provider} from '@auth0/auth0-react';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Callback from './pages/Callback.tsx';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

<link
  rel='stylesheet'
  href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
  integrity='sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM'
  crossorigin='anonymous'
/>;

const Auth0ProviderWithCallback = ({children}) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || '/callback');
  };

  const providerConfig = {
    domain: domain,
    clientId: clientId,
    onRedirectCallback,
    authorizationParams: {redirect_uri: window.location.origin, ...(audience ? { audience: audience } : null)},
    cacheLocation: 'localstorage',
    useRefreshToken: true,
  }

  return <Auth0Provider {...providerConfig}>{children}</Auth0Provider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={<Callback />} persistor={persistor}>
          <Auth0ProviderWithCallback>
            <App />
          </Auth0ProviderWithCallback>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);
