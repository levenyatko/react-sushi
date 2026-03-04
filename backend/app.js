import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/menu', async (req, res) => {
    const meals = await fs.readFile('./data/menu.json', 'utf8');
    res.json(JSON.parse(meals));
});

app.get('/restaurant', async (req, res) => {
  const data = await fs.readFile('./data/restaurant.json', 'utf8');
  const restaurant = JSON.parse(data).restaurant;
  res.json(restaurant);
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === undefined ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === undefined ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.phone === undefined ||
    orderData.customer.phone.trim() === ''
  ) {
    return res.status(400).json({
      message: 'Missing data: Email, name or phone is missing.',
    });
  }

  if (orderData.customer.deliveryMethod === 'address') {
    if (
      orderData.customer.address === undefined ||
      orderData.customer.address.trim() === ''
    ) {
      return res.status(400).json({
        message: 'Missing data: Address is missing for address delivery.',
      });
    }
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!', id: newOrder.id });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
