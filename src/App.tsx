//React & Routing
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//Pages
import Games from './pages/Games.tsx';
import Login from './pages/Login.tsx';
import Inventory from './pages/Inventory.tsx';
import Callback from './pages/Callback.tsx';
//Types
import { User, Game } from './types.tsx';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, changeUser } from './slices/userSlice.tsx';
import { selectGame } from './slices/gameSlice.tsx';
//Styling
import './App.css';
//Auth
import { useAuth0 } from '@auth0/auth0-react';
//Methods
import { addUser, getUsers, getSingleUser } from './methods.tsx';

const App = (): JSX.Element => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const activeUser: User = useSelector(selectUser);
  const activeGame: Game = useSelector(selectGame);
  const navigate = useNavigate();

  //Move to games page on successful login
  useEffect(() => {
    if (activeUser.uid) {
      navigate('/games');
    }
  }, [activeUser, navigate]);

  //Move to inventory page on set of active game or games page on removal of active game
  //!!!Add persistent state to active game and remove contingency
  useEffect(() => {
    if (activeGame.gid && activeUser.uid) {
      navigate('/inventory');
    } else if (activeUser.uid) {
      navigate('/games');
    }
  }, [activeGame, activeUser, navigate]);

  const defineUser = (user) => {
    return {
      name: user.nickname,
      email: user.email,
      uid: user.sub,
      game_ids: [],
    };
  };

  const getUserData = (user) => {
    getUsers()
      .then((response) => {
        if (!response.data.map((user) => user.uid).includes(user.sub)) {
          createNewUser(user);
        } else {
          getSingleUser(user.sub).then((response) => {
            dispatch(changeUser(response.data));
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const createNewUser = (user) => {
    const userData = defineUser(user);
    addUser(userData).then((response) => {
      dispatch(changeUser(response.data));
    });
  };

  //Set active user on login
  useEffect(() => {
    if (user) {
      getUserData(user);
    }
  }, [user]);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/games' element={<Games />} />
      <Route path='/inventory' element={<Inventory />} />
      <Route path='/callback' element={<Callback />} />
    </Routes>
  );
};

export default App;
