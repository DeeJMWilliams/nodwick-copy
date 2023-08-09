//React
import React, {useState} from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {selectGame} from '../slices/gameSlice.tsx';
import { addLocation } from '../slices/allLocationSlice.tsx';
//Methods
import { addNewLocation } from '../methods.tsx';

const NewLocationForm = ({category, active, toggle}) => {
    const dispatch = useDispatch();
    const [locationName,setLocationName] = useState('')
    const game = useSelector(selectGame);

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        addNewLocation({name:locationName, type:category.toLowerCase()}, game.gid)
        .then((response) => {
            dispatch(addLocation(response.data));
        })
        .catch(e => console.log(e));
        setLocationName('');
        toggle();
    };

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            const {target} = event;
            setLocationName(target.value);
        }
    };

    return(
        <Modal show={active}>
            <CloseButton onClick={toggle}/>
            <Modal.Header>
                <Modal.Title>New {category}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control as="input" name="name" placeholder="Name" onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>Cancel</Button>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default NewLocationForm;