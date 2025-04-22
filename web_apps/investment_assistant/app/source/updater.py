from flask import Blueprint, flash, g, redirect, render_template, url_for
from flask import request as flask_request
import requests as http_request

from .db import get_db

from . import newsfeed, stock_view, main_view, stock_selector

from datetime import datetime

bp = Blueprint("updater", __name__, url_prefix="/update")


# TODO DEBUG
@bp.route("/test_db")
def test_db():
    # return render_template("updater.html")
    db = get_db()
    db.execute("SELECT * FROM stock_metadata")
    result = dict(db.fetchall())
    return result

# TODO DEBUG
@bp.route("/test_api", methods = ["GET", "POST"]) 
def test_api():
    if flask_request.method == 'GET' :
        response = http_request.get(
            "https://api.marketaux.com/v1/news/all?api_token=iorjnoZF8cVSfGyWP4dwMRWcbhMTau6ko9i1CGg7"
          )
        response = response.json()
        response_len = response['meta']['returned']
        result = {}
        for i in range(response_len):
            result[i] = {
                'title' : response['data'][i]['title'],
                'url' : response['data'][i]['url'],
                'image_url' : response['data'][i]['image_url'],
                'description' : response['data'][i]['description']
            }
            
        
        return result

@bp.route("/all", methods = ["POST"]) 
def update():

    db = get_db()
    cursor = db.cursor()
    cursor.execute( f"SELECT stock_name, last_update, is_up_to_date FROM stock_metadata")
    meta_info = cursor.fetchall()

    if len( meta_info ) > 0:

        meta_info = meta_info[0] # TODO - wiele stocków
        if ( meta_info['is_up_to_date'] == 0 ) or ( main_view.session_data['stock_data'] == None ):

            today = datetime.today().strftime('%Y-%m-%d')
            if  meta_info['last_update'] != today:
                newsfeed.fetch_news()
                stock_view.fetch_stock_data(meta_info['stock_name'])

            newsfeed.get_news()
            stock_view.get_stock_data()

            stock_selector.update_stock(meta_info['stock_name'],today,1)
        main_view.session_data['active_stock'] = meta_info['stock_name']

    return redirect('/')

@bp.route('/page:<page_num>')
def update_page(page_num):
    main_view.session_data['data_nav']['page'] = page_num
    data_nav = main_view.session_data['data_nav']
    return stock_view.get_stock_data(
        data_nav['table'], data_nav['page_limit'],
        str(int(data_nav['page'])*int(data_nav['page_limit'])), 
        data_nav['order_by'], data_nav['order_mono'], 
        data_nav['start'], data_nav['end'], 
    )

@bp.route('/page/decrement')
def decrement_page():
    current_page = int( main_view.session_data['data_nav']['page'] )
    if current_page > 0:
        main_view.session_data['data_nav']['page'] = str(current_page - 1)
    data_nav = main_view.session_data['data_nav']
    return stock_view.get_stock_data(
        data_nav['table'], data_nav['page_limit'],
        str(int(data_nav['page'])*int(data_nav['page_limit'])), 
        data_nav['order_by'], data_nav['order_mono'], 
        data_nav['start'], data_nav['end'], 
    )

@bp.route('/page/increment')
def increment_page():
    current_page = int( main_view.session_data['data_nav']['page'] )
    main_view.session_data['data_nav']['page'] = str(current_page + 1)
    data_nav = main_view.session_data['data_nav']
    return stock_view.get_stock_data(
        data_nav['table'], data_nav['page_limit'],
        str(int(data_nav['page'])*int(data_nav['page_limit'])), 
        data_nav['order_by'], data_nav['order_mono'], 
        data_nav['start'], data_nav['end'], 
    )

@bp.route('/date_start:<date_start>')
def update_start_date(date_start):
    main_view.session_data['data_nav']['start'] = '"' + date_start + '"'
    data_nav = main_view.session_data['data_nav']
    return stock_view.get_stock_data(
        data_nav['table'], data_nav['page_limit'],
        str(int(data_nav['page'])*int(data_nav['page_limit'])), 
        data_nav['order_by'], data_nav['order_mono'], 
        data_nav['start'], data_nav['end'], 
    )

@bp.route('/date_end:<date_end>')
def update_end_date(date_end):
    main_view.session_data['data_nav']['end'] = '"' + date_end + '"'
    data_nav = main_view.session_data['data_nav']
    return stock_view.get_stock_data(
        data_nav['table'], data_nav['page_limit'],
        str(int(data_nav['page'])*int(data_nav['page_limit'])), 
        data_nav['order_by'], data_nav['order_mono'], 
        data_nav['start'], data_nav['end'], 
    )

@bp.route('/sort:<order_by>,<order_mono>')
def update_order(order_by, order_mono):
    main_view.session_data['data_nav']['order_by'] = order_by
    main_view.session_data['data_nav']['order_mono'] = order_mono
    data_nav = main_view.session_data['data_nav']
    return stock_view.get_stock_data(
        data_nav['table'], data_nav['page_limit'],
        str(int(data_nav['page'])*int(data_nav['page_limit'])), 
        data_nav['order_by'], data_nav['order_mono'], 
        data_nav['start'], data_nav['end'], 
    )