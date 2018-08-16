APP?=sherry_stock
PORT?=11002
ContainerName?=sherry/stock


build: 
	docker build -t ${ContainerName} .

run: build
	docker run --rm -p ${PORT}:${PORT} ${ContainerName}
	sh cleannode.sh

test:
	docker run --rm -p ${PORT}:${PORT} ${ContainerName}
