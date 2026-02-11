import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        // Find the recipe by ID
        const foundRecipe = recipeData.find((r) => r.id === parseInt(id));
        setRecipe(foundRecipe);
    }, [id]);

    if (!recipe) return <div className="text-center py-10">Recipe not found.</div>;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <button
                onClick={() => navigate('/')}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Back to Home
            </button>

            <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6">
                <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-6" />
                <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
                <p className="text-gray-600 mb-6 text-lg">{recipe.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Ingredients</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {/* Note: Ensure your data.json has an ingredients array or adjust as needed */}
                            <li>Ingredient 1</li>
                            <li>Ingredient 2</li>
                            <li>Ingredient 3</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Instructions</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Step 1: Prep your ingredients.</li>
                            <li>Step 2: Cook according to the recipe.</li>
                            <li>Step 3: Serve and enjoy!</li>
                        </ol>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;