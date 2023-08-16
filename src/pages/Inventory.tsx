//React
import React, { useEffect, useState } from 'react';
//Components
import Header from '../components/Header.tsx';
import LocationList from '../components/LocationList.tsx';
import ItemList from '../components/ItemList.tsx';
import NewLocationForm from '../components/NewLocationForm.tsx';
import AddPlayerForm from '../components/AddPlayerForm.tsx';
import GameDeletePopup from '../components/GameDeletePopup.tsx';
import GameEditPopup from '../components/GameEditPopup.tsx';
//Redux
import { selectGames } from '../slices/allGameSlice.tsx';
import { selectGame, setGame, resetGame } from '../slices/gameSlice.tsx';
import { resetItem } from '../slices/itemSlice.tsx';
import { resetLocation } from '../slices/locationSlice.tsx';
import { setLocations } from '../slices/allLocationSlice.tsx';
import { useSelector, useDispatch } from 'react-redux';
//Types
import { Game } from '../types.tsx';
//Methods
import { getLocations } from '../methods.tsx';
//Bootstrap
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//Styling
import './Inventory.css';

const Inventory = () => {
  const dispatch = useDispatch();
  const game: Game = useSelector(selectGame);
  const games = useSelector(selectGames);
  const [addingLocation, setAddingLocation] = useState('');
  const [addingPlayer, setAddingPlayer] = useState(false);
  const [deletingGame, setDeletingGame] = useState(false);
  const [renamingGame, setRenamingGame] = useState(false);

  //Get locations for game
  useEffect(() => {
    if (game.gid) {
      getLocations(game.gid).then((response) => {
        dispatch(setLocations(response.data));
      });
    }
  }, [game, dispatch]);

  const reset = () => {
    dispatch(resetItem());
    dispatch(resetLocation());
    dispatch(resetGame());
  };

  const dropdownChangeGame = (gameOption: Game) => {
    dispatch(resetItem());
    dispatch(resetLocation());
    dispatch(setGame(gameOption));
  };

  const headerButtons = () => {
    return (
      <React.Fragment>
        <Nav.Link onClick={reset}>Back</Nav.Link>
        <NavDropdown title='Games'>
          {games.map((gameOption) => {
            return (
              <NavDropdown.Item
                key={gameOption.gid}
                onClick={() => dropdownChangeGame(gameOption)}>
                {gameOption.name}
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      </React.Fragment>
    );
  };

  const headerTitle = () => {
    return (
      <Navbar.Collapse className='justify-content-center'>
        <Navbar.Brand>{game.name}</Navbar.Brand>
        <NavDropdown title='Options'>
          <NavDropdown.Item onClick={() => setAddingPlayer(true)}>
            Add Player
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setRenamingGame(true)}>
            Rename Game
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => setDeletingGame(true)}>
            Delete Game
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    );
  };

  return (
    <div className='inventory__grid'>
      <GameDeletePopup
        active={deletingGame}
        toggle={() => setDeletingGame(false)}
      />
      <GameEditPopup
        active={renamingGame}
        toggle={() => setRenamingGame(false)}
      />
      <AddPlayerForm
        active={addingPlayer}
        toggle={() => setAddingPlayer(false)}
      />
      <NewLocationForm
        active={addingLocation !== ''}
        category={addingLocation}
        toggle={() => setAddingLocation('')}
      />
      <Header buttons={headerButtons} title={headerTitle}/>
      <div className='inventory__body'>
        <div className='inventory__left'>
          <span className='section__header'>
            <h2>Characters</h2>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => setAddingLocation('Character')}>
              New Character
            </Button>
          </span>
          <LocationList type='character' />
          <span className='section__header'>
            <h2>Locations</h2>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => setAddingLocation('Location')}>
              New Location
            </Button>
          </span>
          <LocationList type='location' />
        </div>
        <div className='inventory__right'>
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
