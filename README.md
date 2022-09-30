# LeBlokk Test App

## First run

First

```
npm install
npm install sequelize-cli -g
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

```
npm run serve
```

To create the first user you have to talk to the api dirrectly
send a post request to http://localhost:3000/api/auth/signup
with a JSON body like this:

```
{
    "username": "adminZ",
    "email": "adminmail@example.com",
    "password": "1234567890",
    "roles": ["admin","user"]
}
```

## build project

run backend only

```
npm run server
```

Run frontend only

```
npm run client
```

Run Both at the same time

```
npm run dev
```
