const express = require('express');
const router = express.Router();
const User = require('./schema');

// router.use((req, res, next) => {
//   console.log('time', Date.now());
//   next();
// })

const auth = {'oauth-token': '0d82ff83-6339-412f-bf60-bbe9faeaf669'}

router.get('/', (req, res) => {
  res.send({user: 'kyle'})
})

router.post('/', (req, res) => {
  const body = req.body;
  const token = req.cookies['oauth-token'];

  // console.log('body', body);
  // console.log('token', token);
  if (token === auth['oauth-token']) {
    const newUser = new User(body);
    console.log('newUser', newUser.username, newUser.password);
    newUser.save((err, newUser) => {
      if (err) {
        console.log('SAVING USER ERR', err)
      } else {
        console.log('SAVING USER SUCCESS', newUser)
      }
    })
    res.send(true)
  } else {
    res.send(false)
  }
})





module.exports = router;