//React
import React from 'react';
//Types
import { Game } from '../types.tsx';
//Redux
import { selectGames } from '../slices/allGameSlice.tsx';
import { selectPreviewGame, changeGame } from '../slices/gamePreviewSlice.tsx';
import { useSelector, useDispatch } from 'react-redux';
//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

const GameList = (): JSX.Element => {
  const games: Game[] = useSelector(selectGames);
  const activeGameId: string = useSelector(selectPreviewGame).gid;
  const dispatch = useDispatch();

  type ListItemProps = {
    game: Game;
  };

  const GameListItem = ({ game }: ListItemProps): JSX.Element => {
    return (
      <ListGroup.Item
        onClick={() => dispatch(changeGame(game))}
        className={`${game.gid === activeGameId ? 'active' : ''}`}>
        {game.name}
      </ListGroup.Item>
    );
  };

  ///!!!Add sorting by alpha(?) by default
  return (
    <ListGroup>
      {games.map((game: Game): JSX.Element => {
        return <GameListItem game={game} key={game.gid} />;
      })}
    </ListGroup>
  );
};

export default GameList;
