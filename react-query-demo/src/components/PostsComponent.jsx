import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
};

const PostsComponent = () => {
    // object containing the keys:
    const { data, isLoading, isError, error, refetch } = useQuery('posts', fetchPosts, {
        cacheTime: 600000,          // 10 minutes: how long inactive data stays in cache
        staleTime: 30000,           // 30 seconds: how long data is considered 'fresh'
        refetchOnWindowFocus: true, // Automatically refetch when user refocuses the tab
        keepPreviousData: true,     // Keep old data visible while fetching new data
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Posts</h2>
            <button onClick={() => refetch()}>Refetch Posts</button>
            <ul>
                {data.map(post => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsComponent;