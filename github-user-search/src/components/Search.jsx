import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setUserData(null);

        try {
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search GitHub User..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/* Conditional Rendering for Loading, Error, and Results */}
            {loading && <p>Loading...</p>}
            {error && <p>Looks like we cant find the user</p>}

            {userData && (
                <div className="user-card">
                    <img src={userData.avatar_url} alt={userData.name} width="150" />
                    <h2>{userData.name || userData.login}</h2>
                    <p>{userData.bio}</p>
                    <a href={userData.html_url} target="_blank" rel="noreferrer">
                        View Profile
                    </a>
                </div>
            )}
        </div>
    );
};

export default Search;