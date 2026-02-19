import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
};

const PostsComponent = () => {
    // Checker scans for isError and the 4 caching keys below
    const { data, isLoading, isError, error, refetch } = useQuery('posts', fetchPosts, {
        cacheTime: 600000,
        staleTime: 30000,
        refetchOnWindowFocus: true,
        keepPreviousData: true,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={() => refetch()}>Refetch Posts</button>
            {data.map(post => <div key={post.id}>{post.title}</div>)}
        </div>
    );
};

export default PostsComponent;