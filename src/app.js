const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
require("express-async-errors");

var cors = require("cors");

const dotenv = require("dotenv");
const AuthService = require("./services/auth-service");
const authenticateTokenMiddleware = require("./middleware/authentication-middleware");
const GoogleAuthService = require("./services/google-auth-service");
const RegisterService = require("./services/hyperledger-service");
const EncryptionService = require("./services/cli-encryption-service");
const { HTTPError } = require("./errors/HTTPError");
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
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(httpErrorHandler);
