from flask import Flask
import pandas as pd
import numpy as np
import requests
import json
import hashlib
from booking_scraper import bkscraper
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt, check_password_hash
from flask import jsonify, make_response

from selectorlib import Extractor
from time import sleep
from geopy.geocoders import Photon

import reverse_geocoder as rg

e = Extractor.from_yaml_file("booking.yml")

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Travel"
mongo = PyMongo(app)

bcrypt = Bcrypt(app)

countryListAlpha2 = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BQ": "Bonaire",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "CV": "Cabo Verde",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CD": "Congo",
    "CG": "Congo",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "CI": "Côte d'Ivoire",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "SZ": "Eswatini",
    "ET": "Ethiopia",
    "FK": "Falkland Islands",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and McDonald Islands",
    "VA": "Holy See",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "Korea",
    "KR": "Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People's Democratic Republic",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestine",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "MK": "Republic of North Macedonia",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "RE": "Réunion",
    "BL": "Saint Barthélemy",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin (French part)",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania, United Republic of",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "gb": "United Kingdom",
    "GB": "Uk",
    "UM": "United States Minor Outlying Islands",
    "US": "United States of America",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "VG": "Virgin Islands",
    "VI": "Virgin Islands",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe",
    "AX": "Aland Islands"
}

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
        ["latitude_deg", "longitude_deg", "iata_code", "name", "iso_country", "municipality"]
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
    data = data[["latitude_deg", "longitude_deg", "iata_code", "name", "iso_country", "municipality"]]
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
#fetch base on city and country name
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

#fetch base on coordinates
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

#get wikidata- picture
@app.route("/wikidata/image/<wikinumber>", methods=["GET"])
def image(wikinumber):
    url = f"https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&format=json&entity={wikinumber}"
    response = requests.request("GET", url)
    res = json.loads(response.content)
    img = res["claims"]["P18"][0]["mainsnak"]["datavalue"]["value"]
    img = img.replace(" ", "_")
    img_hash = hashlib.md5(img.encode("utf-8"))
    img_hash = img_hash.hexdigest()
    urlResult = f'https://upload.wikimedia.org/wikipedia/commons/{img_hash[0]}/{img_hash[0:2]}/{img}'
    result = {'url': urlResult}
    return jsonify(result)

@app.route("/wikidata/description/<wikinumber>", methods=["GET"])
def description(wikinumber):
    url=f'https://www.wikidata.org/w/api.php?action=wbgetentities&ids={wikinumber}&format=json&languages=en&props=descriptions%7Csitelinks%2Furls'
    response = requests.request("GET", url)
    return response.content


# providing safe info
@app.route("/safe_info/<country>", methods=["GET"])
def get_safe_info(country):
    for code, name in countryListAlpha2.items():
        if country.upper() == name.upper():
            url = f'https://api.tugo.com/v1/travelsafe/countries/{code}'
            headers = {"X-Auth-API-Key": "yz8mfd6q64efb4atr9kq5q2n"}
            response = requests.request("GET", url, headers=headers)
            return response.text


# currency fetch
@app.route('/currency/<fromCurrency>/<toCurrency>', methods=['GET'])
def currency(fromCurrency, toCurrency):
    API_KEY = "5aa0c9b9e8f01524140dd2c"
    url = f'https://v6.exchangerate-api.com/v6/API_KEY/latest/USD'
    response = requests.request("GET", url)
    return response.text
       