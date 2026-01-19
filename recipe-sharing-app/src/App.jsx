import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar'; // Import SearchBar

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Navbar />
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar /> {/* Add SearchBar here */}
              <AddRecipeForm />
              <hr />
              <RecipeList />
            </>
          } />
          <Route path="/recipe/:recipeId" element={<RecipeDetailsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}
// ... include RecipeDetailsWrapper as before