const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var cors = require('cors');

const dotenv = require('dotenv');
const AuthService = require('./services/auth-service');
const authenticateTokenMiddleware = require('./middleware/authentication-middleware');
const GoogleAuthService = require('./services/google-auth-service');

dotenv.config();

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());
app.use(cors());

const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', async (req, res) => {
  const userEmail = await GoogleAuthService.getUserEmail(req.body?.token);

  if (userEmail) {
    const token = AuthService.generateAccessToken(userEmail);
    res.send(token);
  } else {
    throw new Error('Unable to generate token');
  }
});

app.get('/get-credentials', authenticateTokenMiddleware, (req, res) => {
  //Here we will get the credential from the CA and return to the user
  res.send('Your credentials!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
