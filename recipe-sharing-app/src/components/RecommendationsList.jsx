import { useRecipeStore } from './recipeStore';
import { useEffect } from 'react';

const RecommendationsList = () => {
    const recommendations = useRecipeStore(state => state.recommendations);
    const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

    // Re-generate recommendations whenever the component mounts
    useEffect(() => {
        generateRecommendations();
    }, [generateRecommendations]);

    return (
        <div>
            <h2>Recommended for You</h2>
            {recommendations.length > 0 ? (
                recommendations.map(recipe => (
                    <div key={recipe.id} style={{ border: '1px solid #eee', padding: '10px', margin: '5px 0' }}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            ) : (
                <p>No recommendations available yet.</p>
            )}
        </div>
    );
};

export default RecommendationsList;