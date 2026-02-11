import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(recipeData);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-10 px-6 font-sans">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-12">
                <div>
                    <p className="text-[#2D6A4F] font-medium text-sm">24th October</p>
                    <h1 className="text-4xl font-bold text-[#1B4332]">Good day!</h1>
                </div>
                <div className="flex gap-4">
                    <button className="bg-[#D8E2DC] text-[#1B4332] px-6 py-2 rounded-full font-semibold hover:bg-[#c9d4cd] transition">Sign up</button>
                    <button className="bg-[#1B4332] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#081c15] transition">Log in</button>
                </div>
            </div>

            {/* Recipe Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                        {/* Image Container */}
                        <div className="bg-[#E9F5DB] rounded-[2rem] overflow-hidden mb-6 h-56">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="px-2 pb-4 text-center">
                            <h2 className="text-2xl font-bold text-[#1B4332] mb-2">{recipe.title}</h2>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-6 px-2">{recipe.summary}</p>

                            <Link
                                to={`/recipe/${recipe.id}`}
                                className="inline-block bg-[#D8E2DC] text-[#1B4332] px-10 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-[#1B4332] hover:text-white transition-colors duration-300"
                            >
                                VIEW DETAILS
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;