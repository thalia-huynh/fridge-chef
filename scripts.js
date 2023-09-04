document.addEventListener('DOMContentLoaded', function () {
    const ingredientForm = document.getElementById('ingredient-form');
    const ingredientsInput = document.getElementById('ingredients');
    const recipeResults = document.getElementById('recipe-results');
  
    ingredientForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const ingredients = ingredientsInput.value;
  
      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();
  
      // Configure the request
      xhr.open('GET', `/get_recipes?ingredients=${ingredients}`, true);
  
      // Define the onload event handler
      xhr.onload = function () {
        if (xhr.status === 200) {
          // Request was successful, parse and display the results
          const recipes = JSON.parse(xhr.responseText);
          renderRecipes(recipes);
        } else {
          // Request failed, display an error message
          renderError('Failed to fetch recipes. Please try again later.');
        }
      };
  
      // Handle network errors
      xhr.onerror = function () {
        renderError('Network error occurred. Please check your connection.');
      };
  
      // Send the request
      xhr.send();
    });
  
    function renderRecipes(recipes) {
      recipeResults.innerHTML = ''; // Clear previous results
  
      recipes.forEach(function (recipe) {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
          <h2>${recipe.title}</h2>
          <p>${recipe.summary}</p>
          <img src="${recipe.image}" alt="${recipe.title}">
        `;
        recipeResults.appendChild(recipeDiv);
      });
    }
  
    function renderError(errorMessage) {
      recipeResults.innerHTML = `<p>${errorMessage}</p>`;
    }
  });
  