const express = require('express');
const dotenv = require('dotenv');
const { Octokit } = require("@octokit/rest");
const GitHubUtils = require('./github-utils');

const router = express.Router();

// Load environment variables
dotenv.config({
path: './config.env',
});

console.log("API routes loaded");

// Get organizations
router.get("/orgs", async (req, res) => {

    var scope = {};

    const appBaseUrl = req.protocol + '://' + req.hostname + ':' + req.socket.localPort;
    token = req.cookies['token'];

    if(token) {

        const gitHubUtils = new GitHubUtils(token);

        gitHubUtils.getOrgs().then((data) => {
            scope.orgs = data;
            res.render("orgs", {scope: scope});
        });

    }
    else {
        res.end();
    }

});

// Get artifacts
router.get(process.env.APP_ARTIFACTS_URI, async (req, res) => {

    var scope = {};

    const appBaseUrl = req.protocol + '://' + req.hostname + ':' + req.socket.localPort;
    token = req.cookies['token'];
    org = req.query.org;

    if (token) {

        const gitHubUtils = new GitHubUtils(token);

        var artifactsOut = [];
        var totalSize = 0;

        // Get all repositories
        const repos = await gitHubUtils.getRepos(org);

        // Get all artifacts
        for (const i in repos)
        {
            const currentRepo = repos[i];
            const artifacts = await gitHubUtils.getArtifacts(org, currentRepo.name);

            if (artifacts) {

                // Build output format for each artifact
                for (const j in artifacts.artifacts)
                {
                    const currentArtifact = artifacts.artifacts[j];

                    const output = {
                        "repoId": currentRepo.id,
                        "repoName": currentRepo.name,
                        "repoVisibility": currentRepo.visibility,
                        "repoUrl": currentRepo.html_url,
                        "repoOwnerType": currentRepo.owner.type,
                        "repoOwnerLogin": currentRepo.owner.login,
                        "repoOwnerUrl": currentRepo.owner.html_url,
                        "artifactId": currentArtifact.id,
                        "artifactName": currentArtifact.name,
                        "artifactDownloadUrl": currentArtifact.archive_download_url,
                        "workflowRunId": currentArtifact.workflow_run.id,
                        "workflowRunUrl": currentRepo.html_url + "/actions/runs/" + currentArtifact.workflow_run.id,
                        "size": currentArtifact.size_in_bytes,
                        "created_at": currentArtifact.created_at,
                        "expires_at": currentArtifact.expires_at
                    };

                    totalSize += currentArtifact.size_in_bytes;
                    artifactsOut.push(output);
                }
            }
        };

        scope.artifacts = artifactsOut;
        scope.totalSize = totalSize;
        res.send(scope);

    } else {
        res.end();
    }

});

// Delete artifact
router.post(process.env.APP_ARTIFACTS_DELETE_URI, async (req, res) => {

    var scope = {};

    const appBaseUrl = req.protocol + '://' + req.hostname + ':' + req.socket.localPort;
    token = req.cookies['token'];
    owner = req.body.owner;
    repo = req.body.repo;
    artifactId = req.body.artifactId;

    if (token) {

        const gitHubUtils = new GitHubUtils(token);

        gitHubUtils.deleteArtifact(owner, repo, artifactId).then((data) => {
            res.send(data);
        });

    } else {
        res.end();
    }

});

module.exports = router;