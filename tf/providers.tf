# https://cloud.google.com/docs/terraform/resource-management/store-state
# just created the bucket manually and link to it via terraform init

provider "google" {
    # use your project here
    project = "dfar55"
    region  = "us-east4"
}

terraform {
    required_version = "1.9.5"
    required_providers {
        google = {
            source  = "hashicorp/google"
            version = "6.0.1"
        }
        random = {
            source  = "hashicorp/random"
            version = "3.6.2"
        }
        github = {
            source  = "hashicorp/github"
            version = "6.2.3"
        }
    }
    backend "gcs" {
        bucket = "budgeteer-tf-state"
    }
}