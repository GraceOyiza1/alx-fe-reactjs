import React, { useState } from 'react';

const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!title) newErrors.title = "Recipe title is required";
        if (!ingredients) newErrors.ingredients = "Please add some ingredients";
        // Basic check if ingredients have at least 2 items (split by comma)
        if (ingredients && ingredients.split(',').length < 2) {
            newErrors.ingredients = "Please include at least two ingredients (separated by commas)";
        }
        if (!steps) newErrors.steps = "Preparation steps are required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log({ title, ingredients, steps });
            // Reset form
            setTitle('');
            setIngredients('');
            setSteps('');
            alert("Recipe Added Successfully!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-[2.5rem] shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-[#1B4332] mb-6 text-center">Add New Recipe</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[#2D6A4F] font-semibold mb-2 ml-2">Recipe Title</label>
                    <input
                        type="text"
                        className={`w-full p-4 bg-[#FDFBF7] rounded-2xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Avocado Toast"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1 ml-2">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-[#2D6A4F] font-semibold mb-2 ml-2">Ingredients (separate by commas)</label>
                    <textarea
                        rows="4"
                        className={`w-full p-4 bg-[#FDFBF7] rounded-2xl border ${errors.ingredients ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]`}
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Eggs, Avocado, Bread..."
                    />
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1 ml-2">{errors.ingredients}</p>}
                </div>

                <div>
                    <label className="block text-[#2D6A4F] font-semibold mb-2 ml-2">Preparation Steps</label>
                    <textarea
                        rows="6"
                        className={`w-full p-4 bg-[#FDFBF7] rounded-2xl border ${errors.steps ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]`}
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder="Step 1: Toast the bread..."
                    />
                    {errors.steps && <p className="text-red-500 text-sm mt-1 ml-2">{errors.steps}</p>}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-[#1B4332] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#081c15] transition-all transform hover:scale-105 shadow-lg"
                    >
                        Submit Recipe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipeForm;