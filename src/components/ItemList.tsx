//React
import React, { useEffect, useState } from 'react';
//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectLocation } from '../slices/locationSlice.tsx';
import { selectGame } from '../slices/gameSlice.tsx';
import {
  setLocationItems,
  selectLocationItems,
} from '../slices/locationItemSlice.tsx';
import { setItem, selectItem } from '../slices/itemSlice.tsx';
import { setDraggedItem } from '../slices/dragSlice.tsx';
//Methods
import { getLocationItems } from '../methods.tsx';
import { compare } from '../helpers.tsx';
//Components
import NewItemForm from './NewItemForm.tsx';
import ItemPreview from './ItemPreview.tsx';
//Types
import { Item } from '../types.tsx';

const ItemList = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const game = useSelector(selectGame);
  const items = useSelector(selectLocationItems);
  const activeItem = useSelector(selectItem);
  const [newItem, setNewItem] = useState(false);

  useEffect(() => {
    if (location.lid) {
      getLocationItems(game.gid, location.lid).then((response) => {
        dispatch(setLocationItems(response.data));
      });
    } else {
      dispatch(setLocationItems([]));
    }
  }, [location, dispatch, game]);

  type ListItemProps = {
    item: Item;
  };

  const ItemListItem = ({ item }: ListItemProps): JSX.Element => {
    return (
      <ListGroup.Item
        className={item.iid === activeItem.iid ? 'active' : ''}
        onClick={() => dispatch(setItem(item))}>
        {item.name}
      </ListGroup.Item>
    );
  };

  const handleDragStart = (item: Item): void => {
    dispatch(setDraggedItem(item));
  };

  return (
    <React.Fragment>
      <ItemPreview active={activeItem.iid !== ''} />
      <NewItemForm active={newItem} toggle={() => setNewItem(!newItem)} />
      <span className='section__header'>
      <h2 >Items{'   '}</h2>
      <Button
        variant='secondary'
        size='sm'
        style={{ display: 'inline' }}
        onClick={() => setNewItem(true)}>
        New Item
      </Button>
      </span>
      <ListGroup>
        {items.length >= 1 ? (
          [...items].sort(compare).map((item: Item) => {
            return (
              <div
                draggable
                className='draggable'
                style={{ borderRadius: '0.375rem' }}
                onDragStart={() => handleDragStart(item)}
                key={item.iid}>
                <ItemListItem item={item} />
              </div>
            );
          })
        ) : location.lid ? (
          <ListGroup.Item>No entries yet!</ListGroup.Item>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </ListGroup>
    </React.Fragment>
  );
};

export default ItemList;
