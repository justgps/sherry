FROM alpine

WORKDIR /app
COPY ./app /app

USER root
ENV PORT=80

ENTRYPOINT ["/app/app"]
