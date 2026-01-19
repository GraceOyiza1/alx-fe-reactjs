import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {

    const recipes = useRecipeStore(state => state.recipes);
    const filteredRecipes = useRecipeStore(state => state.filteredRecipes);


    const displayData = filteredRecipes.length > 0 ? filteredRecipes : recipes;

    return (
        <div>
            <h2>Recipe List</h2>
            {displayData.map(recipe => (
                <div key={recipe.id}>
                    <h3><Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};


export default RecipeList;