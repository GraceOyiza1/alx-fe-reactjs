import axios from 'axios';

// The function name must be fetchUserData as per requirements
export const fetchUserData = async (username) => {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
};
import axios from 'axios';

export const fetchUserData = async (username, location, minRepos, page = 1) => {
    // 1. Build the query string
    // Example query: "user:octocat location:sanfrancisco repos:>10"
    let query = '';
    if (username) query += `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;

    // 2. Use the Search API endpoint
    const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&page=${page}`
    );
    return response.data;
};