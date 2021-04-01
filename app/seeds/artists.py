from app.models import db, Artist

# Adds a demo user, you can add other users here if you want
def seed_artists():

    # Vampire Weekend
    vamps = Artist(
      name='Vampire Weekend',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/vamps.jpg',
      sample_song='../static/songs/A_Punk.mp3'
    )
    db.session.add(vamps)

    # Kasabian
    kasa = Artist(
      name='Kasabian',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/Kasabian.jpg',
      sample_song='../static/songs/Underdog.mp3'
    )
    db.session.add(kasa)

    # The Orwells
    ors = Artist(
      name='The Orwells',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/Orwells.png',
      sample_song='../static/songs/Hippie_Soldier.mp3'
    )
    db.session.add(ors)

    # OK Go
    go = Artist(
      name='OK Go',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/OkGo.jpg',
      sample_song='../static/songs/Here_it_Goes.mp3'
    )
    db.session.add(go)

    # The White Stripes
    white = Artist(
      name='The White Stripes',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/WhiteStripes.jpg',
      sample_song='../static/songs/Fell_In_Love.mp3'
    )
    db.session.add(white)

    # Caravan Palace
    cara = Artist(
      name='Caravan Palace',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/Palace.jpg',
      sample_song='../static/songs/Lay_Down.mp3'
    )
    db.session.add(cara)

    # Pulp
    pulp = Artist(
      name='Pulp',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/Pulp.jpg',
      sample_song='../static/songs/Babies.mp3'
    )
    db.session.add(pulp)

    # The Killers
    killers = Artist(
      name='The Killers',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/Killers.jpg',
      sample_song='../static/songs/Somebody_told_me.mp3'
    )
    db.session.add(killers)

    # Oasis
    oasis = Artist(
      name='Oasis',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/Oasis.jpg',
      sample_song='../static/songs/Supersonic.mp3'
    )
    db.session.add(oasis)

    # Franz Ferdinand
    franz = Artist(
      name='Franz Ferdinand',
      bio='Bunch of cool indie hipsters. Come see us play and see if the hype is real!',
      banner_URL='../static/band_photos/Franz.jpg',
      sample_song='../static/songs/Take_Me_Out.mp3'
    )
    db.session.add(franz)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_artists():
    db.session.execute('TRUNCATE artists;')
    db.session.commit()
