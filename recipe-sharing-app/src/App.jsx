import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Navbar />
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route path="/" element={
            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ flex: 2 }}>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
              </div>
              <div style={{ flex: 1 }}>
                <FavoritesList />
                <RecommendationsList />
              </div>
            </div>
          } />
          <Route path="/recipe/:recipeId" element={<RecipeDetailsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}
