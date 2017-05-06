from datetime import datetime
import sqlite3
import Adafruit_DHT
from os import path

humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.AM2302, 4)
d = datetime.now().isoformat()
print(d)
conn = sqlite3.connect(path.join(path.dirname(__file__), 'templog.db'), detect_types=sqlite3.PARSE_DECLTYPES)

conn.execute("INSERT INTO temphum(timestamp, temp, humidity) values(?,  ?, ?)", (d, temperature, humidity))
conn.commit()
conn.close()

