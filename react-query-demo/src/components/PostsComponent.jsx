import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
};

const PostsComponent = () => {
    const { data, error, isLoading, refetch } = useQuery('posts', fetchPosts);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;

    return (
        <div>
            {/*"Data refetch interaction" check */}
            <button onClick={() => refetch()}>Refetch Posts</button>
            {data.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    );
};

export default PostsComponent;