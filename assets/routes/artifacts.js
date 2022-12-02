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

// Get artifacts
router.get(process.env.APP_ARTIFACTS_URI, (req, res) => {

    console.log(req);

});

module.exports = router;





// OLD CODE
// Require libraries
/*const fs = require('fs');

// List all repositories
async function getRepos(org) {

    return octokit.rest.repos.listForOrg({
        org: org,
        type: "private"
    }).then(({ data, headers, status }) => {
        return data;
    });
};

// List all artifacts
async function getArtifacts(owner, repo) {

    return octokit.rest.actions.listArtifactsForRepo({
        owner: owner,
        repo: repo,
        per_page: 100
    }).then(({ data, headers, status }) => {
        return data;
    }
    );
};

async function main() {

    var artifactsOut = [];
    var totalSize = 0;

    // Get all repositories
    const repos = await getRepos(org);

    // Get all artifacts
    for (const i in repos)
    {
        const currentRepo = repos[i];
        const artifacts = await getArtifacts(org, currentRepo.name);

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

    /*var output = {
        "totalSize": totalSize,
        "artifacts": artifactsOut
    };

    // Write output to file
    fs.writeFileSync('docs/assets/data/artifacts.json', JSON.stringify(artifactsOut, null, 2));

}

main();*/