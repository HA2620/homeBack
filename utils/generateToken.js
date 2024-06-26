const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'myPersonalSecret', {
    expiresIn: '30d'
  });
};

module.exports = generateToken;
