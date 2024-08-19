  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom'; 

  const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get('https://dummyjson.com/recipes');
          setRecipes(response.data.recipes);
        } catch (err) {
          console.error("An error occurred while fetching the recipes:", err);
          setError('Failed to fetch recipes. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchRecipes();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="container-2">
        <h2>Recipes</h2>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default RecipeList;

