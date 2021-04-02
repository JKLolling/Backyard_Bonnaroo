from .db import db
from datetime import datetime

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
      "artist_id": self.artist_id
    }