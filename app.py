from flask import Flask, render_template, request, jsonify
from get_data import getData
app = Flask(__name__)

@app.route('/')
def welcome():
    return render_template('index.html')

@app.route("/retrieveData", methods=["POST"])
def retrieveData():
    stock_dictionary = getData()
    return jsonify(stock_dictionary)

app.run(debug=True)