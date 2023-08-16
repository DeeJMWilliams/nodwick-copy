//React
import { useState } from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Methods
import { deleteGame } from '../methods.tsx';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectGame, resetGame } from '../slices/gameSlice.tsx';
import { removeGame } from '../slices/allGameSlice.tsx';
import { selectUser, changeUser } from '../slices/userSlice.tsx';
//Types
import { Game, User } from '../types.tsx';

type PopupProps = {
  active: boolean;
  toggle: () => void;
};

const GameDeletePopup = ({ active, toggle }: PopupProps): JSX.Element => {
  const dispatch = useDispatch();
  const game: Game = useSelector(selectGame);
  const user: User = useSelector(selectUser);
  const [gameName, setGameName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const { target } = event;
      setGameName(target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (gameName === game.name) {
      const game_id = game.gid;
      dispatch(resetGame());
      deleteGame(game_id)
        .then(() => {
          dispatch(removeGame(game_id));
          dispatch(
            changeUser({
              ...user,
              game_ids: user.game_ids.filter((id) => id !== game_id),
            }),
          );
        })
        .catch((e) => console.log(e));
    } else {
      //!!!Create popup
      console.log('TODO');
    }
  };

  return (
    <Modal show={active}>
      <CloseButton onClick={toggle} />
      <Modal.Header>
        <Modal.Title>Delete {game.name}?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>
            Are you sure you want to delete this game? This action{' '}
            <strong>cannot</strong> be undone.
          </p>
          <p>
            To permanently delete {game.name}, type its full name in the box
            below, then press delete.
          </p>
          <Form.Group controlId='gameName'>
            <Form.Label>{game.name}</Form.Label>
            <Form.Control
              as='input'
              name='gameName'
              placeholder={game.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggle} variant='secondary'>
            Cancel
          </Button>
          <Button type='submit' variant='danger'>
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default GameDeletePopup;
