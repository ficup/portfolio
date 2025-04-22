from flask import Blueprint, flash, g, redirect, render_template, url_for
from flask import request as flask_request
import requests as http_request
from .static.constants import VALID_STOCKS

bp = Blueprint("main_view", __name__)

session_data = {
    'stock_data' : None,
    'newsfeed' : None,
    'valid_stocks' : VALID_STOCKS,
    'active_stock' : '',
    'data_is_up_to_date' : 1,
    'data_nav' : {
        'table' : 'stock_values', 
        'page_limit' : str(25), 
        'page' : str(0),
        'order_by' : 'date', 
        'order_mono' : 'desc', 
        'start' : '"2001-01-01"',
        'end' : '"2099-12-31"'
    },
    'data_columns':[
        {'key':'date', 'text':'Data'},
        {'key':'stock_price', 'text':'Cena'},
        {'key':'daily_relative_change', 'text':'Dzienna zmiana'},
    ]
}

@bp.route("/")
def index():
    return render_template("main_view.html", 
        stock_data=session_data['stock_data'], newsfeed=session_data['newsfeed'],
        valid_stocks=session_data['valid_stocks'], active_stock=session_data['active_stock'],
        data_is_up_to_date=session_data['data_is_up_to_date'],
        data_nav=session_data['data_nav'], data_columns=session_data['data_columns'] )