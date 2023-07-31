from time import sleep
from json import dumps
from kafka import KafkaProducer
import requests
producer = KafkaProducer(
    bootstrap_servers = ['localhost:9092'],
    value_serializer = lambda x: dumps(x).encode('utf-8')
)

resp = requests.get('https://eonet.gsfc.nasa.gov/api/v3/events').json()

data = resp['events']



producer.send('events', value={'e': 'ty'})

for event in data:
    print(event)

    producer.send('events', value= event)
    print('\n')