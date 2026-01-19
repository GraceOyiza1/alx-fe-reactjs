import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
    recipes: [],
    addRecipe: (newRecipe) => set((state) => ({ recipes: [...state.recipes, newRecipe] })),
    // New Delete Action
    deleteRecipe: (recipeId) => set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
    // New Update Action
    updateRecipe: (updatedRecipe) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ),
    })),
    setRecipes: (recipes) => set({ recipes }),
}));