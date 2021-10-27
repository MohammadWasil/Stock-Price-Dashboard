import sqlalchemy
from sqlalchemy.orm import sessionmaker
import sqlite3
#<script src="https://cdnjs.com/libraries/Chart.js"></script>
#     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
def getData():
    print("called")
    DATABASE_LOCATION = "sqlite:///stock_price.sqlite"
    engine = sqlalchemy.create_engine(DATABASE_LOCATION)

    try:
        conn = sqlite3.connect("stock_price.sqlite")
    except Error as e:
        print(e)
    cursor = conn.cursor()

    sql_query = """SELECT * FROM stock_price"""
    cursor.execute(sql_query)

    rows = cursor.fetchall()

    stock_dictionary = dict()
    for row in rows:    
        stock_prices = dict()
        stock_prices["open"] = row[0]
        stock_prices["high"] = row[1]
        stock_prices["low"] = row[2]
        stock_prices["close"] = row[3]
        stock_prices["volume"] = row[4]
        stock_dictionary[row[5]] = stock_prices

    return stock_dictionary
