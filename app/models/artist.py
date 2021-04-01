from .db import db
from datetime import datetime

class Artist(db.Model):
  __tablename__ = 'artists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable = False, unique = True)
  bio = db.Column(db.Text)
  banner_URL = db.Column(db.String(255))
  sample_song = db.Column(db.String(255))
  created_on = db.Column(db.DateTime, default=datetime.now())


  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "bio": self.bio,
      "banner_URL": self.banner_URL,
      "sample_song": self.sample_song
    }
