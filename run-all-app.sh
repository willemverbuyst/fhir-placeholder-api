echo "Starting FHIR Name Service"
go run apps/fhir-name-service/main.go &

echo "Starting FHIR Placeholder API"
pnpm run dev
