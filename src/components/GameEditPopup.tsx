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
import { updateOnLength } from '../helpers.tsx';
//Components
import CharError from './CharError.tsx';

type PopupProps = {
  active: boolean;
  toggle: () => void;
};

const GameEditPopup = ({ active, toggle }: PopupProps): JSX.Element => {
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const [gameName, setGameName] = useState(game.name);
  const [alert, setAlert] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const { target } = event;
      updateOnLength(target, setGameName, setAlert);
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
            <Form.Label>Game Name</Form.Label>
            <CharError active={alert}>
              <Form.Control
                as='input'
                name='name'
                value={gameName}
                onChange={handleChange}
                required
              />
            </CharError>
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
