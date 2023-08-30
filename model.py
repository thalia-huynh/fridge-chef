from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

def connect_to_db(app, db_name):
    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    with app.app_context():
        db.create_all()

    print("Connected to the db!")

if __name__ == "__main__":
    from server import app

    connect_to_db(app, "fridge_chef_db")


# NTS: created fridge_chef_db but psql connected to thaliahuynh. When this happens, do 'psql -d fridge_chef_db' to specify which database
# IF CHANGES ARE MADE TO MODEL.PY THAT REQUIRES CHANGING A TABLE'S SCHEDME, DROP DATABASE AND RERUN CREATE_ALL
