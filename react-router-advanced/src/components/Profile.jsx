import { Routes, Route, Link, Outlet } from 'react-router-dom';

// /string names
const ProfileDetails = () => <div>Profile Details Content</div>;
const ProfileSettings = () => <div>Profile Settings Content</div>;

const Profile = () => {
    return (
        <div>
            <h1>Profile Page</h1>
            <nav>
                <ul>
                    <li><Link to="details">View Details</Link></li>
                    <li><Link to="settings">Edit Settings</Link></li>
                </ul>
            </nav>

            {/* Nested Routes:
          "ProfileDetails" and "ProfileSettings" 
      */}
            <Routes>
                <Route path="details" element={<ProfileDetails />} />
                <Route path="settings" element={<ProfileSettings />} />
            </Routes>

            {/* nested routing to render child components */}
            <Outlet />
        </div>
    );
};

export default Profile;