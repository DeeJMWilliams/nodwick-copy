//React
import React, { useState } from 'react';
//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectLocations, editLocation } from '../slices/allLocationSlice.tsx';
import { selectLocation, setLocation } from '../slices/locationSlice.tsx';
import {
  setLocationItems,
  selectLocationItems,
} from '../slices/locationItemSlice.tsx';
import { selectDraggedItem, resetDraggedItem } from '../slices/dragSlice.tsx';
//Types
import { Location, Item } from '../types.tsx';
//Components
import LocationDeletePopup from './LocationDeletePopup.tsx';
import LocationEditPopup from './LocationEditPopup.tsx';
//Methods
import { moveItem, getLocation } from '../methods.tsx';
import { compare } from '../helpers.tsx';

type locationProps = {
  type: string;
};

const reduceLocs = (arr: Location[]) => {
  return arr.reduce((acc, element) => {
    if (element.name === 'Unassigned') {
      return [element, ...acc];
    }
    return [...acc, element];
  }, []);
};

const LocationList = ({ type }: locationProps): JSX.Element => {
  const dispatch = useDispatch();
  const locations: Location[] = useSelector(selectLocations);
  const activeLocation: Location = useSelector(selectLocation);
  const draggedItem: Item = useSelector(selectDraggedItem);
  const locationItems: Item[] = useSelector(selectLocationItems);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [destination, setDestination] = useState(activeLocation);

  type ListItemProps = {
    location: Location;
  };

  const checkDelete = (location: Location): void => {
    dispatch(setLocation(location));
    setDeleting(true);
  };

  const startEdit = (location: Location): void => {
    dispatch(setLocation(location));
    setEditing(true);
  };

  const handleDragOver = (event: React.DragEvent, loc: Location): void => {
    event.preventDefault();
    if (destination.lid !== loc.lid) {
      setDestination(loc);
    }
  };

  const handleDragLeave = (event: React.DragEvent, loc: Location): void => {
    event.preventDefault();
    if (destination.lid === loc.lid) {
      setDestination({
        name: '',
        lid: '',
        gid: '',
        type: 'location',
        timestamp: '',
        item_ids: [],
      });
    }
  };

  const handleDrop = (loc: Location): void => {
    if (draggedItem.lid !== loc.lid) {
      moveItem(loc.lid, draggedItem.gid, draggedItem.lid, draggedItem.iid)
        .then(() => {
          //Add new item ID to new location
          dispatch(
            editLocation({
              ...loc,
              item_ids: [...loc.item_ids, draggedItem.iid],
            }),
          );
          getLocation(draggedItem.gid, draggedItem.lid).then((response) => {
            //Remove item ID from old location
            const newItems: string[] = response.data.item_ids.filter(
              (item_id: string) => item_id !== draggedItem.iid,
            );
            dispatch(
              editLocation({ ...response.data, item_ids: [...newItems] }),
            );
            //Rerender location items
            dispatch(
              setLocationItems(
                locationItems.filter((item) => newItems.includes(item.iid)),
              ),
            );
          });
        })
        .catch((e) => console.log(e));
    }
    setDestination({
      name: '',
      lid: '',
      gid: '',
      type: 'location',
      timestamp: '',
      item_ids: [],
    });
    dispatch(resetDraggedItem());
  };

  const LocationListItem = ({ location }: ListItemProps): JSX.Element => {
    const selected = location.lid === activeLocation.lid;
    return (
      <div
        className='droppable'
        onDragOver={(e) => handleDragOver(e, location)}
        onDragLeave={(e) => handleDragLeave(e, location)}
        onDrop={() => handleDrop(location)}
        style={{ borderRadius: '0.375rem' }}
        key={location.lid}>
        <ListGroup.Item
          onClick={() => dispatch(setLocation(location))}
          className={`location__entry ${selected ? 'active' : ''}`}
          variant={location.lid === destination.lid ? 'primary' : ''}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              gap: '10px',
            }}>
            <span className='location__text'>{location.name}</span>
            <Badge bg='info'>{location.item_ids.length}</Badge>
          </div>
          {location.name !== 'Unassigned' ? (
            <div className='badges'>
              <Badge bg='secondary' onClick={() => startEdit(location)}>
                ✎
              </Badge>{' '}
              <Badge bg='danger' onClick={() => checkDelete(location)}>
                x
              </Badge>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </ListGroup.Item>
      </div>
    );
  };

  const locationsOfType = locations.filter(
    (location: Location) => location.type === type,
  );

  return (
    <React.Fragment>
      <LocationEditPopup active={editing} toggle={() => setEditing(false)} />
      <LocationDeletePopup
        active={deleting}
        toggle={() => setDeleting(false)}
      />
      <ListGroup className='location__list'>
        {locationsOfType.length >= 1 ? (
          reduceLocs(locationsOfType.sort(compare)).map(
            (location: Location) => {
              return (
                <LocationListItem location={location} key={location.lid} />
              );
            },
          )
        ) : (
          <ListGroup.Item>No entries yet!</ListGroup.Item>
        )}
      </ListGroup>
    </React.Fragment>
  );
};

export default LocationList;
