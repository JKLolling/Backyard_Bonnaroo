from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Show, db, Artist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/reservations', methods=['POST'])
@login_required
def make_reservation(id):
    show_id = request.get_json()

    user = User.query.get(id)
    show = Show.query.get(show_id)
    user.reserved_shows.append(show)

    db.session.commit()

    # return show.to_dict()
    return user.to_dict()

@user_routes.route('/<int:id>/reservations', methods=['DELETE'])
@login_required
def delete_reservation(id):
    data = request.get_json()
    print(data)
    time = data['time']
    artist = data['artist']
    date = data['date']

    query = (Show.query
      .filter(Show.artist.has(Artist.name == artist))
      .filter(Show.time == time)
      .filter(Show.date == date)
    )
    show = Show.query.from_statement(query).first()

    user = User.query.get(id)

    index = user.reserved_shows.index(show)
    user.reserved_shows.pop(index)

    db.session.commit()

    return user.to_dict()
