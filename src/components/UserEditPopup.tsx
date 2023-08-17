//React
import React, { useState } from 'react';
//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
//Types
import { Popup, User } from '../types.tsx';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, changeUser } from '../slices/userSlice.tsx';
//Methods
import { renameUser } from '../methods.tsx';
import { change } from '../helpers.tsx';
//Components
import PopupAlert from './PopupAlert.tsx';

const UserEditPopup = ({ active, toggle }: Popup): JSX.Element => {
  const dispatch = useDispatch();
  const user: User = useSelector(selectUser);
  const [userName, setUserName] = useState(user.name);
  const [changeSuccess, setChangeSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user.name !== userName) {
      renameUser(userName, user.uid)
        .then((response) => {
          dispatch(changeUser(response.data));
        })
        .catch((e) => console.log(e));
      setChangeSuccess(true);
      setTimeout(() => setChangeSuccess(false), 3000);
    }
  };

  const handleChange = (e) => change(e, setUserName);

  return (
    <React.Fragment>
      <Modal show={active}>
        <CloseButton onClick={toggle} />
        <Modal.Header>
          <Modal.Title>Edit User Settings</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId='name'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Label>Change Name</Form.Label>
                <Form.Text className='text-muted'>
                  Chars left: {20 - userName.length}
                </Form.Text>
              </div>
              <InputGroup>
                <Form.Control
                  as='input'
                  name='name'
                  value={userName}
                  onChange={handleChange}
                  maxLength={20}
                  required
                />
                <Button variant='primary' type='submit'>
                  Change
                </Button>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={toggle}>
              Exit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <PopupAlert
        variant='success'
        active={changeSuccess}
        text='Name change successful!'
      />
    </React.Fragment>
  );
};

export default UserEditPopup;
