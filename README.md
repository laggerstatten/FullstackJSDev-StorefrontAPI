# Storefront Backend Instructions

### Setting up the environment
Create a file named '.env' and add the below environment variables.

```
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = equipment_shop
POSTGRES_TEST_DB = equipment_shop_test
POSTGRES_USER = test_user
POSTGRES_PASSWORD = password123
ENV = dev
BCRYPT_PASSWORD = test_bcrypt_password
SALT_ROUNDS = 10
TOKEN_SECRET = test_token_secret
```

### Check to see if conflicting databases or users are already created

In a GitBash terminal, run the following:

```
  psql postgres
```

To see what databases already exist:

```
  \l
```
```
  DROP DATABASE equipment_shop;
  DROP DATABASE equipment_shop_test;
```

To see what roles already exist:

```
  \du
```
```
  DROP ROLE test_user;
```


### Setting up postgres

In a GitBash terminal, run the following:

```
  psql postgres
```
```
  CREATE USER test_user CREATEDB CREATEROLE PASSWORD 'password123';
  CREATE DATABASE equipment_shop WITH OWNER = test_user;
  CREATE DATABASE equipment_shop_test WITH OWNER = test_user;
```
```
  psql -h localhost -U test_user -d equipment_shop_test
```

### Run Locally

#### Scripts

Build script to compile TS to JS
```
  npm run build
```

Start the application after build
```
  npm run start
```

Run tests using Jasmine Library
```
  npm run test
```

## API Endpoints
Server will be running on port 3000

### Products

#### GET /products
- Returns a list of all the products in the database
- GET http://localhost:3000/api/products -Index

#### GET /products/:id
- Returns details about a product in the database
- GET http://localhost:3000/api/products/:id -Show

#### POST /products
- Adds a new product to the database, including the product's name, price, and category
- POST http://localhost:3000/api/products -Create

#### DELETE /products/:id
- Deletes a product from the database
- DELETE http://localhost:3000/api/products/:id -Delete

### Users

#### GET /users
- Returns a list of all the users in the database
- GET http://localhost:3000/api/users -Index

#### GET /users/:id
- Returns details about a user listed in the database
- GET http://localhost:3000/api/users/:id -Show

#### POST /users
- Adds a new user to the database, including the users's first name, last name, username, and password
- POST http://localhost:3000/api/users -Create

#### DELETE /users/:id
- Deletes a user from the database
- DELETE http://localhost:3000/api/users/:id -Delete

### Orders

#### GET /orders
- Returns a list of all the orders in the database
- GET http://localhost:3000/api/orders -Index

#### GET /orders/:id
- Returns details about an order in the database
- GET http://localhost:3000/api/orders/:id -Show

#### POST /orders/:user_id
- Adds a new order to the database, including the user id, the order's status, and an array of products
- POST http://localhost:3000/api/orders/:user_id -Create

#### DELETE /orders/:id
- Deletes an order from the database
- DELETE http://localhost:3000/api/orders/:id -Delete

#### GET /orders/getOrdersByUserID/:id
- Returns a list of the orders in the database associated with a user
- GET http://localhost:3000/api/orders/getOrdersByUserID/:id
