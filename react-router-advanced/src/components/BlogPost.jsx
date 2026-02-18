import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams(); // Retrieves the :id from the URL
    return <div>Displaying content for Blog Post ID: {id}</div>;
};

export default BlogPost;