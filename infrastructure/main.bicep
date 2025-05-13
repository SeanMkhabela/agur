@description('Name of the Static Web App')
param staticWebAppName string = 'augur-dashboard'

@description('Location for all resources')
param location string = resourceGroup().location

@description('SKU for the Static Web App')
param sku string = 'Free'

@description('Allow configuration file API definition')
param allowConfigFileUpdates bool = true

@description('The GitHub repository URL')
param repositoryUrl string = 'https://github.com/your-username/augur-dashboard'

@description('The branch to deploy')
param branch string = 'main'

resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: staticWebAppName
  location: location
  tags: {
    'app': 'augur-dashboard'
    'environment': 'production'
  }
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    provider: 'GitHub'
    repositoryUrl: repositoryUrl
    branch: branch
    buildProperties: {
      appLocation: '/'
      outputLocation: 'out'
    }
    allowConfigFileUpdates: allowConfigFileUpdates
    stagingEnvironmentPolicy: 'Enabled'
  }
}

output staticWebAppId string = staticWebApp.id
output staticWebAppDefaultDomain string = staticWebApp.properties.defaultHostname 