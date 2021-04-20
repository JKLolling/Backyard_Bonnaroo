from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import Artist, Review, db

artist_routes = Blueprint('artists', __name__)


@artist_routes.route('/<int:artist_id>/reviews', methods=['POST'])
def post_review(artist_id):
    rating = request.get_json()['rating']
    user_id = request.get_json()['user_id']

    new_review = Review(
      rating= rating,
      user_id= user_id,
      artist_id= artist_id
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()
