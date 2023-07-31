FROM openjdk:11.0.11-jre-slim-buster
ENV SPARK_VERSION=3.0.2 \
HADOOP_VERSION=3.2
RUN apt-get update && apt-get install -y python3 python3-pip
WORKDIR /app
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY consumer.py .
CMD ["python3", "consumer.py"]