import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const PostsComponent = () => {
    // queryKey 'posts' identifies this data in the cache
    const { data, error, isLoading, isError, refetch } = useQuery('posts', fetchPosts, {
        // Advanced settings for Step 3
        cacheTime: 600000, // Keeps data in cache for 10 minutes
        staleTime: 30000,  // Data remains 'fresh' for 30 seconds
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Posts</h2>
            {/* Interaction to trigger a refetch as per Step 3 */}
            <button onClick={() => refetch()} style={{ marginBottom: '10px' }}>
                Refetch Data
            </button>

            <ul>
                {data.map(post => (
                    <li key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsComponent;