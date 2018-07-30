APP?=sherry
PORT?=11000
ContainerName?=linebot/sherry


build: 
	docker build -t ${ContainerName} .

run: build
	docker run --rm -p ${PORT}:${PORT} ${ContainerName}
	sh cleannode.sh

test:
	docker run --rm -p ${PORT}:${PORT} ${ContainerName}
