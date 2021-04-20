from datetime import datetime
from .db import db

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key = True)
  comment = db.Column(db.Text)
  rating = db.Column(db.Float)

  artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  created_on = db.Column(db.DateTime, default=datetime.now())

  artist = db.relationship('Artist', back_populates='reviews')
  user = db.relationship('User', back_populates='reviews')


  def to_dict(self):
    return {
      "id": self.id,
      'comment': self.comment,
      'rating': self.rating,
      "artist_id": self.artist_id,
      'user_id': self.user_id
    }
