from model import db, User

def create_user(email, password):
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user

if __name__ == "__main__":
    from server import app
    from model import connect_to_db

    connect_to_db(app)
