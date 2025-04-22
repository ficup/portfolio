from flask import Blueprint, flash, g, redirect, render_template, url_for
from flask import request as flask_request
import requests as http_request

from .db import get_db
from .main_view import session_data

bp = Blueprint("newsfeed", __name__)

@bp.route("/fetch_news", methods = ["GET"])
def fetch_news():
    response = http_request.get(
        "https://api.marketaux.com/v1/news/all?api_token=iorjnoZF8cVSfGyWP4dwMRWcbhMTau6ko9i1CGg7&language=pl"
      )
    response = response.json()
    response_len = response['meta']['returned']

    db = get_db()
    cursor = db.cursor()
    qtable = 'stock_newsfeed'
    qcolumns = 'title, url, image_url, description'

    cursor.execute(f'TRUNCATE TABLE {qtable}',)

    for i in range(response_len):
        qvalue = ''
        qvalue+= '"' + str(response['data'][i]['title']) + '",'
        qvalue+= '"' + str(response['data'][i]['url']) + '",'
        qvalue+= '"' + str(response['data'][i]['image_url']) + '",'
        qvalue+= '"' + str(response['data'][i]['description']).replace('"','') + '"'
        print( f"INSERT INTO {qtable} ( {qcolumns} ) VALUES ( {qvalue} )")
        
        cursor.execute( f"INSERT INTO {qtable} ( {qcolumns} ) VALUES ( {qvalue} )")

    db.commit()
    return redirect('/')

@bp.route("/get_news", methods = ["GET"])
def get_news(qtable='stock_newsfeed', qorder_by='title', qorder_mono='desc', 
                 qlimit=str(10), qoffset=str(0)):

    query = f'''
    SELECT * FROM {qtable}
    ORDER BY {qorder_by} {qorder_mono}
    LIMIT {qlimit} OFFSET {qoffset}'''
    
    print(query)

    db = get_db()
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()

    session_data['newsfeed'] =cursor.fetchall()
    return redirect('/')
