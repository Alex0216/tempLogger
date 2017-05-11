from app import app
from flask import Flask, render_template, g, request, jsonify
import sqlite3
from dateutil.parser  import parse
from datetime import datetime, timedelta
import RPi.GPIO as GPIO

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
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(18, GPIO.OUT)
    GPIO.output(18, GPIO.HIGH)
    fromDate = datetime.now() - timedelta(days=1)
    toDate = datetime.now()
    
    cur = get_db().cursor()
    cur.execute("SELECT * FROM temphum WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp", (fromDate.isoformat(), toDate.isoformat()))
    rows = cur.fetchall()
    rows.reverse()
    temperatures = [round(x[1],2) for x in rows]
    humidity = [round(x[2],2) for x in rows]
    timestamps = [x[0] for x in rows] #strftime("%Y-%b-%dT%H:%M")
    GPIO.output(18, GPIO.LOW)
    return render_template('index.html',fromdate=fromDate, todate=toDate, labels=timestamps, temps=temperatures, hum=humidity)

@app.route('/_get_data')
def get_data():
    if request.args.get('startDate') and request.args.get('endDate'):
        startDate = request.args["startDate"]
        endDate = request.args["endDate"]
        print parse(startDate)
        print parse(endDate)
        fromDate = parse(startDate)
        toDate = parse(endDate)
        cur = get_db().cursor()
        cur.execute("SELECT * FROM temphum WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp", (fromDate.isoformat(), toDate.isoformat()))
        rows = cur.fetchall()
        rows.reverse()
        temperatures = [round(x[1],2) for x in rows]
        humidities = [round(x[2],2) for x in rows]
        timestamps = [x[0] for x in rows] #strftime("%Y-%b-%dT%H:%M")
        print timestamps
        GPIO.output(18, GPIO.LOW)
    return jsonify(timestamps=timestamps, temperatures=temperatures, humidities=humidities)
