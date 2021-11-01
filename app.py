from flask import Flask, render_template, request, jsonify
from get_data import get_all_data, get_one_day, get_one_month
app = Flask(__name__)

@app.route('/')
def welcome():
    return render_template('index.html')

@app.route("/retrieve_data", methods=["POST"])
def retrieve_data():
    stock_dictionary = get_all_data()
    return jsonify(stock_dictionary)

@app.route("/get_one_day", methods=["POST"])
def retrieve_one_day():
    get_one_day_data = get_one_day()
    return jsonify(get_one_day_data)

@app.route("/get_one_month_data", methods=["POST"])
def retrieve_one_month():

    get_one_month_data = get_one_month()
    return get_one_month_data

@app.route("/formData", methods=["GET", "POST"])
def retrieve_date_from_cal():        

    if request.method == "POST":
        
        from_date = request.form['fromDate']
        to_date = request.form['toDate']
        print(from_date)
        print(to_date)

        response = "hello Wasil, the data was received by the server as: " + from_date + " and " + to_date
    

    return response


    #get_date_from_cal_data = get_date_from_cal()
    #return get_date_from_cal_data



app.run(debug=True)