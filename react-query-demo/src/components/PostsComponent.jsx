import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
};

const PostsComponent = () => {
    //string "isError" here
    const { data, isLoading, isError, error, refetch } = useQuery('posts', fetchPosts);

    if (isLoading) return <div>Loading...</div>;

    // "isError" 
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={() => refetch()}>Refetch Posts</button>
            <ul>
                {data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostsComponent;