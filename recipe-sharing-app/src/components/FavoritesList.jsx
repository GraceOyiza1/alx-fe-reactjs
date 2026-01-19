import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
    const favorites = useRecipeStore(state => state.favorites.map(id =>
        state.recipes.find(recipe => recipe.id === id)
    ));

    return (
        <div>
            <h2>My Favorites</h2>
            {favorites.length > 0 ? (
                favorites.map(recipe => (
                    <div key={recipe.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '5px 0' }}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            ) : (
                <p>You haven't added any favorites yet.</p>
            )}
        </div>
    );
};

export default FavoritesList;