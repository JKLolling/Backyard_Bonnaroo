from datetime import datetime, timedelta, time
from app.models import db, Show, Artist

# Adds a demo user, you can add other users here if you want
def seed_shows():

  locations = [
    '196 Allen St, New York, NY 10002',
    '541 6th Ave, New York, NY 10011',
    '407 W 15th St, New York, NY 10011',
    '147 Bleecker St, New York, NY 10012',
    '251 W 30th St, New York, NY 10001',
    '519 2nd Ave, New York, NY 10016',
    '1650 Broadway, New York, NY 10019',
    '212 E 52nd St, New York, NY 10022',
    '44 E 32nd St, New York, NY 10016',
    '85 Avenue A, New York, NY 10009',
    '208 W 4th St suite c, Austin, TX 78701',
    'Swift Building, 315 Congress Ave, Austin, TX 78701',
    '1308 E 4th St, Austin, TX 78702',
    '912 Red River St, Austin, TX 78701',
    '2247 Guadalupe St, Austin, TX 78712',
  ]

  artist_ids = []
  for value in Artist.query.all():
    artist_ids.append(value.id)


  artist_num = 0
  location_num = 0
  # A year's worth of fake shows
  for day in range(365):
    # 3 shows per day
    for i in range(3):
      # book artist_num at location_num

      # print(datetime.date(datetime.now() + 7))
      date_and_time = datetime.date(datetime.now())
      time_change = timedelta(day)
      show_date = date_and_time + time_change

      # Mixes up the show times and cost. The variance looks nice
      hours = 20
      mins = 0
      cost = 0
      if (i % 3) == 0:
        mins = 30
        hours = 20
        cost = 10
      elif (i % 3) == 1:
        mins = 30
        hours = 19
        cost = 20
      show_time = time(hours, mins, 0)

      new_show = Show(
        location = locations[location_num],
        date = show_date,
        time = show_time,
        cost = cost,
        description = 'It\'s gonna be a great show, as per usual. Hope to see you there!',
        artist_id = artist_ids[artist_num]
      )
      db.session.add(new_show)

      # Cycle through the artists
      if artist_num == len(artist_ids) -1:
        artist_num = 0
      else:
        artist_num += 1

      # Cycle through the locations
      if location_num == len(locations) -1:
        location_num = 0
      else:
        location_num += 1

  db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_shows():
    db.session.execute('TRUNCATE TABLE shows CASCADE;')
    db.session.execute('ALTER SEQUENCE shows_id_seq RESTART WITH 1;')
    db.session.commit()
