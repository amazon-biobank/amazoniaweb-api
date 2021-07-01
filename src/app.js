const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var cors = require('cors');

const dotenv = require('dotenv');
const AuthService = require('./services/auth-service');
const authenticateTokenMiddleware = require('./middleware/authentication-middleware');
const GoogleAuthService = require('./services/google-auth-service');
const RegisterService = require('./services/hyperledger-service');


dotenv.config();

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 3001;

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

app.get('/get-credentials', authenticateTokenMiddleware, async (req, res) => {
  const user = req.user;
  try {
    const credentials = await RegisterService.registerUser(user['user-email']);
    res.set({"Content-Disposition":"attachment; filename=\"credentials.json\""});
    res.setHeader('Content-type', "text/csv");
    res.send(credentials);
  } catch (error) {
    res.status(500).send('An error ocurred') 
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
