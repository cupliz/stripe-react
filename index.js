const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const api = require('./routes/api');
const app = express();

app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(bodyParser.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/app/build')));

app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/app/build/index.html'));
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.listen(port, () => console.log(`Listening on port ${port}`));

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}