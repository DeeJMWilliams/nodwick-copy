//React
import React, {useState} from 'react';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {selectGame} from '../slices/gameSlice.tsx';
import {updateGame} from '../slices/allGameSlice.tsx';
//Methods
import { getUsers, addUserToGame } from '../methods.tsx';
//Types
import {Game, User} from '../types.tsx';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

type PlayerFormProps = {
    active: boolean;
    toggle: () => void;
}

const AddPlayerForm = ({active, toggle}:PlayerFormProps): JSX.Element => {
    const dispatch = useDispatch();
    const game:Game = useSelector(selectGame);
    const [email, setEmail] = useState('');

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        if (event.target) {
            const {target} = event;
            setEmail(target.value);
        }
    }

    const handleSubmit = (event:React.FormEvent):void => {
        //!!!Add handling for invalid email
        event.preventDefault();
        getUsers()
        .then(response => {
            return(
            response.data.find((user:User) => user.email === email)
            )   
        })
        .then(user => {
            if (user) {
                addUserToGame(game.gid, user.uid)
                .then(response => {
                    dispatch(updateGame(response.data));
                });
                toggle();
            }
            else {console.log('TODO')}
        })
        .catch(e => console.log(e))

        setEmail('');
    }

    return(
        <Modal show={active}>
            <CloseButton onClick={toggle}/>
            <Modal.Header>
                <Modal.Title>Add Player</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control as="input" type="email" name="email" placeholder="player@email.com" onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>Cancel</Button>
                    <Button type="submit" variant="primary">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPlayerForm;