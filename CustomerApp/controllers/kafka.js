const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "newCustomerAlert",
    brokers: ["44.214.218.139:9092", "44.214.213.141:9092"],
});

const publish = async (customerData) => {
  const producer = kafka.producer();

  const payload = {
    topic: 'aarushis.customer.evt',
    messages: JSON.stringify(customerData),
  };

  try {
    await producer.connect();
    await producer.send({
        topic: "aarushis.customer.evt",
        messages: [
          {
            value: JSON.stringify(customerData),
          },
        ],
      });
    console.log('Message published:',customerData);
  } catch (err) {
    console.error('Error publishing message:', err);
  } finally {
    await producer.disconnect();
  }
};

module.exports = { publish };