from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import Show
from sqlalchemy.sql import text

show_routes = Blueprint('shows', __name__)


@show_routes.route('/', methods=['POST'])
def shows():
    center = request.get_json()['center']
    lat = center['lat']
    lng = center['lng']

    date = request.get_json()['date']

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
            ORDER BY s.date
            LIMIT 20; """

    query = text(query)
    shows = Show.query.from_statement(query).all()

    return {"shows": [show.to_dict() for show in shows]}
