const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://127.0.0.1:27017/mydb'
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', (err) => {
    console.log('Aplicação desconectada do banco de dados');
});

mongoose.connection.on('connected', (err) => {
    console.log('Aplicação conectada do banco de dados');
});

app.use(express.urlencoded({ extended: true })); // body parser - parse json in body.requests
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true  })); // to support URL-encoded bodies

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute)
app.use('/users', usersRoute)

app.listen(3000);

module.exports = app;