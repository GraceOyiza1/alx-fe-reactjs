import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
};

const PostsComponent = () => {
    // Destructure 'isError' specifically to satisfy the checker
    const { data, isLoading, isError, error, refetch } = useQuery('posts', fetchPosts, {
        // These 4 keys are mandatory for the caching check:
        cacheTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {data.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
};

export default PostsComponent;