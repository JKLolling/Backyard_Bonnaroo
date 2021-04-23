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

      # If there is only one review, then the review you are modifying must be that review. So you can just replace the artist rating
      #   with the new rating
      if num_reviews < 2:
        artist.rating = new_rating
      else:
        # Formula for replacing a number in an average
        artist.rating = (num_reviews * artist.rating - old_rating + new_rating) / num_reviews
    else:
      new_review = Review(
        rating= new_rating,
        user_id= user_id,
        artist_id= artist_id,
        show_id= show_id
      )
      db.session.add(new_review)
      # Formula for adding a number to an average.
      artist.rating = artist.rating + (new_rating - artist.rating) / (num_reviews+1)

    db.session.commit()

    user = User.query.get(user_id)
    return user.to_dict()


@artist_routes.route('/', methods=['GET'])
def get_top_artists():
    artists = Artist.query.order_by(Artist.rating).all()
    # for artist in artists:
    #   print(artist.name, artist.rating)
    #   print(artist.to_dict())
    return {"hot_artists": [artist.to_dict() for artist in artists]}
    # return {'yo':'Yo'}
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
