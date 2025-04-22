from flask import Blueprint, flash, g, redirect, render_template, url_for
from flask import request as flask_request
import requests as http_request

from .db import get_db
from .main_view import session_data

bp = Blueprint("stock_view", __name__)

@bp.route("/fetch_stock_data:<symbol>", methods = ["GET"])
def fetch_stock_data(symbol):
    response = http_request.get(
        f"http://api.marketstack.com/v2/eod?access_key=393d7eb396c5762b3d26bda5f64be621&symbols={symbol}&limit=250&sort=asc"
      )
    response = response.json()
    response_len = len(response['data'])

    db = get_db()
    cursor = db.cursor()
    qtable = 'stock_values'
    qcolumns = 'date, stock_price, daily_relative_change'
    
    cursor.execute(f'TRUNCATE TABLE {qtable}',) # TODO - później zmienić

    qvalue = '"' + response['data'][0]['date'][:10] + '",'
    qvalue += str(response['data'][0]['adj_close']) + ','
    qvalue += '0.0'
    cursor.execute( f"INSERT INTO {qtable} ( {qcolumns} ) VALUES ( {qvalue} )")

    for i in range(1,response_len):
 
        qvalue = '"' + response['data'][i]['date'][:10] + '",'
        qvalue += str(response['data'][i]['adj_close']) + ','
        qvalue += str( response['data'][i]['adj_close']/response['data'][i-1]['adj_close'] - 1 )
        
        cursor.execute( f"INSERT INTO {qtable} ( {qcolumns} ) VALUES ( {qvalue} )")

    db.commit()
    return redirect('/')

@bp.route("/get_stock_data:<qtable>,<qlimit>,<qoffset>,<qorder_by>,<qorder_mono>,<qstart>,<end>", 
    methods = ["GET"])
@bp.route("/get_stock_data", methods = ["GET"])
def get_stock_data(
    qtable = session_data['data_nav']['table'], qlimit = session_data['data_nav']['page_limit'], 
    qoffset = int(session_data['data_nav']['page'])*int(session_data['data_nav']['page_limit']), 
    qorder_by = session_data['data_nav']['order_by'], 
    qorder_mono = session_data['data_nav']['order_mono'], qstart = session_data['data_nav']['start'],
    qend = session_data['data_nav']['end']):

    query = f'''
    SELECT * FROM {qtable}
    WHERE date BETWEEN {qstart} AND {qend}
    ORDER BY {qorder_by} {qorder_mono}
    LIMIT {qlimit} OFFSET {qoffset}'''
    
    print(query)

    db = get_db()
    cursor = db.cursor()
    cursor.execute(query)
    db.commit()

    session_data['stock_data'] =cursor.fetchall()
    return redirect('/')