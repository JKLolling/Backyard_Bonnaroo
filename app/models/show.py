from datetime import datetime
from .db import db
from .user import reservation_pairs

class Show(db.Model):
  __tablename__ = 'shows'

  id = db.Column(db.Integer, primary_key = True)
  address = db.Column(db.String(255), nullable = False)
  location_lat = db.Column(db.Float, nullable=False)
  location_lng = db.Column(db.Float, nullable=False)
  date = db.Column(db.String(255), nullable = False)
  time = db.Column(db.String(255), nullable = False)
  cost = db.Column(db.Float, nullable = False)
  description = db.Column(db.Text)
  created_on = db.Column(db.DateTime, default=datetime.now())
  artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)

  artist = db.relationship("Artist", back_populates="shows")
  attendees = db.relationship('User', secondary=reservation_pairs, back_populates='reserved_shows')
  reviews = db.relationship('Review', back_populates='show')


  def to_dict(self):
    return {
      "id": self.id,
      "address": self.address,
      "location_lat": self.location_lat,
      "location_lng": self.location_lng,
      "date": self.date,
      "time": self.time,
      "cost": self.cost,
      "description": self.description,
      "artist_id": self.artist_id,
      'artist': self.artist.to_dict(),
    }
