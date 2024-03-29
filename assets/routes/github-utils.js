const { Octokit } = require("@octokit/rest");

class GitHubUtils{

    constructor(token) {
        this.octokit = new Octokit(
            {
                auth: token,
            }
        );
    }

    // List organizations
    async getOrgs() {
        return this.octokit.rest.orgs.listForAuthenticatedUser({
        }).then(({ data, headers, status }) => {
            return data;
        }).catch((error) => {
            console.error("Failed to list organizations: ");
        });
    }

    // List all repositories
    async getRepos(org) {
        
        return this.octokit.rest.repos.listForOrg({
            org: org,
            type: "private"
        }).then(({ data, headers, status }) => {
            return data;
        }).catch((error) => {
            console.error("Failed to list repositories for organization " + org);
        });
    }

    // List all artifacts
    async getArtifacts(org, repo) {
        return this.octokit.rest.actions.listArtifactsForRepo({
            owner: org,
            repo: repo,
            per_page: 100
        }).then(({ data, headers, status }) => {
            return data;
        }).catch((error) => {
            console.error("Failed to retrieve artifacts for repo " + repo);
        });
    }

    // Delete artifact
    async deleteArtifact(owner, repo, artifactId) {

        return this.octokit.rest.actions.deleteArtifact({
            owner: owner,
            repo: repo,
            artifact_id: artifactId
        }).then(({ data, headers, status }) => {
            return data;
        }).catch((error) => {
            console.log(error);
            console.error("Failed to delete artifact " + artifactId);
        });
    }

}

module.exports = GitHubUtils;