# Artifacts Manager

Artifacts Manager is a Node.js application designed to manage your GitHub artifacts. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).

### Installing Artifacts Manager

To install Artifacts Manager, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/artifacts-manager.git`
2. Navigate into the project directory: `cd artifacts-manager`
3. Install the dependencies: `npm install`

### Configuring Artifacts Manager

Artifacts Manager requires a GitHub App to function. Follow these steps to set it up:

1. Create a new GitHub App. You can follow the [official GitHub guide](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app) to do this.
2. Install your GitHub App in the target organizations.
3. Add repository administration permissions to your GitHub App.
4. Generate a secret for your GitHub App.

After setting up the GitHub App, you need to add the following environment variables:

- `GH_CLIENTID`: Your GitHub App's client ID.
- `GH_CLIENTSECRET`: Your GitHub App's client secret.

You can add these variables to your `.env` file in the root of your project.

### Running Artifacts Manager

To run Artifacts Manager, use the following command:

```bash
npm start