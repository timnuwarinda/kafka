require('dotenv').config();

const config = {
  KafkaHost:"stream-kafka:9092",
  KafkaTopic: "kafka-sample-topic"
};

module.exports = config;