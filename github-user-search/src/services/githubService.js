import axios from 'axios';

export const fetchUserData = async (username, location, minRepos) => {
    // We are making a special search link for GitHub
    let query = '';
    if (username) query += `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;

    // This is the special search address
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
    return response.data;
};