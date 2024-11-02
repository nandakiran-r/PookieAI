const express = require('express');
require("dotenv").config();
const cors = require('cors');

const routes = require('./routes/routes')
const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = 5000;
app.listen(port, () => {
  console.log('server started')
})