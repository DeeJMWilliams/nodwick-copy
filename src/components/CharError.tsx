//Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const CharError = ({active,children}) => {
    const popover = (
        <Popover>
            <Popover.Body>
                No more than 30 characters, please!
            </Popover.Body>
        </Popover>
    )

    return(
        <OverlayTrigger show={active} overlay={popover} placement='top'>
            {children}
        </OverlayTrigger>
    )
}

export default CharError;