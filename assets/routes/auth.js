const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const router = express.Router();

console.log("API auth loaded");

// Load environment variables
dotenv.config({
  path: './config.env',
});

console.log("Environment variables loaded");
console.log(process.env);

// Redirect to GitHub login
router.get(process.env.APP_LOGIN_URI, (req, res) => {
  const appBaseUrl = req.protocol + '://' + req.hostname + ':' + req.socket.localPort;
  const githubRedirectUri = appBaseUrl + process.env.APP_CALLBACK_URI;
  const redirectUri = appBaseUrl + process.env.APP_CALLBACK_URI;

  const authorize = process.env.GH_BASE_URL + process.env.GH_AUTHORIZE_URI + "?client_id=" + process.env.GH_CLIENTID + "&scope=repo&redirect_uri=" + githubRedirectUri;
    
  res.redirect(authorize);
});

// GitHub callback
router.get(process.env.APP_CALLBACK_URI, (req, res) => {
  const appBaseUrl = req.protocol + '://' + req.hostname + ':' + req.socket.localPort;
  const githubRedirectUri = appBaseUrl + process.env.APP_CALLBACK_URI;
  const code = req.query.code;
  const url = process.env.GH_BASE_URL + process.env.GH_TOKEN_URI;
  axios.post(url, {
    client_id: process.env.GH_CLIENTID,
    client_secret: process.env.GH_CLIENTSECRET,
    code: code,
    redirect_uri: githubRedirectUri
  }, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'application/json',
    }
  }).then(function (response) {
    res.cookie('token', response.data.access_token);
    res.redirect(appBaseUrl);
  }
  ).catch(function (error) {
    console.log(error);
  }
  );
});

// Logout
router.get(process.env.APP_LOGOUT_URI, (req, res) => {
  const appBaseUrl = req.protocol + '://' + req.hostname + ':' + req.socket.localPort;

  res.clearCookie('token');
  res.redirect(appBaseUrl);

});

module.exports = router;