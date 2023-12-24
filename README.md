## Organization structure's server

### Table of contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Start project locally](#start-project-locally)
- [Endpoints](#endpoints)
  - [Users](#users)
    - [POST /users](#post-users)
    - [PUT /users/manager](#put-usersmanager)
    - [GET /users](#get-users)
    - [DELETE /users/:id](#delete-usersid)

### Overview

Server tool for viewing organization structure.

### Technology Stack

[<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="node" height="60"/>](https://nodejs.org/en) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" alt="nest" height="60"/>](https://nestjs.com/) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" height="60"/>](https://www.typescriptlang.org/) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" height="60"/>](https://www.docker.com/) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgreSQL" height="60"/>](https://www.postgresql.org/) [<img src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png" alt="typeorm" height="60"/>](https://typeorm.io/) [<img src="https://www.vectorlogo.zone/logos/eslint/eslint-icon.svg" alt="eslint" height="60"/>](https://eslint.org/) [<img src="https://prettier.io/icon.png" alt="prettier" height="60"/>](https://prettier.io/)

### Start project locally:

1. Download/clone the project
2. Go to the project root with `cd organization-structure-server` command
3. Run `npm install`
4. Create `.env` file from `.env.example`
5. Install and run PostgreSQL with:
   - `docker compose --profile development up`
   - for linux: `docker-compose --profile development up`
6. Run migrations with `npm run typeorm migration:run`
   - Don't just install typeorm cli globally, run it via npm so it uses TypeScript
7. Start the project using `npm run start` command (or `npm run start:dev` with watch mode)

Project starts on `http://localhost:5000`

### Endpoints

#### Users

##### POST /users

For creating new users.

###### body

```ts
{
  name: string, // required, length (2, 256)
}
```

###### response

```ts
{
  id: string, // uuid
  name: string,
  createdAt: Date,
  updatedAt: Date,
}
```

##### PUT /users/manager

For assigning manager to subordinate.

###### body

```ts
{
	managerId: string, // required, uuid
	subordinateId: string, // required, uuid
}
```

###### response

```ts
{}
```

###### 400 Bad Request Errors

Condition  | Message
------------- | -------------
managerId === subordinateId  | User can't be the manager for themselves
!manager or !subordinate | User doesn't exist 
after additing this edge hierarchy will be circular | Circular reference detected. Manager assignment not allowed


##### GET /users

Get info about all users in system with managers and subordinates.

###### response

```ts
{
  id: string,
  name: string,
  manager: { // direct manager or null
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  } | null,
  subordinates: { // array of direct subordinates
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  }[]
  createdAt: Date,
  updatedAt: Date,
}
```

##### DELETE /users/:id

Delete user by provided id.

###### params

```ts
{
  id: string, // required, uuid
}
```

###### response

```ts
{}
```
