const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('node:dns');

const errorController = require('./controllers/errorController');
const itemsRouter = require('./routers/itemsRouter');

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE;
const MONGO_DB_DNS_SERVERS = process.env.MONGODB_DNS_SERVERS;

if (MONGO_DB_DNS_SERVERS) {
  dns.setServers(MONGO_DB_DNS_SERVERS.split(',').map((server) => server.trim()).filter(Boolean));
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(itemsRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

async function startServer() {
  if (!MONGO_DB_URL) {
    throw new Error('MONGO_DB_URL is not configured');
  }

  await mongoose.connect(MONGO_DB_URL, {
    dbName: MONGO_DB_DATABASE || undefined
  });

  console.log(`Connected to MongoDB${MONGO_DB_DATABASE ? ` database "${MONGO_DB_DATABASE}"` : ''}`);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start server:', error.message);
  process.exitCode = 1;
});