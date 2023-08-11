//Bootstrap
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type AboutProps = {
  active: boolean;
  toggle: () => void;
};

const About = ({ active, toggle }: AboutProps): JSX.Element => {
  return (
    <Modal show={active} className='popup'>
      <CloseButton onClick={toggle} />
      <Modal.Header>
        <Modal.Title>About Nodwick</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Nodwick is a web-based inventory manager for RPGs. It was created as a
          capstone project for Ada Developers Academy.
        </p>
        <p>
          Create a game to get started -- all you need is a name. Inside a game,
          you can add characters, locations, and items. Click and drag to move
          items between characters and locations.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggle}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default About;
