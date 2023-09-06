import os
from flask import Flask, request, jsonify, render_template
import requests
from model import connect_to_db

app = Flask(__name__)

# Get API key from environment variable
api_key = '02194b4ccf05487e84a5dd73ce253475'

# Homepage
@app.route('/')
def index():
    return render_template('index.html')

# User registration
@app.route('/registration')
def register():
    return render_template('registration.html')

# Get recipes
@app.route('/get_recipes', methods=['GET'])
def get_recipes():
    ingredients = request.args.get('ingredients')

    # Parameters for request
    payload = {
        'apiKey': api_key,
        'ingredients': ingredients,
        'number': 10,
        'ranking': 1
    }

    # Make the request to Spoonacular
    url = 'https://api.spoonacular.com/recipes/findByIngredients'
    response = requests.get(url, params=payload)
    response = response.json()
    print(response)
    return response


if __name__ == '__main__':
    # Connect to the database
    connect_to_db(app, "fridge_chef_db")

    app.run(debug=True, host="0.0.0.0")
