//React
import React, {useState} from 'react';
//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import { selectLocations } from '../slices/allLocationSlice.tsx';
import {selectLocation, setLocation} from '../slices/locationSlice.tsx';
//Types
import {Location} from '../types.tsx';
//Components
import LocationDeletePopup from './LocationDeletePopup.tsx';
import LocationEditPopup from './LocationEditPopup.tsx';

type locationProps = {
    type:string;
}

const LocationList = ({type}:locationProps):JSX.Element => {
    const dispatch = useDispatch();
    const locations:Location[] = useSelector(selectLocations);
    const activeLocation = useSelector(selectLocation);
    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);

    type ListItemProps = {
        location:Location;
    }

    const checkDelete = (location:Location) => {
        dispatch(setLocation(location));
        setDeleting(true);
    }

    const startEdit = (location:Location) => {
        dispatch(setLocation(location));
        setEditing(true);
    }
    
    const LocationListItem = ({location}: ListItemProps):JSX.Element => {
        let selected = location.lid === activeLocation.lid;
        return <ListGroup.Item 
                onClick={()=> dispatch(setLocation(location))} 
                className={`location__entry ${selected ? 'active': ''}`}>
                    <span className="location__text">
                    {location.name}
                    </span>
                {location.name !== 'Unassigned' ? 
                <div className="badges">
                    <Badge bg="secondary" onClick={() => startEdit(location)}>✎</Badge>{' '}
                    <Badge bg="danger" onClick={() => checkDelete(location)}>x</Badge>
                </div> :
                <React.Fragment></React.Fragment>}
                </ListGroup.Item>
    }

    const locationsOfType = locations.filter((location:Location) => location.type === type);


    return(
        <React.Fragment>
            <LocationEditPopup active={editing} toggle={() => setEditing(false)} />
            <LocationDeletePopup active={deleting} toggle={() => setDeleting(false)} />
            <ListGroup>
                {locationsOfType.length >= 1 ?
                locationsOfType.map((location:Location) => {return <LocationListItem location={location} key={location.lid}/>}) :
                <ListGroup.Item>No entries yet!</ListGroup.Item>}
            </ListGroup>
        </React.Fragment>
    )
}

export default LocationList;