import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Move import to the top
import recipeData from '../data.json';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(recipeData);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Recipe Sharing Platform</h1>

            {/* Step 4: Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out hover:scale-105 transform">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
                            <p className="text-gray-600 mt-2 text-sm">{recipe.summary}</p>

                            {/* Corrected Link to Detail Page */}
                            <div className="mt-4">
                                <Link
                                    to={`/recipe/${recipe.id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;