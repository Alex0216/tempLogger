from os import path

WTF_CSRF_ENABLED = True
SECRET_KEY = 'princesse123'

db_filename = path.join(path.dirname(__file__), 'templog.db')
