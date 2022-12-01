const express = require('express');
const axios = require('axios');
const { Octokit } = require("@octokit/rest");
const { resolve } = require('path');

const router = express.Router();
const octokit = new Octokit();

// Serve the home.ejs file
router.get('/', (req, res) => {

  var scope = {};

  let githubAccessToken = req.cookies['token'];

  if (githubAccessToken) {

    scope.token = githubAccessToken;

    const userPromise = octokit.rest.users.getAuthenticated(
      {
        headers: {
          authorization: `token ${githubAccessToken}`,
        },
      }).then(({ data }) => {
        scope.user = data;
        return data;
      }
      ).catch((error) => {
          console.log(error);
      }
    );

    userPromise.then((data) => {
      scope.user = data;
      res.render("home", {scope: scope});
    });
    
  }
  else {
    res.render("home", {scope: scope});
  }

});

module.exports = router;