FROM adoptopenjdk:11-jre-hotspot
WORKDIR /app

USER root

RUN apt-get update && apt-get install -y wget tar
# Descargar Apache Spark
RUN wget -O spark.tgz https://dlcdn.apache.org/spark/spark-3.4.1/spark-3.4.1-bin-hadoop3.tgz && \
    tar -xvzf spark.tgz && \
    rm spark.tgz && \
    mv spark-3.4.1-bin-hadoop3 /spark

# Configurar las variables de entorno para Spark
ENV SPARK_HOME=/spark
ENV PATH=$PATH:$SPARK_HOME/bin

RUN apt-get install -y python3 python3-pip

COPY . /app
RUN pip3 install -r requirements.txt
EXPOSE 5000
ENV FLASK_APP=app.py
CMD ["flask", "run", "--host", "0.0.0.0"]
