const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const helpers = require('./database/helpers');

router.get('/', (req, res) => {
  console.log('Hello World!');
});

module.exports = router;
