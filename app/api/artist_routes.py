from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import Artist, Review, User, db

artist_routes = Blueprint('artists', __name__)


@artist_routes.route('/<int:artist_id>/reviews', methods=['POST'])
def post_review(artist_id):
    old_rating = request.get_json()['old_rating']
    new_rating = request.get_json()['new_rating']
    user_id = request.get_json()['user_id']
    show_id = request.get_json()['show_id']

    artist = Artist.query.get(artist_id)
    num_reviews = len(artist.reviews)

    review = Review.query.filter_by(user_id=user_id, show_id=show_id).first()
    if (review):
      review.rating = new_rating

      # This is the formular for removing numbers from an average. We have to remove the old rating before adding the new
      if num_reviews < 2:
        artist.rating = 0
      else:
        artist.rating = (num_reviews * artist.rating - old_rating) / (num_reviews - 1)

      # This is the formula for adding numbers to an average
      artist.rating = artist.rating + (new_rating - artist.rating) / (num_reviews + 1)
    else:
      new_review = Review(
        rating= new_rating,
        user_id= user_id,
        artist_id= artist_id,
        show_id= show_id
      )
      db.session.add(new_review)

      # This is the formula for adding numbers to an average.
      artist.rating = artist.rating + (new_rating - artist.rating) / (num_reviews+1)

    print(new_rating, artist.rating)
    db.session.commit()

    user = User.query.get(user_id)
    return user.to_dict()


@artist_routes.route('/', methods=['GET'])
def get_top_artists():
    artists = Artist.query.order_by(Artist.rating)
    return [artist.to_dict for artist in artists]

    # review = Review.query.filter_by(user_id=user_id, show_id=show_id).first()
    # if (review):
    #   review.rating = rating
    # else:
    #   new_review = Review(
    #     rating= rating,
    #     user_id= user_id,
    #     artist_id= artist_id,
    #     show_id= show_id
    #   )
    #   db.session.add(new_review)

    # db.session.commit()

    # user = User.query.get(user_id)
    # return user.to_dict()
