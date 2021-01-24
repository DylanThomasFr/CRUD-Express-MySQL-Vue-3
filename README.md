# CRUD-Express-MySQL-Vue-3

## Getting started

There are two ways to run this project. The first one is to install everything and run it directly on your machine. The second one leverages docker.

But first, copy and update `.env` files with the following commands :

```
cp backend/env-example backend/.env
cp backend/config/example.config.json backend/config/config.json
```

### 1. Hosted on the host

1. First, you must have Node installed on your machine.
You must have a MySQL database ready.

2. Update `backend/.env` file with your database information.

3. Install node modules for both folders and running :

For backend folder :
```
cd backend
npm install
npm run dev
```

For frontend folder :
```
cd frontend
npm install
npm run serve
```

Have fun !

### 2. Using docker

You must have docker-compose installed.

First, copy and update the `.env` file using the following command :
```
cp env-example .env
```

Then run the whole project :
```
docker-compose up -d
```

You can check the container status with `docker-compose ps`.

Have fun.