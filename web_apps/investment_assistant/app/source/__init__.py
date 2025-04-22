import os

from flask import Flask

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        # a default secret that should be overridden by instance config
        SECRET_KEY="TODO",
    )

    # # # register the database commands
    from . import db

    # app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    app.config['MYSQL_DATABASE_HOST'] = 'db'
    app.config['MYSQL_DATABASE_USER'] = 'stock_user'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'stock_password'
    app.config['MYSQL_DATABASE_DB'] = 'stock'
    app.config['MYSQL_CHARSET'] = 'utf-8'
    db.mysql.init_app(app)

    # apply the blueprints to the app
    from . import main_view, ai_assistant, newsfeed, \
    stock_selector, stock_view, updater

    app.register_blueprint(main_view.bp)
    app.register_blueprint(ai_assistant.bp)
    app.register_blueprint(newsfeed.bp)
    app.register_blueprint(stock_selector.bp)
    app.register_blueprint(stock_view.bp)
    app.register_blueprint(updater.bp)

    # default endpoint
    app.add_url_rule("/", endpoint="main_view")

    return app