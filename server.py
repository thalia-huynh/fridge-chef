from flask import Flask, render_template

app = Flask(__name__)

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
    
    # Make request to Spoonacular
    headers = {'apiKey': api_key}
    params = {'ingredients': ingredients}
    response = requests.get('https://api.spoonacular.com/recipes/findByIngredients', headers=headers, params=params)
    
    # Check if request was successful
    if response.status_code == 200:
        recipes = response.json()
        return jsonify(recipes)
    else:
        return jsonify({'error': 'Unable to fetch recipes'})

if __name__ == '__main__':
    from model import connect_to_db

    connect_to_db(app, "fridge_chef_db")

    app.run(debug=True, host="0.0.0.0")