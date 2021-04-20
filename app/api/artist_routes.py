from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import Artist, Review, User, db

artist_routes = Blueprint('artists', __name__)


@artist_routes.route('/<int:artist_id>/reviews', methods=['POST'])
def post_review(artist_id):
    rating = request.get_json()['rating']
    user_id = request.get_json()['user_id']
    show_id = request.get_json()['show_id']

    review = Review.query.filter_by(user_id=user_id, show_id=show_id).first()
    if (review):
      review.rating = rating
    else:
      new_review = Review(
        rating= rating,
        user_id= user_id,
        artist_id= artist_id,
        show_id= show_id
      )
      db.session.add(new_review)

    db.session.commit()

    user = User.query.get(user_id)
    return user.to_dict()
