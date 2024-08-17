# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket

resource "google_storage_bucket" "static-site" {
  project       = local.project
  name          = "b.dfar.io"
  location      = "us-east4"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
}

# public access to internet
resource "google_storage_bucket_access_control" "public_rule" {
  bucket = google_storage_bucket.static-site.name
  role   = "READER"
  entity = "allUsers"
}