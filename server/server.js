var express = require('express');
var app = express();

express.use('/', express.static('client'));

app.listen(8080, function () {
  console.log('Server is up and running')
})
