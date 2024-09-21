# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/iam_workload_identity_pool
# https://andrekoenig.de/articles/workload-identity-federation-for-secure-access-to-google-cloud-platform-via-github-actions
# used for Github Actions and CICD

resource "random_string" "pool_name" {
  length = 5
  special = false
  upper   = false
}

resource "google_iam_workload_identity_pool" "github_actions" {
  project = google_project.project.project_id
  workload_identity_pool_id = "github-actions-${random_string.pool_name.id}"
}

resource "google_iam_workload_identity_pool_provider" "github_actions" {
  project = google_project.project.project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_actions.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions-provider"
  attribute_mapping                  = {
    "google.subject"             = "assertion.sub"
    "attribute.actor"            = "assertion.actor"
    "attribute.repository"       = "assertion.repository"
    "attribute.repository_owner" = "assertion.repository_owner"
  }
  attribute_condition = "assertion.repository_owner == 'dfar-io'"
  oidc {
    issuer_uri        = "https://token.actions.githubusercontent.com"
  }
}

resource "google_project_iam_member" "storage_access" {
  project = google_project.project.project_id
  role    = "roles/storage.objectUser"
  member  = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/attribute.repository/dfar-io/budgeteer"
}

resource "github_actions_secret" "workload_identity_pool_provider_name" {
  repository       = "budgeteer"
  secret_name      = "WORKLOAD_IDENTITY_PROVIDER"
  plaintext_value  = google_iam_workload_identity_pool_provider.github_actions.name
}