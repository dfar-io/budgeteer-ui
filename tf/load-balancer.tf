# https://cloud.google.com/storage/docs/hosting-static-website#lb-ssl

# resource "google_compute_global_address" "lb_ip" {
#   project = local.project
#   name = "ip"
# }

# resource "google_compute_global_forwarding_rule" "forwarding_rule" {
#   project = local.project
#   name        = "forwarding-rule"
#   ip_address  = google_compute_global_address.lb_ip.address
#   target      = google_compute_target_https_proxy.https_proxy.self_link
#   port_range  = "443"
# }

# resource "google_compute_target_https_proxy" "https_proxy" {
#   project          = local.project
#   name             = "https-proxy"
#   url_map          = google_compute_url_map.url_map.self_link
#   ssl_certificates = [google_compute_managed_ssl_certificate.ssl_cert.self_link]
# }

# resource "google_compute_url_map" "url_map" {
#   project = local.project
#   name = "load-balancer"
#   default_service = google_compute_backend_bucket.backend_bucket.self_link
# }

# resource "google_compute_backend_bucket" "backend_bucket" {
#   project = local.project
#   name        = "backend-bucket"
#   bucket_name = google_storage_bucket.static-site.name
# }

# resource "google_compute_managed_ssl_certificate" "ssl_cert" {
#   project = local.project
#   name     = "ssl-cert"

#   managed {
#     domains = ["b.dfar.io"]
#   }
# }