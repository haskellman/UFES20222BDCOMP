'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.send('Boca API Rest!!');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

// #############################################

const db = require('./queries')

app.get('/api/contest', db.getContestTable)
app.post('/users/:id', db.postContestTable)
app.get(`/api/contest/:${1}`, db.getProblemById)
app.put(`api/contest/:${1}`, db.updateProblemById)
app.delete(`api/contest/:${1}/problem/:${1}`, db.deleteProblemById)