from flask import Flask
import pandas as pd
import numpy as np
import requests
import json
from booking_scraper import bkscraper
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt, check_password_hash

from selectorlib import Extractor
from time import sleep
from geopy.geocoders import Photon

import reverse_geocoder as rg

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
        return jsonify({"name": name, "email": email})


# Login
@app.route("/login", methods=["PUT"])
def login():
    user = request.json
    email = user["email"]
    password = user["password"]
    user_looked = mongo.db.users.find_one({"email": email})
    if user_looked is not None:
        password_DB = user_looked["password"]
        if check_password_hash(password_DB, password):
            return jsonify({"email": user_looked["email"], "name": user_looked["name"]})
        else:
            return "Incorrect Credentials"
    else:
        return "Can't find this user"


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
    data = data.nsmallest(4, "c")
    data = data[["latitude_deg", "longitude_deg", "iata_code", "name", "iso_country"]]
    return jsonify(data.to_dict(orient="rows"))

# autocomplete airport
@app.route("/auto/<looking>", methods=["GET"])
def auto(looking):
    data = pd.read_csv("airports.csv")
    data = data[
        ["latitude_deg", "longitude_deg", "iata_code", "name", "iso_country", "municipality"]
    ].dropna()
    data = data[data['name'].str.contains(looking, case=False) | data['municipality'].str.contains(looking, case=False)]
    data = data.head(7)
    return jsonify(data.to_dict(orient="rows"))

# proviging flight information
@app.route("/flight/<origin>/<destination>/<fromDate>", methods=["GET"])
def get_flight(origin, destination, fromDate):
    fromDate = str(pd.Timestamp(fromDate).date())
    url = f"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/UK/GBP/en-UK/{origin}-sky/{destination}-sky/{fromDate}"
    headers = {
        "x-rapidapi-key": "0e37694060msh40b260e389769a4p1b32a8jsn17a6df3c674b",
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    }
    response = requests.request("GET", url, headers=headers)
    return response.content

# booking.com scraping
@app.route("/hotel/<city>", methods=["GET"])
def scrape(city):
    result = bkscraper.get_result(city={city}, limit=1, detail=False)
    return jsonify(result)

# attractions API
@app.route("/attractions/<city>/<country>", methods=["GET"])
def attractions(city, country):
    # checking coordinates of given city
    geolocator = Photon(user_agent="MobileTravel")
    location = geolocator.geocode(f'{city} {country}')
    lat = location.latitude
    lon = location.longitude
    maxLat = lat+0.05
    maxLot = lon+0.05
    apiKEY = '5ae2e3f221c38a28845f05b6b5db6f06770f4edf010d553f8a337b76'
    url = f"https://api.opentripmap.com/0.1/en/places/bbox?lon_min={lon}&lat_min={lat}&lon_max={maxLot}&lat_max={maxLat}&format=geojson&apikey={apiKEY}"
    response = requests.request("GET", url)
    return response.content

@app.route("/attractionsCoordinates/<lat>/<lon>", methods=["GET"])
def attractionsCoordinates(lat, lon):
    lat = float(lat)
    lon = float(lon)
    print(lat, lon)
    maxLat = lat+0.1
    maxLot = lon+0.1
    apiKEY = '5ae2e3f221c38a28845f05b6b5db6f06770f4edf010d553f8a337b76'
    url = f"https://api.opentripmap.com/0.1/en/places/bbox?lon_min={lon}&lat_min={lat}&lon_max={maxLot}&lat_max={maxLat}&format=geojson&apikey={apiKEY}"
    response = requests.request("GET", url)
    return response.content

# providing safe info
@app.route("/safe_info", methods=["GET"])
def get_safe_info():
    url = "https://api.tugo.com/v1/travelsafe/countries/GR"
    headers = {"X-Auth-API-Key": "yz8mfd6q64efb4atr9kq5q2n"}
    response = requests.request("GET", url, headers=headers)
    return response.text
