//Bootstrap
import Spinner from 'react-bootstrap/Spinner';

const Callback = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', width: '99vw', height: '80vh'}}>
                <Spinner />
                <h1>Loading...</h1>
        </div>
    )
}

export default Callback;