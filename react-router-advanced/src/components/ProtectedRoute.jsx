import { Navigate } from 'react-router-dom';

//  simulate authentication
const useAuth = () => {
    //  change this to false to see the redirect in action
    const isAuthenticated = true;
    return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;