//React
import { useState } from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectGame, setGame } from '../slices/gameSlice.tsx';
import { updateGame } from '../slices/allGameSlice.tsx';
//Methods
import { renameGame } from '../methods.tsx';
//Types
import { Popup, Game } from '../types.tsx';

const GameEditPopup = ({ active, toggle }: Popup): JSX.Element => {
  const dispatch = useDispatch();
  const game: Game = useSelector(selectGame);
  const [gameName, setGameName] = useState(game.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const { target } = event;
      setGameName(target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    renameGame(gameName, game.gid)
      .then((response) => {
        dispatch(updateGame(response.data));
        dispatch(setGame(response.data));
      })
      .catch((e) => console.log(e));
    toggle();
  };

  const close = () => {
    setGameName('');
    toggle();
  };

  return (
    <Modal show={active}>
      <CloseButton onClick={close} />
      <Modal.Header>
        <Modal.Title>Edit {game.name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId='name'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Label>Game Name</Form.Label>
              <Form.Text className='text-muted'>
                Chars left: {40 - gameName.length}
              </Form.Text>
            </div>
            <Form.Control
              as='input'
              name='name'
              value={gameName}
              onChange={handleChange}
              maxLength={40}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={close}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Change
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default GameEditPopup;
