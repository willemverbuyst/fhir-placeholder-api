import requests
from openpyxl import Workbook

FHIR_BASE = "http://localhost:8080/api/v2/r5"

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

wb = Workbook()

appointment_entries = fetch_bundle("Appointment")
ws_appointment = wb.active
ws_appointment.title = "Appointment"
ws_appointment.append(["ID", "Name", "Subject", "Participant"])

for entry in appointment_entries:
    resource = entry.get("resource", {})
    appointment_id = resource.get("id", "")
    status = resource.get("status", "")
    subject = resource["subject"]["reference"].split("/")[1]
    participants = [p["actor"]["reference"].split("/")[1] for p in resource["participant"]]

    for p in participants:
        ws_appointment.append([appointment_id, status, subject, p])

org_entries = fetch_bundle("Organization")
ws_org = wb.create_sheet(title="Organization")
ws_org.append(["ID", "Name"])

for entry in org_entries:
    resource = entry.get("resource", {})
    org_id = resource.get("id", "")
    name = resource.get("name", "")
    ws_org.append([org_id, name])

pr_entries = fetch_bundle("PractitionerRole")
ws_pr = wb.create_sheet(title="PractitionerRole")
ws_pr.append(["ID"])

for entry in pr_entries:
    resource = entry.get("resource", {})
    pr_id = resource.get("id", "")
    ws_pr.append([pr_id])

# Save the workbook
wb.save("fhir_data.xlsx")
print("Saved to fhir_data.xlsx")
