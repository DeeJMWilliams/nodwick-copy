//React
import {useState, useEffect} from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {selectLocation} from '../slices/locationSlice.tsx';
import {editLocation} from '../slices/allLocationSlice.tsx';
//Types
import {Location} from '../types.tsx';
//Methods
import { renameLocation } from '../methods.tsx';
import { updateOnLength } from '../helpers.tsx';
//Components
import CharError from './CharError.tsx';

type PopupProps = {
    active: boolean;
    toggle: () => void;
}

const LocationEditPopup = ({active, toggle}:PopupProps):JSX.Element => {
    const dispatch = useDispatch();
    const location:Location = useSelector(selectLocation);
    const [locationName, setLocationName] = useState(location.name);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setLocationName(location.name);
    }, [location]);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            const {target} = event;
            updateOnLength(target, setLocationName, setAlert);
        }   
    };

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        renameLocation(locationName, location.gid, location.lid)
        .then(response => {
            dispatch(editLocation(response.data));
        })
        .catch(e => console.log(e))
        toggle()
    };

    const close = () => {
        setLocationName(location.name);
        toggle();
    }

    return(
        <Modal show={active}>
            <CloseButton onClick={close} />
            <Modal.Header>
                <Modal.Title>Edit {location.name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="name">
                        <Form.Label>{location.type === 'location' ? 'Location' : 'Character'} Name</Form.Label>
                        <CharError active={alert}>
                        <Form.Control as="input" name="name" value={locationName} onChange={handleChange} required/>
                        </CharError>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>Cancel</Button>
                    <Button type="submit" variant="primary">Change</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default LocationEditPopup;