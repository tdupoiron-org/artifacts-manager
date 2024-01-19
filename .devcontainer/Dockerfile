FROM mcr.microsoft.com/devcontainers/base:bullseye

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Verify installation
RUN node --version
RUN npm --version