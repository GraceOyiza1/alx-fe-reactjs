import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
    const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
    const filterRecipes = useRecipeStore((state) => state.filterRecipes);
    const searchTerm = useRecipeStore((state) => state.searchTerm);

    // Automatically trigger filtering whenever the search term changes
    useEffect(() => {
        filterRecipes();
    }, [searchTerm, filterRecipes]);

    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search recipes..."
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px' }}
            />
        </div>
    );
};

export default SearchBar;