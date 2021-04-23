from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import Artist, Review, User, db, Show

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
    return {"hot_artists": [artist.to_dict() for artist in artists]}


@artist_routes.route('/<int:artist_id>', methods=['GET'])
def get_shows(artist_id):
  artist = Artist.query.get(artist_id)

  date = datetime.date(datetime.now())
  date = str(date)
  today_arr = date.split('-')
  [today_year, today_month, today_date] = today_arr

  valid_shows = []
  for show in artist.shows:
    date = show.to_dict()['date']
    show_date_arr = date.split('-')

    [show_year, show_month, show_date] = show_date_arr

    # For now, we don't need that many shows
    if len(valid_shows) > 9:
      break

    if int(show_year) > int(today_year):
      valid_shows.append(show)
    elif int(show_year) == int(today_year) and int(show_month) > int(today_month):
      valid_shows.append(show)
    elif int(show_year) == int(today_year) and int(show_month) == int(today_month) and int(show_date) >= int(today_date):
      valid_shows.append(show)


  return {'shows': [show.to_dict() for show in valid_shows]}
