## Build
FROM golang:1.20-buster AS build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY cmd/ ./cmd/
COPY internal/ ./internal/

RUN go build -o /app-server ./cmd/app-server

## Deploy
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /app-server /app-server

COPY static/ /static/

EXPOSE 8080

ENTRYPOINT ["/app-server"]