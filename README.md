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

## Obstacles

## Future Features
