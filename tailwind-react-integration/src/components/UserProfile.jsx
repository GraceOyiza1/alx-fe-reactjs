function UserProfile() {
    return (
        // Container: p-4 on sm, p-8 on md, max-w-xs on sm, max-w-sm on md
        <div className="bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg">

            {/* Image: w-24 h-24 on sm, w-36 h-36 on md */}
            <img
                src="https://via.placeholder.com/150"
                alt="User"
                className="rounded-full w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto"
            />

            {/* Heading: text-lg on sm, text-xl on md */}
            <h1 className="text-lg md:text-xl text-blue-800 my-4">John Doe</h1>

            {/* Paragraph: text-sm on sm, text-base on md */}
            <p className="text-gray-600 text-sm md:text-base">
                Developer at Example Co. Loves to write code and explore new technologies.
            </p>
        </div>
    );
}

export default UserProfile;