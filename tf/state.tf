# https://cloud.google.com/docs/terraform/resource-management/store-state
# just created the bucket manually and link to it via terraform init

terraform {
    backend "gcs" {
        bucket = "budgeteer-tf-state"
    }
}