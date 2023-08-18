//React & Routing
import React from 'react';
import { useNavigate } from 'react-router-dom';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectGame, resetGame } from '../slices/gameSlice';
import { selectUser, changeUser } from '../slices/userSlice';
import { updateGame, removeGame } from '../slices/allGameSlice.tsx';
//Types
import { Game, User, Popup } from '../types.tsx';
//Methods
import { removeUser, deleteGame } from '../methods.tsx';

const LeaveGamePopup = ({ active, toggle }: Popup) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: User = useSelector(selectUser);
  const game: Game = useSelector(selectGame);

  const onlyPlayerText = (
    <React.Fragment>
      <p>
        You are currently the only player in {game.name}. If you leave, the game
        will be deleted. <strong>This cannot be undone.</strong>
      </p>
      <p>Are you sure you want to leave?</p>
    </React.Fragment>
  );

  const multiPlayerText = (
    <React.Fragment>
      <p>
        If you leave {game.name}, you will have to be re-invited by another
        player to rejoin.
      </p>
      <p>Are you sure you want to leave?</p>
    </React.Fragment>
  );

  const handleLeave = () => {
    removeUser(game.gid, user.uid)
      .then(() => {
        dispatch(
          changeUser({
            ...user,
            game_ids: user.game_ids.filter((game_id) => game_id !== game.gid),
          }),
        );
        if (game.user_ids.length === 1) {
          deleteGame(game.gid);
          dispatch(removeGame(game.gid));
        } else {
          dispatch(
            updateGame({
              ...game,
              user_ids: game.user_ids.filter((user_id) => user_id !== user.uid),
            }),
          );
        }
        dispatch(resetGame());
        navigate('/callback');
        setTimeout(() => navigate('/games'), 2000);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal show={active}>
      <CloseButton onClick={toggle} />
      <Modal.Header>
        <Modal.Title>Leave {game.name}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {game.user_ids.length === 1 ? onlyPlayerText : multiPlayerText}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={toggle}>
          Cancel
        </Button>
        <Button variant='danger' onClick={handleLeave}>
          Leave Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaveGamePopup;
