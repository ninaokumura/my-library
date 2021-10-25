const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes');
const fs = require('fs');
const server = express();

// Server configuration
server.use(express.static('public'));
server.use(express.urlencoded({ extended: false }));

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }));
server.set('view engine', 'hbs');

server.use('/books', routes);

const dataPath = './database/data.json';
server.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const template = 'home';
    const booksData = JSON.parse(data);
    res.render(template, booksData);
  });
});

module.exports = server;
