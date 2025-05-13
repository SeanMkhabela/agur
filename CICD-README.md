# Augur Dashboard CI/CD Pipeline

This document describes the continuous integration and continuous deployment (CI/CD) pipeline for the Augur Dashboard project.

## Overview

The Augur Dashboard is deployed to Azure Static Web Apps using a CI/CD pipeline. Every commit to the main branch automatically triggers a build and deployment process.

## Architecture

- **Source Control**: GitHub
- **CI/CD Tools**: GitHub Actions / Azure DevOps Pipelines
- **Cloud Platform**: Microsoft Azure
- **Deployment Service**: Azure Static Web Apps
- **Infrastructure as Code**: Azure Bicep

## CI/CD Workflow

1. Developer commits code to the main branch
2. GitHub Actions/Azure DevOps Pipeline automatically starts
3. The pipeline installs dependencies, runs linting checks, and builds the application
4. The built application is deployed to Azure Static Web Apps
5. The deployment is automatically accessible via the Azure Static Web App URL

## Setup Instructions

### Prerequisites

- An Azure account with an active subscription
- GitHub repository with the Augur Dashboard code
- Azure CLI installed (for initial setup)

### Initial Setup

1. **Provision Azure Resources**:

   Using Azure CLI and the provided Bicep template:

   ```bash
   # Navigate to the infrastructure directory
   cd infrastructure

   # For Linux/macOS users
   chmod +x deploy.sh
   ./deploy.sh

   # For Windows users (using PowerShell)
   .\deploy.ps1
   ```

2. **Configure GitHub Secrets**:

   After running the deployment script, you'll receive an API token. Add this token to your GitHub repository as a secret:

   - Go to your GitHub repository
   - Navigate to Settings > Secrets > New repository secret
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: (The token from the deployment script)

3. **Enable GitHub Actions**:

   - The workflow file is already in the repository at `.github/workflows/azure-static-web-apps.yml`
   - GitHub will automatically detect and use this file for CI/CD

### Azure DevOps Pipeline Setup (Alternative)

If you prefer using Azure DevOps Pipelines instead of GitHub Actions:

1. Create a new project in Azure DevOps
2. Import your repository
3. Create a new pipeline, selecting the existing `azure-pipelines.yml` file
4. Add the `AZURE_STATIC_WEB_APPS_API_TOKEN` as a pipeline variable
5. Run the pipeline

## Deployment Environments

- **Production**: Deployed automatically from the `main` branch
- **Preview Environments**: For pull requests, temporary environments are automatically created

## Monitoring and Logs

- **Deployment Status**: Available in GitHub Actions or Azure DevOps Pipelines dashboard
- **Application Logs**: Available in Azure Portal under the Static Web App resource
- **Performance Metrics**: Available in Azure Monitor

## Troubleshooting

If deployments fail, check:

1. GitHub Actions or Azure DevOps logs for build errors
2. Ensure the `AZURE_STATIC_WEB_APPS_API_TOKEN` is correctly set
3. Verify that the output directory in your CI configuration matches the one specified in `next.config.js`
4. Check that your Azure Static Web App resource is properly configured

## Security Considerations

- API token is stored as a secret and never exposed in logs
- Azure resources are secured with Azure's security features
- Static Web App includes built-in security features like HTTPS and DDoS protection

## Maintenance

- Review and update Node.js version in the CI pipeline regularly
- Keep dependencies updated
- Consider implementing automated dependency scanning (e.g., GitHub Dependabot) 