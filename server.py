from flask import Flask
import pandas as pd
import numpy as np
import requests
from booking_scraper import bkscraper
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt, check_password_hash

from selectorlib import Extractor
from time import sleep
import csv

import reverse_geocoder as rg

from amadeus import Client, ResponseError

amadeus = Client(
    client_id="4X0Nk2NdtT8FjrmREbywVcqy2ajj15r3", client_secret="xDzYooHD97gUV11K"
)

e = Extractor.from_yaml_file("booking.yml")

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Travel"
mongo = PyMongo(app)

bcrypt = Bcrypt(app)

# Registration
@app.route("/register", methods=["POST"])
def register():
    user = request.json
    name = user["name"]
    email = user["email"]
    password = user["password"]
    if mongo.db.users.find_one({"email": email}):
        return "Email exist"
    else:
        mongo.db.users.insert(
            {
                "name": name,
                "email": email,
                "password": bcrypt.generate_password_hash(password),
                "authenticated": False,
            }
        )
        return "ok"


# Login
# @app.route('/register', methods=[ 'POST' ])
# def register():
#     user = request.json
#     name = user['name']
#     email = user['email']
#     password = user['password']
#     if mongo.db.users.find_one({'email': email}):
#         return "Email exist"
#     else:
#         mongo.db.users.insert({'name': name, 'email': email, 'password': bcrypt.generate_password_hash(password), 'authenticated': False})
#         return 'ok'

# getting info about nearby aiports
@app.route("/geo/<lat>/<lng>", methods=["GET"])
def geo(lat, lng):
    lat = float(lat)
    lng = float(lng)
    data = pd.read_csv("airports.csv")
    data = data[data["type"].isin(["medium_airport", "large_airport"])]
    data = data[
        ["latitude_deg", "longitude_deg", "iata_code", "name", "iso_country"]
    ].dropna()
    data["target_long"] = lng
    data["target_lat"] = lat
    data["phi_1"] = data["latitude_deg"] * np.pi / 180
    data["phi_2"] = data["target_lat"] * np.pi / 180
    data["delta_phi"] = (data["target_lat"] - data["latitude_deg"]) * np.pi / 180
    data["delta_lambda"] = (data["target_long"] - data["longitude_deg"]) * np.pi / 180
    data["a"] = (
        np.sin(data["delta_phi"] / 2) ** 2
        + np.cos(data["phi_1"])
        * np.cos(data["phi_2"])
        * np.sin(data["delta_lambda"] / 2) ** 2
    )
    data["c"] = 2 * np.arctan2(np.sqrt(data["a"]), np.sqrt(1 - data["a"]))
    data = data.nsmallest(5, "c")
    data = data[["latitude_deg", "longitude_deg", "iata_code", "name", "iso_country"]]
    return jsonify(data.to_dict(orient="rows"))


# proviging flight information
@app.route("/flight", methods=["GET"])
def get_flight():
    url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/UK-sky/PL-sky/2021-01-01"
    querystring = {"inboundpartialdate": "2021-02-01"}
    headers = {
        "x-rapidapi-key": "0e37694060msh40b260e389769a4p1b32a8jsn17a6df3c674b",
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    return response.text


# providing safe info
@app.route("/safe_info", methods=["GET"])
def get_safe_info():
    url = "https://api.tugo.com/v1/travelsafe/countries/GR"
    headers = {"X-Auth-API-Key": "yz8mfd6q64efb4atr9kq5q2n"}
    response = requests.request("GET", url, headers=headers)
    return response.text


# booking.com scraping
@app.route('/hotel', methods=['GET'])
def scrape():
    result = bkscraper.get_result(city="New York", limit=1, detail=False)
    return jsonify(result)
