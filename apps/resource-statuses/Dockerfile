FROM golang:1.24-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY server.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/resource-statuses .

FROM alpine:3.19

RUN adduser -D -u 65532 appuser
WORKDIR /app

COPY --from=build /out/resource-statuses /usr/local/bin/resource-statuses
COPY views ./views

USER appuser
EXPOSE 4001

CMD ["/usr/local/bin/resource-statuses"]
