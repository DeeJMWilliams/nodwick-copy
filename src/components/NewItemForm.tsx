//React
import React, {useState} from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import { addLocationItem } from '../slices/locationItemSlice';
import { selectLocation } from '../slices/locationSlice';
import {selectGame} from '../slices/gameSlice.tsx';
//Methods
import {addNewItem} from '../methods.tsx';
//Components
import CharError from './CharError.tsx';

const NewItemForm = ({active, toggle}) => {
    const dispatch = useDispatch();
    const location = useSelector(selectLocation);
    const game = useSelector(selectGame);
    const [itemData, setItemData] = useState({name:'', type:''});
    const [alert, setAlert] = useState({name: false, type: false});

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        if (location.lid) {
            addNewItem(itemData, game.gid, location.lid)
            .then(response => {
                dispatch(addLocationItem(response.data));
            }).catch(e => console.log(e));
        } else {
            addNewItem(itemData, game.gid).then(response => {
                //!!! fix: handle differently if no active location
                dispatch(addLocationItem(response.data));
            }).catch(e => console.log(e));
    }
    setItemData({name:'',type:''});
}

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            const {target} = event;
            if (target.value.length < 30) {
            setItemData({...itemData, [target.name]: target.value})
            } else {
                setItemData({...itemData, [target.name]: target.value.slice(0,30)});
                setAlert({...alert, [target.name]: true});
                setTimeout(() => setAlert({...alert, [target.name]: false}), 3000);
            }
        }
    }

    return(
        <Modal show={active}>
            <CloseButton onClick={toggle} />
            <Modal.Header>
                <Modal.Title>Create New Item {location.name ? `for ${location.name}` : ''}</Modal.Title>
            </Modal.Header>
                <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="name">
                        <Form.Label>Item Name</Form.Label>
                        <CharError active={alert.name}>
                            <Form.Control as="input" name="name" placeholder="+1 Sword" value={itemData.name} onChange={handleChange} />
                        </CharError>
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Item Type</Form.Label>
                        <CharError active={alert.type}>
                            <Form.Control as="input" name="type" placeholder="Weapon" value={itemData.type} onChange={handleChange}/>
                        </CharError>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggle} variant="secondary">Close</Button>
                <Button as="input" type="submit" value="Create" onClick={toggle}/>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default NewItemForm;