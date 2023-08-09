//React 
import React, {useEffect, useState} from 'react';
//Components
import GameList from '../components/GameList.tsx';
import GamePreview from '../components/GamePreview.tsx';
import NewGameForm from '../components/NewGameForm.tsx';
import Header from '../components/Header.tsx';
//Redux
import {setGames} from '../slices/allGameSlice.tsx';
import {selectUser} from '../slices/userSlice.tsx';
import {useDispatch, useSelector} from 'react-redux';
//Styling
import './Games.css';
//Types
import {Game, User} from '../types.tsx';
//Methods
import { getGames } from '../methods.tsx';
//Bootstrap
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Games = () : JSX.Element => {
    const dispatch = useDispatch();
    const [newGame, setNewGame] = useState(false);
    const user:User = useSelector(selectUser);

    //Get games for user
    useEffect(() => {
        getGames()
        .then((response) => {
            const games: Game[] = response.data;
            dispatch(setGames(games.filter((game: Game) => user.game_ids.includes(game.gid))))})
        .catch(e => console.log(e))
    }, [user, dispatch]);

    const headerButtons = () => {
        return(
            <React.Fragment>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
        <Header buttons={headerButtons} title={() => {return(<React.Fragment></React.Fragment>)}} />
        <div className = 'body'>
            <div className = 'body__left'>
                <div className='buttonContainer'>
                    <Button variant="secondary" onClick={() => setNewGame(!newGame)}>+ New Game</Button>
                </div>
                    <GameList />
                </div>
            <ListGroup className ='body__right'>
                <NewGameForm active={newGame} toggle={() => setNewGame(false)} />
                <GamePreview/>
            </ListGroup>
        </div>
        </React.Fragment>
    )
};

export default Games;