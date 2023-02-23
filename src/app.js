const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
require("express-async-errors");

var fs = require("fs");
var https = require("https");
var path = require('path');

var cors = require("cors");

const dotenv = require("dotenv");
const AuthService = require("./services/auth-service");
const authenticateTokenMiddleware = require("./middleware/authentication-middleware");
const GoogleAuthService = require("./services/google-auth-service");
const RegisterService = require("./services/hyperledger-service");
const EncryptionService = require("./services/cli-encryption-service");
const httpErrorHandler = require("./middleware/http-error-handler-middleware");

dotenv.config();

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const userEmail = await GoogleAuthService.getUserEmail(req.body.token);
  const token = AuthService.generateAccessToken(userEmail);
  res.send(token);
});

app.get("/credentials", authenticateTokenMiddleware, async (req, res) => {
  const user = req.user;
  const credentials = await RegisterService.registerUser(user["user-email"]);
  res.set({
    "Content-Disposition": 'attachment; filename="credentials.json"',
  });
  res.setHeader("Content-type", "text/csv");
  res.send(credentials);
});

app.post(
  "/encrypted-credentials",
  authenticateTokenMiddleware,
  async (req, res) => {
    try{
      const user = req.user;
      const password = req.body.password;
      const credentials = await RegisterService.registerUser(user["user-email"]);
      const encryptedCredentials = await EncryptionService.lyra2Encrypt(
        password,
        JSON.stringify(credentials)
      );
      res.set({
        "Content-Disposition": 'attachment; filename="credentials.json"',
      });
      res.setHeader("Content-type", "text/csv");
      res.send(encryptedCredentials);
    }
    catch(e) {
      console.log(e.message)
    }
  }
);

const httpsServer = https
  .createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, "./ssl/keys/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "./ssl/keys/server.cert")),
    },
    app
  )
  .listen(port, function () {
    console.log(
      `Example app listening on port ${port}! Go to https://localhost:${port}`
    );
  });

app.use(httpErrorHandler);
