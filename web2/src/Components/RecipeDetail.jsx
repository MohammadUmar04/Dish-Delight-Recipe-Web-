  import { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import axios from 'axios';

  const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();  
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
          setRecipe(response.data);
        } catch (err) {
          console.error("An error occurred while fetching the recipe:", err);
          setError('Failed to fetch recipe details. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    }, [id]);

    const handleBackClick = () => {
      navigate('/recipes');  
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="container">
        <h2>{recipe.name}</h2>
        <img src={recipe.image} alt={recipe.name} style={{ maxWidth: '100%', height: 'auto' }} />
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
        <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Calories Per Serving:</strong> {recipe.caloriesPerServing}</p>
        <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        <button onClick={handleBackClick}>Back to Recipe List</button>
      </div>
    );
  };

  export default RecipeDetail;
