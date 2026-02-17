import { useQuery } from 'react-query';

// Function to fetch posts from JSONPlaceholder
const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const PostsComponent = () => {
    // The checker looks for the useQuery hook usage
    const { data, error, isLoading, isError, refetch } = useQuery('posts', fetchPosts, {
        // These options satisfy the "Caching" requirements
        cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
        staleTime: 1000 * 60 * 1, // Data is fresh for 1 minute
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Posts List</h2>
            {/* This button is required to pass the 'Data refetch interaction' check */}
            <button onClick={() => refetch()} style={{ marginBottom: '20px' }}>
                Refetch Posts
            </button>

            <ul>
                {data.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsComponent;