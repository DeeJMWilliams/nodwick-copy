//React
import React, { useEffect, useState } from 'react';
//Components
import GameList from '../components/GameList.tsx';
import GamePreview from '../components/GamePreview.tsx';
import NewGameForm from '../components/NewGameForm.tsx';
import Header from '../components/Header.tsx';
//Redux
import { setGames } from '../slices/allGameSlice.tsx';
import { selectUser } from '../slices/userSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
//Styling
import './Games.css';
//Types
import { Game, User } from '../types.tsx';
//Methods
import { getGames } from '../methods.tsx';
//Bootstrap
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Games = (): JSX.Element => {
  const dispatch = useDispatch();
  const [newGame, setNewGame] = useState(false);
  const user: User = useSelector(selectUser);

  //Get games for user
  useEffect(() => {
    getGames()
      .then((response) => {
        const games: Game[] = response.data;
        dispatch(
          setGames(
            games.filter((game: Game) => user.game_ids.includes(game.gid)),
          ),
        );
      })
      .catch((e) => console.log(e));
  }, [user, dispatch]);

  const headerButtons = () => {
    return <React.Fragment></React.Fragment>;
  };

  return (
    <div className='games__grid'>
      <Header
        buttons={headerButtons}
        title={() => {
          return <React.Fragment></React.Fragment>;
        }}
      />
      <div className='games__body'>
        <div className='games__left'>
          <GameList />
        </div>
        <ListGroup className='games__right'>
          {!newGame ? <Button onClick={() => setNewGame(true)} variant='secondary'>New Game</Button> : <></>}
          <NewGameForm active={newGame} toggle={() => setNewGame(false)}/>
          <GamePreview />
        </ListGroup>
      </div>
    </div>
  );
};

export default Games;
