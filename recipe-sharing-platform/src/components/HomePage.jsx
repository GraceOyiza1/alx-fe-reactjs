import React, { useState, useEffect } from 'react';
import recipeData from '../data.json'; // Importing the mock data

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Setting the state with the imported JSON data
        setRecipes(recipeData);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Recipe Sharing Platform</h1>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out hover:scale-105 transform">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
                            <p className="text-gray-600 mt-2">{recipe.summary}</p>
                            <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;