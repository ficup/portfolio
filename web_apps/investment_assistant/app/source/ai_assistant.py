from flask import Blueprint
from flask import flash
from flask import g
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
# from werkzeug.exceptions import abort

# from .auth import login_required
# from .db import get_db

bp = Blueprint("ai_assistant", __name__)


@bp.route("/ai_assistant")
def index():
    return render_template("ai_assistant.html")