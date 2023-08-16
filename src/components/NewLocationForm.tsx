//React
import React, { useState } from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectGame } from '../slices/gameSlice.tsx';
import { addLocation } from '../slices/allLocationSlice.tsx';
//Methods
import { addNewLocation } from '../methods.tsx';

const NewLocationForm = ({ category, active, toggle }) => {
  const dispatch = useDispatch();
  const [locationName, setLocationName] = useState('');
  const game = useSelector(selectGame);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNewLocation(
      { name: locationName, type: category.toLowerCase() },
      game.gid,
    )
      .then((response) => {
        dispatch(addLocation(response.data));
      })
      .catch((e) => console.log(e));
    setLocationName('');
    toggle();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const { target } = event;
      setLocationName(target.value);
    }
  };

  const close = () => {
    setLocationName('');
    toggle();
  };

  return (
    <Modal show={active}>
      <CloseButton onClick={close} />
      <Modal.Header>
        <Modal.Title>New {category}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId='name'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Label>Name</Form.Label>
              <Form.Text className='text-muted'>
                Chars left: {30 - locationName.length}
              </Form.Text>
            </div>
            <Form.Control
              as='input'
              name='name'
              placeholder='Name'
              onChange={handleChange}
              value={locationName}
              maxLength={30}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={close}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewLocationForm;
