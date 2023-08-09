//React
import {useState, useEffect} from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {selectItem, resetItem} from '../slices/itemSlice.tsx';
import { selectLocation } from '../slices/locationSlice.tsx';
import { selectLocations, editLocation } from '../slices/allLocationSlice.tsx';
import { setLocationItems, selectLocationItems } from '../slices/locationItemSlice.tsx';
import { removeItem } from '../slices/locationItemSlice.tsx';
//Types
import {Item, Location} from '../types.tsx';
//Methods
import {getLocation, deleteItem, moveItem, changeItemFields} from '../methods.tsx';

const ItemPreview = ({active}) => {
    const dispatch = useDispatch();

    const item:Item = useSelector(selectItem);
    const location:Location = useSelector(selectLocation);
    const locations:Location[] = useSelector(selectLocations);
    const locationItems:Item[] = useSelector(selectLocationItems);

    const [locationName, setLocationName] = useState('');
    const [itemData, setItemData] = useState({name: item.name, type: item.type, location: location});
    const [editing, setEditing] = useState(false);
    let show = active;

    //Get location name for item
    useEffect(() => {
        if (item.iid) {
            getLocation(item.gid, item.lid)
            .then((response) => {
                setLocationName(response.data.name)
            })
            .catch(e => console.log(e))
    }}, [item]);

    //Load in starting values for item data
    useEffect(() => {
        if (item.iid) {
            setItemData({
                name: item.name,
                type: item.type,
                location: location
            })
        }
    }, [item, location])

    //Handle item deletion in database and state
    const remove = () => {
        deleteItem(item.gid, item.iid)
        .then(() => {
            closePreview();
            dispatch(removeItem(item.iid));
            dispatch(resetItem());
        })
        .catch(e => console.log(e))
    }

    //Handle change for input elements
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        if (event.target) {
            const {target} = event;
            setItemData({...itemData, [target.name]: target.value});
        }   
    };

    //Handle change for select dropdown
    const handleLocationChange = (event:React.ChangeEvent<HTMLSelectElement>):void => {
        if (event.target) {
            const {target} = event;
            getLocation(item.gid, target.value)
            .then(response => setItemData({...itemData, location:response.data}))
            .catch(e => console.log(e))
        }
    };

    //Update changed fields of item
    const patchItem = ():void => {
        const newData = Object.keys(itemData)
            .filter(key => (key !== 'location' && itemData[key] !== item[key]))
            .reduce((acc, curr) => {return {...acc, [curr]:itemData[curr]}}, {});
            if (newData) {
                changeItemFields(newData, item.gid, item.iid)
                //Rerender location items with updated item IFF item wasn't moved
                .then(response => {
                    if (itemData.location.lid === location.lid) {
                    dispatch(setLocationItems(locationItems.map(locItem => {
                        return(
                            locItem.iid === response.data.iid ?
                            response.data :
                            locItem
                        )
                    })))}
                });
            }
    };

    const handleSubmit = (event:React.FormEvent):void => {
        event.preventDefault();
        if (itemData.location.lid !== item.lid) { 
        moveItem(itemData.location.lid, item.gid, item.lid, item.iid)
        .then(() => {
            //Edit new location to add item ID
            dispatch(editLocation({...itemData.location, item_ids: [...itemData.location.item_ids, item.iid]}));
            //Edit previous location to remove item ID
            dispatch(editLocation({...location, item_ids: location.item_ids.filter(item_id => item_id !== item.iid)}));
            dispatch(setLocationItems(locationItems.filter(locItem => locItem.iid !== item.iid)));
            //Patch name and type of item in database
            patchItem();
        })
        .catch(e => console.log(e))
        } else {
            patchItem();
        }
        closePreview();
    }

    //Close preview, exit editing mode, and unset active item
    const closePreview = () => {
        show = false;
        setEditing(false);
        dispatch(resetItem())
    }

    //Switch between rendering preview and editor
    if (!editing) {
        return(
            <Modal show={show}>
                <CloseButton onClick={closePreview} />
                <Modal.Header>
                    <Modal.Title>{item.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item>Location: {locationName}</ListGroup.Item>
                        <ListGroup.Item>Type: {item.type}</ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closePreview}>Close</Button>
                    <Button variant="primary" onClick={() => setEditing(true)}>Edit</Button>
                </Modal.Footer> 
            </Modal>
    )} else {
        return(
            <Modal show={show}>
                <CloseButton onClick={closePreview} />
                <Modal.Header>
                    <Modal.Title>Edit {item.name}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="name">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control as="input" name="name" value={itemData.name} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>Item Type</Form.Label>
                            <Form.Control as="input" name="type" value={itemData.type} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="location">
                            <Form.Label>Item Location</Form.Label>
                            <Form.Select name="location" onChange={handleLocationChange} defaultValue={location.lid}>
                                {locations.map((loc:Location) => {
                                    return(
                                        <option value={loc.lid} key={loc.lid}>{loc.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="danger" onClick={remove}>Delete item</Button>
                        <div>
                            <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>{'  '}
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default ItemPreview;