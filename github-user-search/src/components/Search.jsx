import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        try {
            const data = await fetchUserData(username, location, minRepos);
            setResults(data.items); // Search API returns an 'items' array
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <form onSubmit={handleFormSubmit} className="flex flex-wrap gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 rounded flex-1"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    className="border p-2 rounded flex-1"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Min Repos"
                    className="border p-2 rounded flex-1"
                    onChange={(e) => setMinRepos(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
                    Search
                </button>
            </form>

            <div className="mt-8">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">Looks like we cant find the user</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((user) => (
                        <div key={user.id} className="border p-4 rounded-xl shadow hover:shadow-lg transition">
                            <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full mx-auto" />
                            <h3 className="text-center font-bold mt-2 text-blue-600">{user.login}</h3>
                            <div className="text-center mt-4">
                                <a href={user.html_url} target="_blank" rel="noreferrer" className="text-sm bg-gray-200 px-3 py-1 rounded">View Profile</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;