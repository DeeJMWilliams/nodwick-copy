//React
import React, {useState, useEffect} from 'react';
//Types
import {User, Game} from '../types.tsx'
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {selectPreviewGame} from '../slices/gamePreviewSlice.tsx';
import {setGame} from '../slices/gameSlice.tsx';
//Methods
import {getUser} from '../methods.tsx';
//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const GamePreview = (): JSX.Element => {
    const dispatch = useDispatch()
    const game:Game = useSelector(selectPreviewGame);
    const [users, setUsers] = useState<User[]>([]);

    //Make list of all users in game's list of user IDs
    useEffect(() => {
        Promise.all(game.user_ids.map(async (user_id:string) => {
            return getUser(user_id);
        })).then(response => setUsers(response))
    }, [game]);

    if (!game.name) return <React.Fragment></React.Fragment>;
    const userList:string[] = users.map((user:User, i) => {
        if (i === users.length - 1) {
            return user.name;
        } else {
            return `${user.name}, `
        }
    });

    return(
        <ListGroup.Item>
            <p>Game: {game.name}</p>
            <p>Players: {userList}</p>
            <Button variant="secondary" onClick={() => dispatch(setGame(game))}>Enter</Button>
        </ListGroup.Item>
    )
}

export default GamePreview;