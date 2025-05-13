#!/bin/bash

# Set these variables for your environment
RESOURCE_GROUP="augur-rg"
LOCATION="eastus"
DEPLOYMENT_NAME="augur-deployment"
REPO_URL="https://github.com/your-username/augur-dashboard"
BRANCH="main"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null
then
    echo "Azure CLI is not installed. Please install it first."
    exit 1
fi

# Login to Azure
echo "Please login to your Azure account..."
az login

# Create resource group if it doesn't exist
if [ $(az group exists --name $RESOURCE_GROUP) = false ]; then
    echo "Creating resource group $RESOURCE_GROUP in $LOCATION..."
    az group create --name $RESOURCE_GROUP --location $LOCATION
else
    echo "Resource group $RESOURCE_GROUP already exists."
fi

# Deploy the Bicep template
echo "Deploying Azure resources..."
az deployment group create \
  --name $DEPLOYMENT_NAME \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters repositoryUrl=$REPO_URL branch=$BRANCH

# Get the Static Web App deployment token
echo "Getting deployment token..."
STATIC_WEB_APP_NAME=$(az deployment group show --name $DEPLOYMENT_NAME --resource-group $RESOURCE_GROUP --query 'properties.outputs.staticWebAppName.value' -o tsv)
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list --name $STATIC_WEB_APP_NAME --resource-group $RESOURCE_GROUP --query 'properties.apiKey' -o tsv)

echo ""
echo "====== IMPORTANT ======"
echo "Add this deployment token as a secret in your GitHub repository:"
echo "Name: AZURE_STATIC_WEB_APPS_API_TOKEN"
echo "Value: $DEPLOYMENT_TOKEN"
echo "======================="

echo "Deployment completed successfully!" 