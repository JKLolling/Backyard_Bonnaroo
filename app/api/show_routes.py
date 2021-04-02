from flask import Blueprint, jsonify
from app.models import Show

show_routes = Blueprint('shows', __name__)


@show_routes.route('/')
def shows():
    shows = Show.query.all()
    return {"shows": [show.to_dict() for show in shows]}



# sql = "SELECT *, ( 6371 * acos( cos( radians(" . $db->real_escape_string($lat) . ") ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(" . $db->real_escape_string($lng) . ") ) + sin( radians(" . $db->real_escape_string($lat) . ") ) * sin( radians( lat ) ) ) ) AS distance FROM your_table_name HAVING distance < 15";


# @user_routes.route('/<int:id>')
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
