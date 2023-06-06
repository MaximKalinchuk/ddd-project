<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>

</p>

## Описание

DDD-project - backend, написанный опираясь на паттерны Domain-Driven Design и CQRS.<br>

<b>Что реализовано:</b>

- Авторизация с подтверждением почты
- Access и refresh токены (NestJS Passport Strategy)
- Смена пароля
- Отправка фидбэка на почту
- Посты пользователя + пагинация этих постов
- Облочное хранение файлов в Minio (см. ниже)

## Установка

```bash
# установить все зависимости
$ yarn
```

Далее требуется установить PostgreSQL и локально создать в нём базу данных <b>DDD-project</b>. Данные из БД должны соответствовать переменным окружения в .env файле. Также следует удалить старые миграции по адресу src/database/migragions (Удаляем все файлы внутри! Мы накатим новые ниже.)

```bash
# создать миграцию (достаточно прописать только 1 раз)
$ yarn db:create

# накатить миграцию и сиды в базу данных (достаточно прописать только 1 раз)
$ yarn db:start
```

## Запуск Minio в docker контейнере

Для запуска контейнера вам потребуется установленный локально docker.

```bash
# Запускаем докер контейнер с Minio из папки ./docker
$ docker-compose up -d
```

Теперь вы можете зайти в minio: http://localhost:9001/

### Данные для входа:

- `name: minio`

- `password: supersecret`

Также для корректной работы minio сделует настроить .env файл по этой
<a href="https://alexisbouchez.hashnode.dev/how-to-setup-minio-in-a-nestjs-api-to-handle-file-uploads">Статье</a>.

## Запуск приложения

```bash
# команда для запуска приложения в режиме разработки
$ yarn start:dev

# команда для запуска приложения в прод (натроить .env файл!)
$ yarn start
```

## Стэк

NestJS, postrgeSQL, TypeScript, Docker

## API

[Документация](http://localhost:5000/api/docs/) - порт динамический и устанавливается внутри .env файла. (В процессе...)
