from app import app
from flask import render_template, g, request
import sqlite3
from dateutil.parser  import parse
from datetime import datetime, timedelta

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
    fromDateString = request.args.get('from','')
    fromDate = datetime.now() - timedelta(days=1)
    toDate = datetime.now()
    if fromDateString:
        fromDate = parse(fromDateString)
        toDateString = request.args.get('to', '')
        if toDateString:
            toDate = parse(toDateString)    
            if toDate == fromDate:
                toDate += timedelta(days=1)
            print toDate
            print fromDate
    
    cur = get_db().cursor()
    cur.execute("SELECT * FROM temphum WHERE timestamp BETWEEN date(?) AND date(?) ORDER BY timestamp", (fromDate, toDate))
    rows = cur.fetchall()
    rows.reverse()
    temperatures = [round(x[1],2) for x in rows]
    humidity = [round(x[2],2) for x in rows]
    timestamps = [x[0] for x in rows] #strftime("%Y-%b-%dT%H:%M")
    return render_template('index.html',fromdate=fromDate, todate=toDate, labels=timestamps, temps=temperatures, hum=humidity)
