//React
import {useState} from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import { selectGame, setGame } from '../slices/gameSlice.tsx';
import {updateGame} from '../slices/allGameSlice.tsx';
//Methods
import {renameGame} from '../methods.tsx';

type PopupProps = {
    active: boolean;
    toggle: () => void;
}

const GameEditPopup = ({active, toggle}:PopupProps):JSX.Element => {
    const dispatch = useDispatch();
    const game = useSelector(selectGame);
    const [gameName, setGameName] = useState(game.name);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            const {target} = event;
            setGameName(target.value);
        }   
    };

    const handleSubmit = (event:React.FormEvent):void => {
        event.preventDefault();
        renameGame(gameName, game.gid)
        .then(response => {
            dispatch(updateGame(response.data));
            dispatch(setGame(response.data))
        })
        .catch(e => console.log(e));
        toggle();
    }

    return(
        <Modal show={active}>
            <CloseButton onClick={toggle} />
            <Modal.Header>
                <Modal.Title>Edit {game.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="name">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control as="input" name="name" value={gameName} onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>Cancel</Button>
                    <Button variant="primary" type="submit">Change</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
};

export default GameEditPopup;