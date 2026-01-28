import axios from 'axios';

// The function name must be fetchUserData as per requirements
export const fetchUserData = async (username) => {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
};