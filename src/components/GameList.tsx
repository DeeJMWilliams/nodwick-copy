//Types
import { Game } from '../types.tsx';
//Redux
import { selectGames } from '../slices/allGameSlice.tsx';
import { selectPreviewGame, changePreviewGame } from '../slices/gamePreviewSlice.tsx';
import { useSelector, useDispatch } from 'react-redux';
//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
//Methods
import { compare } from '../helpers.tsx';

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
        onClick={() => dispatch(changePreviewGame(game))}
        className={`${game.gid === activeGameId ? 'active' : ''}`}>
        {game.name}
      </ListGroup.Item>
    );
  };

  return (
    <ListGroup>
      {games.length >= 1 ? (
        [...games].sort(compare).map((game: Game): JSX.Element => {
          return <GameListItem game={game} key={game.gid} />;
        })
      ) : (
        <ListGroup.Item>No entries yet!</ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default GameList;
