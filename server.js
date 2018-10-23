const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const userController = require('./server/user/controller');
const authController = require('./server/auth/controller');
const config = require('./config');


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
  res.setHeader(`Access-Control-Allow-Origin`, `http://localhost:3000`);
  // res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Credentials`, `true`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
  next();
});




//////////////////////////////////////////////////////////////////////
// SOCKETS
//////////////////////////////////////////////////////////////////////
io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, config.secret, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  } else {
      next(new Error('Authentication error'));
  }    
})
.on('connection', (socket) => {
  console.log('a user connected');

  // socket.join('main');
  // io.to('main').emit('joining main room');

  socket.on('user', (numberOfUsers) => {
    io.emit('user', numberOfUsers);
  })

  socket.on('room', room => {
    io.emit('room', room);
  })

  socket.on('message', message => {
    io.emit('message', message);
  })



  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})




//////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////
app.use('/auth', authController);
app.use('/user', userController);





//////////////////////////////////////////////////////////////////////
// SERVER
//////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log('Listening on ', port);
})
