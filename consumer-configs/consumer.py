from kafka import KafkaConsumer
from pymongo import MongoClient
from pyspark.sql import SparkSession

import time
import json
import logging
import os

# KAFKA variables
KAFKA_IP = os.environ.get("KAFKA_IP", "localhost")
KAFKA_PORT = "9092"

# Mongodb variables
MONGO_MACHINE_IP = os.environ.get("MONGO_IP", "localhost")
MONGO_URI = f"mongodb://distribuidos:Distribuidos1-2023-a-m-r@{MONGO_MACHINE_IP}:27017/?authMechanism=DEFAULT"

# Spark variables
SPARK_IP = os.environ.get("SPARK_IP", "spark://spark-master:7077")

MAX_WAIT_TIME_IN_SECONDS = 10
BATCH_SIZE = 10

def json_loader_deserializer(v):
    if v is None:
        return

    try:
        return json.loads(v.decode('utf-8'))
    except json.decoder.JSONDecodeError:
        logging.exception('Unable to decode: %s', v)
        return None

def check_for_duplicates(spark, df, new_evt):
    """
    Check if the new_object already exists in the DataFrame.

    Args:
        df (DataFrame): PySpark DataFrame containing existing objects.
        new_object (dict): The object to compare against existing objects.

    Returns:
        bool: True if the new_object is unique, False otherwise.
    """
    
    new_evt_df = spark.createDataFrame([new_evt.id])
    non_duplicates_df = df \
        .select("id") \
        .subtract(new_evt_df) # Set difference to find unique elements.

    # If non_duplicates_df has the same number of rows as df => new_object is unique.
    is_unique = non_duplicates_df.count() == df.count()

    return is_unique

def fetch_data_from_mongodb(spark, mongo_uri, db_name, collection_name):
    """
    Fetch data from MongoDB using PySpark.

    Args:
        spark (SparkSession): The active Spark session.
        mongo_uri (str): The MongoDB connection URI.
        db_name (str): The name of the MongoDB database.
        collection_name (str): The name of the collection to fetch data from.

    Returns:
        DataFrame: PySpark DataFrame containing the data from MongoDB.
    """
    df = spark.read.format("com.mongodb.spark.sql.DefaultSource") \
        .option("uri", f"mongodb://distribuidos:Distribuidos1-2023-a-m-r@{MONGO_MACHINE_IP}:27017") \
        .option("authSource", "admin") \
        .option("database", db_name) \
        .option("collection", collection_name) \
        .load()

    return df

def consume(spark_session, consumer_client, events_collection): 
    
    # Start consuming events from events topic.
    events_received = []
    last_time_from_event_received = time.time()
    elapsed_time_since_last_event = 0
    for message in consumer_client:
        print("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition, message.offset, message.key, message.value))
        
        total_events = fetch_data_from_mongodb(spark_session, MONGO_URI, "eonet", "events")
        is_duplicated_event = check_for_duplicates(spark_session, total_events, message.value)

        if not is_duplicated_event:
            events_received.append(message.value)

            # Se calcula el tiempo de última vez que se recibe evento válido
            elapsed_time_since_last_event = time.time() - last_time_from_event_received

        if len(events_received) > 0 and (len(events_received) == BATCH_SIZE or elapsed_time_since_last_event > MAX_WAIT_TIME_IN_SECONDS):
            events_collection.insert_many(events_received)
            events_received = []

        # Obtener tiempo de última vez que se recibe un evento.
        last_time_from_event_received = time.time()

def main():
    # Start a new Spark session.
    spark = SparkSession.builder \
        .appName("Spark for Consumer") \
        .master(SPARK_IP) \
        .config('spark.jars.packages', 'org.mongodb.spark:mongo-spark-connector_2.12:3.0.1')\
        .config("spark.driver.memory", "1G") \
        .config("spark.executor.memory", "1G") \
        .getOrCreate()
    
    # Connect to mongo remote db.
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client["eonet"]
    events_collection = db["events"]

    # Create the Consumer instance.
    # consumer = KafkaConsumer(
    #     "events",
    #     bootstrap_servers = [KAFKA_IP + ':' + KAFKA_PORT],
    #     auto_offset_reset='earliest',
    #     value_deserializer=json_loader_deserializer
    # )
    

    # consume(spark, consumer, events_collection)

    spark.stop()

    
if __name__ == "__main__":   
    main()