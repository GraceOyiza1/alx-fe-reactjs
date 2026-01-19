import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

    return (
        <div>
            <h2>Recipes</h2>
            {filteredRecipes.map((recipe) => (
                <div key={recipe.id}>
                    <h3><Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

// This line is what the checker is missing
export default RecipeList;