//React
import React, { useState } from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addLocationItem } from '../slices/locationItemSlice';
import { selectLocation } from '../slices/locationSlice';
import { editLocation } from '../slices/allLocationSlice.tsx';
import { selectGame } from '../slices/gameSlice.tsx';
//Methods
import { addNewItem } from '../methods.tsx';

const NewItemForm = ({ active, toggle }) => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const game = useSelector(selectGame);
  const [itemData, setItemData] = useState({ name: '', type: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (location.lid) {
      addNewItem(itemData, game.gid, location.lid)
        .then((response) => {
          dispatch(addLocationItem(response.data));
          dispatch(editLocation({...location, item_ids: [...location.item_ids, response.data.iid]}));
        })
        .catch((e) => console.log(e));
    } else {
      addNewItem(itemData, game.gid)
        .then((response) => {
          if (location.lid) {
            dispatch(addLocationItem(response.data));
            dispatch(editLocation({...location, item_ids: [...location.item_ids, response.data.iid]}));
          }
        })
        .catch((e) => console.log(e));
    }
    setItemData({ name: '', type: '' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const { target } = event;
      setItemData({ ...itemData, [target.name]: target.value });
    }
  };

  const close = () => {
    setItemData({ name: '', type: '' });
    toggle();
  };

  return (
    <Modal show={active}>
      <CloseButton onClick={close} />
      <Modal.Header>
        <Modal.Title>
          Create New Item {location.name ? `for ${location.name}` : ''}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId='name'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Label>Item Name</Form.Label>
              <Form.Text>Chars left: {40 - itemData.name.length}</Form.Text>
            </div>
            <Form.Control
              as='input'
              name='name'
              placeholder='+1 Sword'
              value={itemData.name}
              onChange={handleChange}
              required
              maxLength={40}
            />
          </Form.Group>
          <Form.Group controlId='type'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Label>Item Type</Form.Label>
              <Form.Text>Chars left: {20 - itemData.type.length}</Form.Text>
            </div>
            <Form.Control
              as='input'
              name='type'
              placeholder='Weapon'
              value={itemData.type}
              onChange={handleChange}
              required
              maxLength={20}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} variant='secondary'>
            Close
          </Button>
          <Button as='input' type='submit' value='Create' onClick={toggle} />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewItemForm;
