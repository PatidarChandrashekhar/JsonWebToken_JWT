const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

//Welcome API
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the CS Patidar JWT API'
  });
});

//Post API
app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'CSPassword', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'CS Post created...',
        authData
      });
    }
  });
});

//Login API
app.post('/api/login', (req, res) => {
  // Test user
  const user = {
    userid: 1, 
    username: 'CS Patidar',
    email: 'CSPatidar@gmail.com',
    address: 'Canada'
  }

  jwt.sign({user}, 'CSPassword', { expiresIn: '100s' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('CS Server started on port 5000'));