from app import app
from flask import render_template, g
import sqlite3


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect('templog.db')
    return db

#app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
@app.route('/index')
def index():
    cur = get_db().cursor()
    cur.execute("SELECT * FROM temphum ORDER BY timestamp DESC LIMIT 1")
    row = cur.fetchone()
    return render_template('index.html', temperature=row[1], humidity=row[2])
