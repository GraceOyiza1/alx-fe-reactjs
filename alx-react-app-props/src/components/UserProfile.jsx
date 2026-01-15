
import React, { useContext } from 'react';
import UserContext from '../UserContext';

const UserProfile = () => {
    const user = useContext(UserContext);
    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', borderRadius: '8px' }}>
            <h2 style={{ color: 'blue', fontSize: '1.5rem' }}>{user.name}</h2>
            <p>Age: <span style={{ fontWeight: 'bold' }}>{user.age}</span></p>
            <p style={{ fontStyle: 'italic' }}>Bio: {user.bio}</p>
        </div>
    );
};

export default UserProfile;