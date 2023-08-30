from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('registration')
def register():
    return render_template('registration.html')

if __name__ == '__main__':
    from model import connect_to_db

    connect_to_db(app, "fridge_chef_db")

    app.run(debug=True, host="0.0.0.0")