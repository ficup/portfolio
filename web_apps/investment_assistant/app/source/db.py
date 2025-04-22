from flask import current_app, g
from flaskext.mysql import MySQL

from pymysql.cursors import DictCursor

mysql=MySQL(cursorclass=DictCursor)

def get_db():
    if 'db' not in g:
        g.db = mysql.connect(
            
        ) 
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()