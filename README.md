# [Backyard Bonnaroo](https://backyard-bonnaroo.herokuapp.com/)

Hello! 

Backyard Bonnaroo is a web application for up and coming musicians to post their shows. 

Is your band playing at a bar downtown? Are you hosting a house concert? Are you busking in the local park? Backyard Bonnaroo has you covered! Sign up and get the word out.

Want to listen to music instead of play it? Search for shows in your area! Each show includes a sample of that artist's music to help you pick the best possible show for you. Who knows? Your next favorite band could be playing next door!

Thanks for keeping it live, loud and local!

Live Link [Here](https://backyard-bonnaroo.herokuapp.com/)

Github Wiki Link [Here](https://github.com/JKLolling/Backyard_Bonnaroo/wiki/Home/)

## Technologies Used

### Backend
RESTful routes make this backend intuitive and organized. Additioanlly, I connected SQLAlchemy to my Postgresql database, and created database classes and relationships to keep  queries as simple and efficient as possible. The Google Maps and Google Geodcode APIs are used to quickly search for shows and display the results in an appealing, helpful way. For a complete list of backend technologies, see below:
 - Python
 - Flask
 - WTForms and Flask-WTF
 - SQLAlchemy Flask-SQLAlchemy
 - Alembic 
 - Postgresql
 - Google Maps API
 - Google Geocode API
### Frontend
Built using React, this site is a single page, wicked fast application. For a complete list of backend technologies, see below:
- Javascript
- React
- Redux
- HTML5
- CSS3

## Features

### Login / Signup
User's can login/signup. There is a 'demo user' for those that want to test the functionality without registering an account. Once signed in, a user's logged in status is preserved in a session cookie. 
![alt text](https://github.com/JKLolling/Backyard_Bonnaroo/blob/main/README_images/login.png?raw=true)
<br/><br/>
  
### View Trending artists right from the splash page
The splash page includes a search bar so user's can find out what shows are playing near them.  
Below the search feature is a list of the top artists on the website (based on the average of all their ratings)  
Clicking on one of these trending artist cards will direct the user to the soonest upcoming concert of that artist (shown as a pin on a google map)
![alt text](https://github.com/JKLolling/Backyard_Bonnaroo/blob/main/README_images/Splash_page.png?raw=true)
![alt text](https://github.com/JKLolling/Backyard_Bonnaroo/blob/main/README_images/trending_artists.png?raw=true)
<br/><br/>
  
### Search for Shows
User's can search locations directly from the maps page and the page will update.  
User's can also specify the date they want to see a show. 
![alt text](https://github.com/JKLolling/Backyard_Bonnaroo/blob/main/README_images/search_shows.png?raw=true)
![alt text](https://github.com/JKLolling/Backyard_Bonnaroo/blob/main/README_images/calendar.png?raw=true)
<br/><br/> 
  
### Make reservations
All the different show information is displayed to the left of the map, including a song player with a sample song from that artist.
![alt text](https://github.com/JKLolling/Backyard_Bonnaroo/blob/main/README_images/play_song.png?raw=true)
<br/><br/>  
   
### User Profile
Logged in users can navigate to their profile, where they can view upcoming reservations (orderded by how soon the show is) and  past shows they have been too (ordered by how long ago the show was).  
Users can cancel upcoming reservations and leave/update reviews for past shows they have seen.
![alt text](https://github.com/JKLolling/Backyard_Bonnaroo/blob/main/README_images/rate_artists.png?raw=true)
<br/><br/>  
  
## Installation Instructions

To run this application locally, follow these steps: 

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/JKLolling/Backyard_Bonnaroo.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the **.env.example** with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database and seed your database

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

6. Start the backend
   ```bash
   flask run
   ```
8. Install frontend dependencies 
   ```bash
   // In the react-app folder
   npm install
   ```
10. Start the frontend
    ```bash
    // In the react-app folder
    npm start
    ```
***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Obstacles and Solutions

### Retrieve nearby shows
When a user searches a location for shows, they only need the shows close to that location. Populating the map with every show would be extremely slow.  
One approach would be to retrieve all the shows then filter the results based on distance. While this works for smaller databases, it is not particularly scalable.   
The solution I implemented was to filter in the actual Postgresql query itself, thereby eliminating all downstream filtering.  
Below, I included the Haversine Formula (which calculates the distance between two points on the globe) as part of a postgresql query. I also filtered based on the user's selected date.  
The result is a performant, scalable way to retrieve the exact information needed. 
```Python
@show_routes.route('/', methods=['POST'])
def shows():
    center = request.get_json()['center']
    lat = center['lat']
    lng = center['lng']

    date = request.get_json()['date']

    # If the user did not specify a date, use today
    if(not date):
      date = datetime.date(datetime.now())
      date = str(date)

    query = f"""
            SELECT s.id, v.distance
            FROM shows s CROSS JOIN LATERAL
                (VALUES
                  ( 3959 * acos( cos( radians({lat}) ) * cos( radians( s.location_lat ) ) *
                    cos( radians( s.location_lng ) - radians({lng}) ) + sin( radians({lat}) ) * sin( radians( s.location_lat ) ) )
                        )
                ) v(distance)
            WHERE v.distance < 25 AND s.date = '{date}'
            ORDER BY s.date; """

    query = text(query)
    shows = Show.query.from_statement(query).all()

    return {"shows": [show.to_dict() for show in shows]}
  ```

### Rate a show
Logged in users can leave a review of a past show. The reviews are simply stars, 1-5.  
Bands have an average rating, based on the average of all the reviews of all their shows.  
Adding a review and updating the bands rating is fairly straightforward. The tricky part is allowing users to update their review after they've submitted it.  
You can't simply add a new review, because then the band's average wouldn't be accurate.  
My solution to this problem involved a series of checks: is this a new review, or an update? Is this the only review an artist has, or are there others?  
Based on the answers to those questions, different formulas were used to either replace, add a number to, or update a number in the average. 
```Python
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

      # If there is only one review, then the review you are modifying must be that review. So you can just replace the 
      #  artist rating with the new rating
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
```

## Future Features
- [ ] Add a band page, where user's can see the average rating, past shows and upcomming shows of a band
- [ ] Allow users to register a band / create their own band page 
- [ ] Allow users to submit upcoming shows for any bands that they registered / own
- [ ] Hook up the user's new show dates to AWS so user's can add sample songs and band photos
