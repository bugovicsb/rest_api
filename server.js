require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 3030;
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.error('Connected to DB'));

app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`))
