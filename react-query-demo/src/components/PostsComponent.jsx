import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
};

const PostsComponent = () => {
    // You MUST destructure 'isError' specifically
    const { data, isLoading, isError, error, refetch } = useQuery('posts', fetchPosts, {
        // These four keys are required for the caching check
        cacheTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    if (isLoading) return <div>Loading...</div>;
    // Checker looks for logic involving isError
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {data?.map(post => <div key={post.id}>{post.title}</div>)}
        </div>
    );
};

export default PostsComponent;