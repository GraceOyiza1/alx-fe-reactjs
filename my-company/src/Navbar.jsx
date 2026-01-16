import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: '#282c34',
            color: 'white'
        }}>
            <Link style={{ margin: '10px', color: 'white' }} to="/">Home</Link>
            <Link style={{ margin: '10px', color: 'white' }} to="/about">About</Link>
            <Link style={{ margin: '10px', color: 'white' }} to="/services">Services</Link>
            <Link style={{ margin: '10px', color: 'white' }} to="/contact">Contact</Link>
        </nav>
    );
}

export default Navbar;