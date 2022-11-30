const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { Octokit } = require("@octokit/rest");

const router = express.Router();

// Load environment variables
dotenv.config({
    path: './config.env',
  });

const octokit = new Octokit();

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
        console.log(data);
        res.render("orgs", {orgs: data});
    }).catch((error) => {
        console.log(error);
    });

});



module.exports = router;