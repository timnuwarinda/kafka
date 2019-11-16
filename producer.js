
const express = require('express');
const app = express();
const Kafka = require('kafka-node');
const config = require('./config');

const port = 8080;
const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({ kafkaHost: config.KafkaHost });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });


const pushDataToKafka = (dataToPush) => {
  console.log(`producer initialized........`);

  try {
    let payloadToKafkaTopic = [{ topic: config.KafkaTopic, messages: JSON.stringify(dataToPush) }];
    console.log(payloadToKafkaTopic);
    producer.on('ready', async function () {
      producer.send(payloadToKafkaTopic, (err, data) => {
        console.log('data: ', data);
      });

      producer.on('error', function (err) {
        console.log(err);

        //  handle error cases here
      })
    })
  }
  catch (error) {
    console.log(error);
  }

};


const jsonData = require('./app_json.js');
pushDataToKafka(jsonData);



app.get('/', (req, res) => {

  // pushDataToKafka(jsonData);


});

app.listen(port);