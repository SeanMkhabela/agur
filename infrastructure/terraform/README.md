# Terraform Deployment for Augur Dashboard

This directory contains Terraform configuration for deploying the Azure infrastructure required for the Augur Dashboard.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (version >= 1.0.0)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- Azure subscription

## Getting Started

1. **Login to Azure CLI**:

   ```bash
   az login
   ```

2. **Create a Storage Account for Terraform State** (optional but recommended):

   ```bash
   # Set variables
   RESOURCE_GROUP_NAME="terraform-state-rg"
   STORAGE_ACCOUNT_NAME="augurterraformstate"
   CONTAINER_NAME="tfstate"
   LOCATION="eastus"

   # Create resource group
   az group create --name $RESOURCE_GROUP_NAME --location $LOCATION

   # Create storage account
   az storage account create --resource-group $RESOURCE_GROUP_NAME --name $STORAGE_ACCOUNT_NAME --sku Standard_LRS --encryption-services blob

   # Create blob container
   az storage container create --name $CONTAINER_NAME --account-name $STORAGE_ACCOUNT_NAME

   # Get storage account key
   ACCOUNT_KEY=$(az storage account keys list --resource-group $RESOURCE_GROUP_NAME --account-name $STORAGE_ACCOUNT_NAME --query [0].value -o tsv)
   ```

3. **Create terraform.tfvars file**:

   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

   Edit `terraform.tfvars` with your specific values.

4. **Initialize Terraform**:

   If using Azure Storage for state:

   ```bash
   terraform init \
     -backend-config="storage_account_name=$STORAGE_ACCOUNT_NAME" \
     -backend-config="container_name=$CONTAINER_NAME" \
     -backend-config="key=prod.terraform.tfstate" \
     -backend-config="access_key=$ACCOUNT_KEY"
   ```

   Otherwise:

   ```bash
   terraform init
   ```

5. **Plan Terraform Deployment**:

   ```bash
   terraform plan -out=tfplan
   ```

6. **Apply Terraform Deployment**:

   ```bash
   terraform apply tfplan
   ```

7. **Get the Azure Static Web Apps API Token**:

   After applying the Terraform configuration, you'll need to retrieve the API token from the Azure Portal:

   - Go to the Azure Portal
   - Navigate to your Static Web App resource
   - Go to "Manage deployment token" under "Configuration"
   - Copy the token and add it as a secret in your GitHub repository with the name `AZURE_STATIC_WEB_APPS_API_TOKEN`

## Variables

| Name | Description | Default |
|------|-------------|---------|
| `resource_group_name` | The name of the resource group | `"augur-rg"` |
| `location` | The Azure location where resources will be created | `"eastus"` |
| `static_web_app_name` | The name of the Static Web App | `"augur-dashboard"` |
| `repository_url` | The GitHub repository URL | `"https://github.com/your-username/augur-dashboard"` |
| `repository_branch` | The branch to deploy | `"main"` |
| `tags` | Tags to apply to all resources | `{ environment = "production", application = "augur-dashboard" }` |

## Outputs

| Name | Description |
|------|-------------|
| `static_web_app_id` | The ID of the Static Web App |
| `static_web_app_default_hostname` | The default hostname of the Static Web App | 