terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  backend "azurerm" {
    # Configuration will be provided during initialization
  }
}

provider "azurerm" {
  features {}
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group"
  default     = "augur-rg"
}

variable "location" {
  type        = string
  description = "The Azure location where resources will be created"
  default     = "eastus"
}

variable "static_web_app_name" {
  type        = string
  description = "The name of the Static Web App"
  default     = "augur-dashboard"
}

variable "repository_url" {
  type        = string
  description = "The GitHub repository URL"
  default     = "https://github.com/your-username/augur-dashboard"
}

variable "repository_branch" {
  type        = string
  description = "The branch to deploy"
  default     = "main"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to all resources"
  default = {
    environment = "production"
    application = "augur-dashboard"
  }
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

resource "azurerm_static_site" "main" {
  name                = var.static_web_app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku_tier            = "Free"
  sku_size            = "Free"
  tags                = var.tags

  # These are not applied immediately, as deployment happens via GitHub
  # They serve as documentation of the deployment configuration
  lifecycle {
    ignore_changes = [
      build_config,
      identity
    ]
  }
}

output "static_web_app_id" {
  value = azurerm_static_site.main.id
}

output "static_web_app_default_hostname" {
  value = azurerm_static_site.main.default_host_name
} 