//React
import React, {useState} from 'react';
//Redux
import {selectUser} from '../slices/userSlice.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {addGame as addNewGame} from '../slices/allGameSlice.tsx';
//Methods
import { addUserToGame, addGame } from '../methods.tsx';
//Types
import {Game} from '../types.tsx';
//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type GameFormProps = {
    active: boolean;
    toggle: () => void;
}

const NewGameForm = ({active, toggle}: GameFormProps): JSX.Element => {
    const dispatch = useDispatch();
    const [gameName, setGameName] = useState('');
    const user = useSelector(selectUser);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        if (event.target) {
            const {target} = event;
            setGameName(target.value);
        }
    } 

    const handleSubmit = (name:string):void => {
        addGame(name)
        .then((response) => {
          //Add active user to new game
            const game_id:string = response.data.gid;
            const user_id:string = user.uid
            addUserToGame(game_id, user_id);
            const newGame:Game = {...response.data, user_ids: [user_id]}
            dispatch(addNewGame(newGame));
        })
        .catch(e => console.log(e))
    }

    const submitNewGame = (event: React.FormEvent):void => {
        event.preventDefault();
        if (gameName) {
            handleSubmit(gameName);
            setGameName('');
            toggle();
        } else {
            //!!! Create alert for form (Bootstrap Overlay)
            console.log('TODO');
        }
        
    }

    if (!active) return <React.Fragment></React.Fragment>;

    return(
        <ListGroup.Item className='newGameForm'>
            <Form onSubmit={submitNewGame}>
                <Form.Group className='nameField'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control as="input" name='name' id='name' placeholder='My new game' value={gameName} onChange={handleChange}/>
                </Form.Group>
                <span style={{display: 'flex', justifyContent: 'right', gap: '3px'}}>
                    <Button type='submit' variant='primary'>Create</Button>
                    <Button variant='secondary' onClick={toggle}>Cancel</Button>
                </span>
            </Form>
        </ListGroup.Item>
    )
}

export default NewGameForm;