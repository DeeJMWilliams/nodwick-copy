//Bootstrap
import Fade from 'react-bootstrap/Fade';
import Alert from 'react-bootstrap/Alert';

type AlertProps = {
  variant: string;
  text: string;
  active: boolean;
};

const PopupAlert = ({ variant, text, active }: AlertProps) => {
  return (
    <Fade in={active}>
      <div className='popup'>
        <Alert variant={variant}>{text}</Alert>
      </div>
    </Fade>
  );
};

export default PopupAlert;
