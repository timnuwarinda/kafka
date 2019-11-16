const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['stream-kafka:9092']
})

const fs = require('fs')
const ip = require('ip')

const producer = kafka.producer()

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })
 
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}
 
run().catch(console.error)