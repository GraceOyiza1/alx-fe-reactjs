import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import it here
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Place it here so it shows on all pages */}
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route path="/" element={
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          } />
          <Route path="/recipe/:recipeId" element={<RecipeDetailsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper to handle the ID
import { useParams } from 'react-router-dom';
const RecipeDetailsWrapper = () => {
  const { recipeId } = useParams();
  return <RecipeDetails recipeId={Number(recipeId)} />;
};

export default App;