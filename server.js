const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');

let db;

// mongoose.connect('mongodb://localhost/react-express', { useNewUrlParser: true });
// mongoose.connect('mongodb://', function (err, database) {
//   if (err) console.log(err);
//   else {
//     console.log('Connected to DB');
//     db = database;
//   }
// });


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'build')));
//   app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// }

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.setHeader(`Access-Control-Allow-Origin`, `http://localhost:3000`);
  res.setHeader(`Access-Control-Allow-Credentials`, `true`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
  next();
});



app.get('/user', (req, res) => {
  // console.log('req', req)
  res.send('hi there can you see this')
})


const port = 8000;

app.listen(process.env.PORT || port, () => {
  console.log('Listening on ', port);
})
