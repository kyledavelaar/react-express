var jwt = require('jsonwebtoken');
const config = require('../../config');


function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    const data = { auth: false, message: 'No token provided.' }
    return res.status(403).send(data);
  } 
  
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      const data = { auth: false, message: 'Failed to authenticate token.' }
      return res.status(500).send(data);
    } 

    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;