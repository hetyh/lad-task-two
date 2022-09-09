# Задание 2. Request-Reply - NATS

## Описание задачи

> Реализовать микросервис api, основная задача которого - принимать запросы от клиента и направлять их в микросервис storage с помощью системы обмена сообщениями NATS. В качестве примера взаимодействия микросервисов необходимо реализовать тестовый маршрут GET api/test, который публикует сообщение в NATS.
>
> Реализовать микросервис storage, основная задача которого - принимать запросы от микросервиса api и вызывать соответствующие методы репозитория. В качестве примера взаимодействия микросервисов, необходимо подписаться на сообщение, опубликованное в микросервисе api и указать тестовый обработчик, который вызывает метод find репозитория test.

## Пример выполнения

Запрос:

`GET http://localhost:3000/api/test`

Результат:

```
HTTP/1.1 200 OK
Connection: keep-alive
Date: Mon, 05 Sep 2022 08:07:46 GMT
Keep-Alive: timeout=5
accept-ranges: bytes
cache-control: no-cache
content-length: 183
content-type: application/json; charset=utf-8
```

```json
[
  {
    "age": 5,
    "firstName": "Test",
    "id": 13,
    "lastName": "User Three"
  },
  {
    "age": 125,
    "firstName": "Test",
    "id": 14,
    "lastName": "User-Two"
  },
  {
    "age": 18,
    "firstName": "Test",
    "id": 15,
    "lastName": "User-One"
  }
]
```

## Описание API

|  Маршрут  | Запрос | Параметры |       Ответ        |                                      Описание                                      |
| :-------: | :----: | :-------: | :----------------: | :--------------------------------------------------------------------------------: |
| /api/test |  GET   |           | `application/json` | Публикация сообщения NATS и возврат результата вызова метода find репозитория test |

## Описание моделей

### User

|   id   | firstName | lastName |  age   |
| :----: | :-------: | :------: | :----: |
| number |  string   |  string  | number |

## Используемые библиотеки

- [hapi.js](https://github.com/hapijs/hapi) - HTTP сервер
- [dotenv](https://github.com/motdotla/dotenv) - загрузка переменных среды из .env
- [nats](https://github.com/nats-io/nats.js) - клиент NATS для Node.js
- [pg](https://github.com/brianc/node-postgres) - клиент PostgreSQL для Node.js
- [typeorm](https://github.com/typeorm/typeorm) - объектно-реляционно преобразование

## Используемые инструменты разработки

- [nodemon](https://github.com/remy/nodemon) - автоматический перезапуск сервера при обновлении исходников
- [typescript](https://github.com/Microsoft/TypeScript) - статическая типизация и инкрементальная компиляция при обновлении исходников
- [prettier](https://github.com/prettier/prettier) - форматирование кода

## Переменные среды

- POSTGRES_USER - имя пользователя PostgreSQL
- POSTGRES_PASSWORD - пароль пользователя PostgreSQL
- POSTGRES_DB - название БД PostgreSQL
- POSTGRES_PORT - порт сервера PostgreSQL
- POSTGRES_HOST - адрес сервера PostgreSQL
- NATS_HOST - адрес сервера NATS
- NATS_PORT - порт сервера NATS
