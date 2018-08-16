PROJECT?=https://github.com/justgps/sherry
RELEASE?=0.0.1
COMMIT?=$(shell git rev-parse --short HEAD)
BUILDTIME?=$(shell date -u '+%Y-%m-%d %H:%M:%S')
APP?=app
PORT?=10003
ContainerName?=sherry/cron

clean:
	sh clean.sh
delapp:
	rm -f ${APP}

build: 
	GOOS=linux GOARCH=amd64 go build -tags netgo \
 	-o ${APP}

docker: build
	docker build -t ${ContainerName} .
	rm -f ${APP}

run:
	docker run --rm -p ${PORT}:80 ${ContainerName}
