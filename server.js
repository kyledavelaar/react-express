const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const user = require('./server/user/routes');



//////////////////////////////////////////////////////////////////////
// DATABASE
//////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose');
const db = 'mongodb://localhost/texaschess';

mongoose.connect(db, { useNewUrlParser: true }, (err, database) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(`Connected to ${db}`);
  }
});



//////////////////////////////////////////////////////////////////////
// STATIC FILES
//////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



//////////////////////////////////////////////////////////////////////
// GLOBAL MIDDLEWARE (CORS, PARSERS)
//////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  // res.setHeader(`Access-Control-Allow-Origin`, `http://localhost:3000`);
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Credentials`, `true`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
  next();
});




//////////////////////////////////////////////////////////////////////
// SOCKETS
//////////////////////////////////////////////////////////////////////
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('user', (message) => {
    console.log('SOCKET MESSAGE:', message);

    io.sockets.emit('user', message);
    // socket.broadcast.emit('for all')
  })



  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})




//////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////
app.use('/user', user);





//////////////////////////////////////////////////////////////////////
// SERVER
//////////////////////////////////////////////////////////////////////
const port = 8000;

http.listen(process.env.PORT || port, () => {
  console.log('Listening on ', port);
})
