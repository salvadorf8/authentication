require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // bodyParser is used to parse incoming requests
const morgan = require('morgan'); // morgan is about logging incoming requests - we'll use this for debugging
const cors = require('cors');
require('./models/user');

setTimeout(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, bufferCommands: false }).catch((error) => console.log('connection failed'));
}, 2000);

const app = express();

// app setup
// app.use is a method that registers the following as middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

//adding the routers
require('./routes/router')(app);

// server setup
const port = process.env.PORT || 3090;
app.listen(port);
console.log('Server listening on: ' + port);
console.log('Salvador');
