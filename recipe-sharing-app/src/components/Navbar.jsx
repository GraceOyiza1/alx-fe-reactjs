import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '10px',
            display: 'flex',
            gap: '15px',
            marginBottom: '20px'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            {/* You can add more links here if needed later */}
        </nav>
    );
};

export default Navbar;