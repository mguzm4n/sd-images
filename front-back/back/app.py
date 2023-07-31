from flask import Flask
from flask.json import jsonify
from flask_cors import CORS
from bson.json_util import dumps
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pymongo import MongoClient
import os

# Mongodb variables
MONGO_MACHINE_IP = os.environ.get("MONGO_IP", "localhost")
MONGO_URI = f"mongodb://distribuidos:Distribuidos1-2023-a-m-r@{MONGO_MACHINE_IP}:27017/?authMechanism=DEFAULT"


#Create Flask app
app = Flask(__name__)
CORS(app)
#Config Mongo connection
client = MongoClient(MONGO_MACHINE_IP, 27017, username='distribuidos', password='Distribuidos1-2023-a-m-r')
mongo = client.eonet

pipeline = [
    {
        "$unwind": "$categories"
    },
    {
        "$group": {
            "_id": "$categories.title",
            "count": {"$sum": 1}
        }
    }
]

events = mongo.events.aggregate(pipeline)
categories = []
for doc in events:
    result = {"title":doc['_id']}
    categories.append(result)

#Configure Spark
spark = SparkSession.\
    builder.\
    appName("streamingExampleRead").\
    config('spark.jars.packages', 'org.mongodb.spark:mongo-spark-connector_2.12:3.0.1').\
    config("spark.mongodb.input.uri", f"mongodb://distribuidos:Distribuidos1-2023-a-m-r@{MONGO_MACHINE_IP}:27017/eonet.events?authSource=admin").\
    config("spark.mongodb.output.uri", f"mongodb://distribuidos:Distribuidos1-2023-a-m-r@{MONGO_MACHINE_IP}:27017/eonet.events?authSource=admin").\
    config('spark.mongodb.change.stream.publish.full.document.only','true').\
    getOrCreate()

#Se eliminan datos duplicados
dataframe=spark.read.format("mongo").load()

#Routes
@app.route("/events")
def events():
    events = mongo.events.find()
    resp = dumps(events)
    return resp

@app.route("/categories")
def categories_get():
    resp = dumps(categories)
    return resp

@app.route("/events/<category>")
def events_from_category(category):
    print(category)
    pipeline =  [
        {
            '$match': {
                'categories': {
                    '$elemMatch': {
                        'title': category
                    }
                }
            }
        }
    ]
    
    events = mongo.events.aggregate(pipeline)
    resp = dumps(events)
    return resp


@app.route("/total_event_by_category")
def get_total_event_by_category():
    total_by_category = dataframe.groupBy("categories").count()
    total_by_category = total_by_category.toPandas()
    total_by_category = total_by_category.to_dict(orient='records')

    total_by_category_json = jsonify(total_by_category)

    return total_by_category_json


@app.route("/hit")
def get_hit():
    return jsonify({ "got": "hit" })



if __name__ == "__main__":
    app.run(port=5000, debug=True)