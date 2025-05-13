# Set these variables for your environment
$ResourceGroup = "augur-rg"
$Location = "eastus"
$DeploymentName = "augur-deployment"
$RepoUrl = "https://github.com/your-username/augur-dashboard"
$Branch = "main"

# Check if Azure CLI is installed
try {
    az --version | Out-Null
}
catch {
    Write-Error "Azure CLI is not installed. Please install it first."
    exit 1
}

# Login to Azure
Write-Host "Please login to your Azure account..."
az login

# Create resource group if it doesn't exist
$groupExists = az group exists --name $ResourceGroup
if ($groupExists -eq "false") {
    Write-Host "Creating resource group $ResourceGroup in $Location..."
    az group create --name $ResourceGroup --location $Location
}
else {
    Write-Host "Resource group $ResourceGroup already exists."
}

# Deploy the Bicep template
Write-Host "Deploying Azure resources..."
az deployment group create `
  --name $DeploymentName `
  --resource-group $ResourceGroup `
  --template-file .\main.bicep `
  --parameters repositoryUrl=$RepoUrl branch=$Branch

# Get the Static Web App deployment token
Write-Host "Getting deployment token..."
$StaticWebAppName = (az deployment group show --name $DeploymentName --resource-group $ResourceGroup --query 'properties.outputs.staticWebAppName.value' -o tsv)
$DeploymentToken = (az staticwebapp secrets list --name $StaticWebAppName --resource-group $ResourceGroup --query 'properties.apiKey' -o tsv)

Write-Host ""
Write-Host "====== IMPORTANT ======"
Write-Host "Add this deployment token as a secret in your GitHub repository:"
Write-Host "Name: AZURE_STATIC_WEB_APPS_API_TOKEN"
Write-Host "Value: $DeploymentToken"
Write-Host "======================="

Write-Host "Deployment completed successfully!" 