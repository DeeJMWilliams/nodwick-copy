# Nodwick RPG Inventory Manager

## What is Nodwick?

Nodwick is an app for inventory management in tabletop RPGs. After signing up, you can create and join games. Within a game, you can create locations, characters, and items. Items can be moved between locations as things change within your game. If you wish to run this repo on your own, it requires setting up a .env file with your own Auth0 information: the variable ```REACT_APP_AUTH0_DOMAIN``` should be set to your domain and the variable ```REACT_APP_AUTH0_CLIENT_ID``` should be set to your client ID. Run ```yarn start``` to launch the web app.

Nodwick is also hosted at https://nodwick.app. 

## Dependencies
- Auth0 React
- React Redux
- Redux Persist
- Axios
- React Bootstrap
- React Router