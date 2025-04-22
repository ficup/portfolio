from flask import Blueprint, flash, g, redirect, render_template, url_for
from flask import request as flask_request
import requests as http_request

from .db import get_db
from .main_view import session_data

bp = Blueprint("stock_selector", __name__)

@bp.route("/add_stock:<stock_name>", methods=["POST","GET"])
def add_stock(stock_name):
    db = get_db()
    cursor = db.cursor()

    qtable = 'stock_metadata'

    # Check if table is not empty.
    # Currently there can only be 1 symbol
    # TODO - change that
    cursor.execute( f"SELECT stock_name FROM stock_metadata")
    result = cursor.fetchall()
    if len(result) > 0:
        delete_stock(result[0]['stock_name'])

    if (stock_name != '') or (stock_name != None) :
        qcolumns = 'stock_name, is_up_to_date'
        qvalue = ''
        qvalue+= '"' + f'{stock_name}' + '",'
        qvalue+= '0' 

        cursor.execute( f"INSERT INTO {qtable} ( {qcolumns} ) VALUES ( {qvalue} )")
        db.commit()

    session_data['data_is_up_to_date'] = 0
    return redirect('/')


@bp.route("/delete_stock?<stock_name>",  methods=["POST","GET"])
def delete_stock(stock_name):
    db = get_db()
    cursor = db.cursor()

    qtable = 'stock_metadata'
    qkey = 'stock_name'
    qvalue = '"' + stock_name + '"'
    cursor.execute( f"DELETE FROM {qtable} WHERE {qkey} = {qvalue}")
    db.commit()
    return redirect('/')


@bp.route("/update_stock:<stock_name>,<last_update>,<is_up_to_date>", methods=["POST","GET"])
def update_stock(stock_name,last_update,is_up_to_date):

    db = get_db()
    cursor = db.cursor()

    qtable = 'stock_metadata'
    query=f'''
    UPDATE {qtable} SET
    is_up_to_date = {is_up_to_date} ,last_update = {'"' + last_update + '"'}
    WHERE stock_name = {'"' + stock_name + '"'}
    '''
    cursor.execute( query)
    db.commit()

    session_data['data_is_up_to_date'] = 1
    return redirect('/')