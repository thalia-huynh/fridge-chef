from model import db, User

def create_user(email, password):
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user

def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

if __name__ == "__main__":
    from server import app
    from model import connect_to_db

    connect_to_db(app)
