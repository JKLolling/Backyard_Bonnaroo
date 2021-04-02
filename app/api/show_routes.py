from flask import Blueprint, jsonify
from app.models import Show
from sqlalchemy.sql import text

show_routes = Blueprint('shows', __name__)


@show_routes.route('/')
def shows():
    # {lat: 30.267153, lng: -97.7430608
    # query = 'SELECT id, ( 3959 * acos( cos( radians(30.267153) ) * cos( radians( location_lat ) ) \
    #         * cos( radians( location_lng ) - radians(-97.7430608) ) + sin( radians(30.267153) ) * sin(radians(location_lat)) ) ) AS distance \
    #         FROM shows \
    #         HAVING distance < 25 \
    #         ORDER BY distance \
    #         LIMIT 20; '

    query = """
            SELECT s.id, v.distance
            FROM shows s CROSS JOIN LATERAL
                (VALUES ( 3959 * acos( cos( radians(30.267153) ) * cos( radians( s.location_lat ) ) *
                cos( radians( s.location_lng ) - radians(-97.7430608) ) + sin( radians(30.267153) ) * sin( radians( s.location_lat ) ) )
                        )
                ) v(distance)
            WHERE v.distance < 25
            ORDER BY s.date
            LIMIT 20; """

    query = text(query)
    shows = Show.query.from_statement(query).all()

    return {"shows": [show.to_dict() for show in shows]}



# sql = "SELECT *, ( 6371 * acos( cos( radians(" . $db->real_escape_string($lat) . ") ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(" . $db->real_escape_string($lng) . ") ) + sin( radians(" . $db->real_escape_string($lat) . ") ) * sin( radians( lat ) ) ) ) AS distance FROM your_table_name HAVING distance < 15";


# @user_routes.route('/<int:id>')
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
