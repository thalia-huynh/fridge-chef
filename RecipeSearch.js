import React, { useState } from 'react';

function RecipeSearch() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/get_recipes?ingredients=${ingredients}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch recipes. Please try again later.');
      setRecipes([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredients">Enter your ingredients:</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          placeholder="Enter ingredients..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit">Search Recipes</button>
      </form>

      {error && <p>{error}</p>}

      <div id="recipe-results">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-result">
            <h2>{recipe.title}</h2>
            <p>{recipe.summary}</p>
            <img src={recipe.image} alt={recipe.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;

  