//Bootstrap
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectLocation, resetLocation } from '../slices/locationSlice';
import {
  removeLocation,
  selectLocations,
  editLocation,
} from '../slices/allLocationSlice.tsx';
//Types
import { Location } from '../types.tsx';
//Methods
import { deleteLocation } from '../methods.tsx';

type PopupProps = {
  active: boolean;
  toggle: () => void;
};

const LocationDeletePopup = ({ active, toggle }: PopupProps): JSX.Element => {
  const location: Location = useSelector(selectLocation);
  const locations: Location[] = useSelector(selectLocations);
  const dispatch = useDispatch();
  const show = active;

  const remove = () => {
    deleteLocation(location.gid, location.lid)
      .then(() => {
        toggle();
        const unassigned = locations.find((loc) => loc.name === 'Unassigned');
        dispatch(
          editLocation({
            ...unassigned,
            item_ids: unassigned.item_ids.concat(location.item_ids),
          }),
        );
        dispatch(removeLocation(location.lid));
        dispatch(resetLocation());
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal show={show}>
      <CloseButton onClick={toggle} />
      <Modal.Header>
        <Modal.Title>Delete {location.name}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          If you delete {location.name}, all items will be moved to Unassigned.
        </p>
        <p>
          This <strong>cannot</strong> be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={toggle}>
          Cancel
        </Button>
        <Button variant='danger' onClick={remove}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationDeletePopup;
