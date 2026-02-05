function UserProfile() {
    return (
        // Container: Gray background, padding, max-width, centered, rounded, and shadow
        <div className="bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg">

            {/* Image: Circular, size 150px (w-36 h-36 is approx 144px, use w-40 h-40 for ~160px or stick to requirements) */}
            <img
                src="https://via.placeholder.com/150"
                alt="User"
                className="rounded-full w-36 h-36 mx-auto"
            />

            {/* Heading: XL size, deep blue, and vertical margin */}
            <h1 className="text-xl text-blue-800 my-4">John Doe</h1>

            {/* Paragraph: Gray text and base font size */}
            <p className="text-gray-600 text-base">
                Developer at Example Co. Loves to write code and explore new technologies.
            </p>
        </div>
    );
}

export default UserProfile;