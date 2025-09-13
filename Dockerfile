FROM node:alpine AS ngbuild

COPY . /app

WORKDIR /app

RUN cd ng && npm i && npm i -g @angular/cli && ng build

FROM golang:1.25-alpine AS gobuild

COPY --from=ngbuild /app /app

WORKDIR /app

RUN go build

FROM alpine

COPY --from=gobuild /app/dist /app/dist
COPY --from=gobuild /app/quDnD-wiki /app/quDnD-wiki

WORKDIR /app

CMD ["./quDnD-wiki"]
