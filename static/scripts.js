// Makes sure JS doesn't run until HTML has loaded
document.addEventListener('DOMContentLoaded', function () {
    const ingredientForm = document.getElementById('ingredient-form');
    const ingredientsInput = document.getElementById('ingredients');
    const recipeResults = document.getElementById('recipe-results');

    ingredientForm.addEventListener('submit', function (event) {
        event.preventDefault(); // This line prevents default form which causes page to reload but since we are making an asynchronous HTTP request to fetch recipe data from the server, we don't want it to reload

        const ingredients = ingredientsInput.value;

        // Make a fetch request to the Flask backend
        fetch('/get_recipes?ingredients=' + ingredients)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Recipe retrieval failed. Please try again later.');
                }
                return response.json();
            })
            .then(data => {
                // Clear previous results
                recipeResults.innerHTML = '';

                // Loop through the data and display each recipe
                data.forEach(recipe => {
                    const recipeItem = document.createElement('div');
                    recipeItem.textContent = recipe.title;
                    recipeResults.appendChild(recipeItem);
                });
            })
            .catch(error => {
                renderError(error.message);
            });
    });
});
