const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer');
const express = require("express");
const app = express();

const kafka = new Kafka({
    clientId: "newCustomerAlert",
    brokers: ["44.214.218.139:9092", "44.214.213.141:9092"],
});

const consumer = kafka.consumer({ groupId: 'new-cust-group' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "aarushiediss@gmail.com",
    pass: "soapbxbyhdyegjeh",
  },
});

async function sendWelcomeEmail(name, email) {
  const mailOptions = {
    from: 'aarushiediss@gmail.com',
    to: email,
    subject: 'Activate your book store account',
    text: `Dear ${name},\nWelcome to the Book store created by aarushis. \nExceptionally this time we won't ask you to click a link to activate your account.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${name} at ${email}`);
  } catch (error) {
    console.error(`Error sending welcome email to ${name} at ${email}:`, error);
  }
}

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'aarushis.customer.evt', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
        console.log(JSON.parse(message.value.toString()));
      const { name, userId } = JSON.parse(message.value.toString());
      
      await sendWelcomeEmail(name, userId);
    },
  });
}

const port = process.env.port || 3002;

app.listen(port, () => {
    console.log(`CRM Running on: ${port}`);
    startConsumer();
  });
