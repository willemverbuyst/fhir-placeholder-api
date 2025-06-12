import requests
from openpyxl import Workbook


# Base FHIR server URL (change if needed)
FHIR_BASE = "http://localhost:8080/api/v2/r5"

# Function to fetch a bundle from a FHIR endpoint
def fetch_bundle(resource_type):
    url = f"{FHIR_BASE}/{resource_type}"
    headers = {"Accept": "application/fhir+json"}
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Failed to fetch {resource_type}")
        print("Status code:", response.status_code)
        return []

    bundle = response.json()
    return bundle.get("entry", [])

# Create a new Excel workbook
wb = Workbook()

# --- Sheet for Organizations ---
org_entries = fetch_bundle("Organization")
ws_org = wb.active
ws_org.title = "Organizations"
ws_org.append(["ID", "Name"])

for entry in org_entries:
    resource = entry.get("resource", {})
    org_id = resource.get("id", "")
    name = resource.get("name", "")
    ws_org.append([org_id, name])

# --- Sheet for PractitionerRoles ---
pr_entries = fetch_bundle("PractitionerRole")
ws_pr = wb.create_sheet(title="PractitionerRoles")
ws_pr.append(["ID"])

for entry in pr_entries:
    resource = entry.get("resource", {})
    pr_id = resource.get("id", "")
    ws_pr.append([pr_id])

# Save the workbook
wb.save("fhir_data.xlsx")
print("Saved to fhir_data.xlsx")
