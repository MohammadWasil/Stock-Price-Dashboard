# -*- coding: utf-8 -*-
"""
Created on Sun Oct 24 02:17:18 2021
@author: Wasil
"""
import sqlalchemy
from sqlalchemy.orm import sessionmaker
import sqlite3
#import json
import requests
import pandas as pd

url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&outputsize=full&adjusted=true&apikey='   
#url_monthly = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&outputsize=full&apikey='   
r = requests.get(url)
#r_monthly = requests.get(url_monthly)

data = r.json()
#data_monthly = r_monthly.json()

#print(data['Meta Data'])
#print(data['Time Series (5min)'].keys())
#df = pd.DataFrame(columns=['1. open', '2. high', '3. low', '4. close', '5. volume', 'Timestamp'])
#for i, points in enumerate(data['Time Series (5min)'].keys()):
    #print(pd.DataFrame.from_dict(data['Time Series (5min)'][points]), columns=['1. open', '2. high', '3. low', '4. close', '5. volume'], orient=points )
#    df = df.append([data['Time Series (5min)'][points]])
#    df["Timestamp"].iloc[i] = points
#df.reset_index(inplace = True, drop = True)
#df.columns = ['open', 'high', 'low', 'close', 'volume', 'Timestamp']

DATABASE_LOCATION = "sqlite:///stock_price.sqlite"
engine = sqlalchemy.create_engine(DATABASE_LOCATION)
conn = sqlite3.connect("stock_price.sqlite")
cursor = conn.cursor()

sql_query = """CREATE TABLE IF NOT EXISTS stock_price(
              open FLOAT(50, 4),
              high FLOAT(50, 4),
              low FLOAT(50, 4),
              close FLOAT(50, 4),
              volume INT,
              Timestamp VARCHAR(50),
              CONSTRAINT primary_key_contraint PRIMARY KEY (Timestamp)
    )"""
cursor.execute(sql_query)
print("Database opened successfully!")

#try:
for key, value in data['Time Series (1min)'].items():
    cursor.execute("""INSERT INTO stock_price VALUES (?, ?, ?, ?, ?, ?)""", 
                (float(value['1. open']), float(value['2. high']), float(value['3. low']), float(value['4. close']), float(value['5. volume']), key ))
    conn.commit()

print("Data inserted.") 
#except:
print("Data already exists")

conn.close()
print("Database closed successfully")

# monthly
#DATABASE_LOCATION_MONTHLY = "sqlite:///stock_price_monthly.sqlite"
#engine = sqlalchemy.create_engine(DATABASE_LOCATION_MONTHLY)
#conn = sqlite3.connect("stock_price_monthly.sqlite")
#cursor = conn.cursor()

#sql_query = """CREATE TABLE IF NOT EXISTS stock_price_monthly(
#              open FLOAT(50, 4),
#              high FLOAT(50, 4),
#              low FLOAT(50, 4),
#              close FLOAT(50, 4),
#              volume INT,
#              Timestamp VARCHAR(50),
#              CONSTRAINT primary_key_contraint PRIMARY KEY (Timestamp)
#    )"""
#cursor.execute(sql_query)

#print("Database opened successfully!")

#try:
#for key, value in data_monthly['Time Series (Daily)'].items():
#    cursor.execute("""INSERT INTO stock_price_monthly VALUES (?, ?, ?, ?, ?, ?)""", 
#                (float(value['1. open']), float(value['2. high']), float(value['3. low']), float(value['4. close']), float(value['5. volume']), key ))
#    conn.commit()

#print("Data inserted.") 
#except:
#print("Data already exists")

#conn.close()
#print("Database closed successfully")