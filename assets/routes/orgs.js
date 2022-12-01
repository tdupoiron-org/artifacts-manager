const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { Octokit } = require("@octokit/rest");
const { render } = require('ejs');

const router = express.Router();

// Load environment variables
dotenv.config({
    path: './config.env',
  });

const octokit = new Octokit();

var scope = {};

// Get organizations
router.get(process.env.APP_ORGS_URI, (req, res) => {

    ssn=req.session;
    token = ssn.githubAccessToken;

    console.log("token: " + token);

    octokit.rest.orgs.listForAuthenticatedUser({
        per_page: 100,
        page: 1,
        headers: {
            authorization: `token ${token}`,
        },
    }).then(({ data }) => {
        scope.orgs = data;
        res.render("orgs", {scope: scope});
    }).catch((error) => {
        //console.log(error);
        const appBaseUrl = req.protocol + '://' + req.hostname + ':' + req.socket.localPort;

        ssn=req.session;
        ssn.githubAccessToken = null;
        res.redirect(appBaseUrl + process.env.APP_LOGIN_URI);
    });
});

module.exports = router;