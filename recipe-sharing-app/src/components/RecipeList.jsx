import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    // Use filteredRecipes for the display
    const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

    return (
        <div>
            <h2>Recipes</h2>
            {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                    <div key={recipe.id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                        <h3>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            ) : (
                <p>No recipes found matching your search.</p>
            )}
        </div>
    );
};

export default RecipeList;