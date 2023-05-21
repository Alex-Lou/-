import requests
import json

# Remplacez le texte en majuscules par l'adresse MAC de votre téléphone
mac_address = "60:07:c4:3c:a0:cd"

# Envoyez une requête POST à l'API de géolocalisation de Mozilla
url = "https://location.services.mozilla.com/v1/geolocate?key=test"
data = {"wifiAccessPoints": [{"macAddress": mac_address}]}
response = requests.post(url, data=json.dumps(data))

# Analysez la réponse JSON et extrayez la latitude et la longitude de la position du téléphone
location = json.loads(response.text)
lat = location["location"]["lat"]
lng = location["location"]["lng"]
accuracy = location["accuracy"]
print("Latitude:", lat)
print("Longitude:", lng)
print("Précision:", accuracy, "mètres")
