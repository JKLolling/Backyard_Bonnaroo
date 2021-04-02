from flask import Blueprint, jsonify, request
from app.models import Show
from sqlalchemy.sql import text

show_routes = Blueprint('shows', __name__)


@show_routes.route('/', methods=['POST'])
def shows():
    lat = request.get_json()['lat']
    lng = request.get_json()['lng']

    query = f"""
            SELECT s.id, v.distance
            FROM shows s CROSS JOIN LATERAL
                (VALUES
                  ( 3959 * acos( cos( radians({lat}) ) * cos( radians( s.location_lat ) ) *
                    cos( radians( s.location_lng ) - radians({lng}) ) + sin( radians({lat}) ) * sin( radians( s.location_lat ) ) )
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
