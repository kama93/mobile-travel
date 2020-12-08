from flask import Flask
import json
import requests

import reverse_geocoder as rg

from amadeus import Client, ResponseError

amadeus = Client(
    client_id='4X0Nk2NdtT8FjrmREbywVcqy2ajj15r3',
    client_secret='xDzYooHD97gUV11K'
)

app = Flask(__name__)


@app.route('/geo/<lat>/<lng>', methods=['GET'])
def geo(lat, lng):
    lat = float(lat)
    lng = float(lng)
    response = amadeus.reference_data.locations.airports.get(longitude=lng, latitude=lat, radius=500)
    return response.data[0]['iataCode']

@app.route('/flight', methods=['GET'])
def get_flight():
    url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/UK-sky/PL-sky/2021-01-01"
    querystring = {"inboundpartialdate" : "2021-02-01"}
    headers = {
    'x-rapidapi-key': "0e37694060msh40b260e389769a4p1b32a8jsn17a6df3c674b",
    'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    return response.text
   


# "48.8588443, 2.2943506"