APP?=sherry_weather
PORT?=11001
ContainerName?=sherry/weather


build: 
	docker build -t ${ContainerName} .

run: build
	docker run --rm -p ${PORT}:${PORT} ${ContainerName}
	sh cleannode.sh

test:
	docker run --rm -p ${PORT}:${PORT} ${ContainerName}
