<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Описание

DDD-project - backend написанный опираясь на паттерны Domain-Driven Design и Command.<br>

<b>Что реализовано:</b>

- Авторизация с подтверждением почты
- Access и refresh токены (NestJS Passport Strategy)
- Смена пароля
- Посты пользователя + пагинация этих постов

## Установка

```bash
# установить все зависимости
$ yarn
```

Далее требуется установить PostgreSQL и локально создать в нём базу данных <b>DDD-project</b>. Данные из БД должны соответствовать переменным окружения в .env файле. Также следует удалить старые миграции по адресу src/database/migragions (Удаляем все файлы внутри! Мы накатим новые ниже.)

## Запуск приложения

```bash
# создать миграцию (достаточно прописать только 1 раз)
$ yarn db:create

# накатить миграцию и сиды в базу данных (достаточно прописать только 1 раз)
$ yarn db:start

# команда для запуска приложения в режиме разработки
$ yarn start:dev
```

## Стэк

NestJS, postrgeSQL, TypeScript

## API

[Документация](http://localhost:5000/api/docs/) - порт динамический и устанавливается внутри .env файла. (В процессе...)
