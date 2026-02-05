<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- Crear cada microservice como restfull
- Cambiar a protocolo TCP conectado a cada servicio (generan dependencias entre si)
- Cambio a Nats Server

## Project setup

```bash
$ yarn install
```

## Run

```bash
# watch mode
$ docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats

# watch mode
$ yarn run start:dev

# Levantar los otros servicios

```
