FROM golang:1.24-alpine AS build

WORKDIR /app

COPY go.mod main.go ./
RUN go mod download
RUN CGO_ENABLED=0 go build -o /out/fhir-name-service .

FROM alpine:3.19

RUN adduser -D -u 65532 appuser
COPY --from=build /out/fhir-name-service /usr/local/bin/fhir-name-service

USER appuser
EXPOSE 4000

CMD ["/usr/local/bin/fhir-name-service"]
