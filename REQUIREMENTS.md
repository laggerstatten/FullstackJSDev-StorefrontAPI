# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create [token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Database Schema

- products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(150) NOT NULL, 
    price FLOAT NOT NULL, 
    category VARCHAR(200)
    )

- users (
    id SERIAL PRIMARY KEY, 
    user_name VARCHAR(150), 
    first_name VARCHAR(150), 
    last_name VARCHAR(150), 
    password VARCHAR
    )

- orders (
    id SERIAL PRIMARY KEY, 
    status VARCHAR(10), 
    user_id BIGINT NOT NULL, 
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id)
    )

- order_products (
    id SERIAL PRIMARY KEY, 
    quantity INTEGER NOT NULL, 
    order_id BIGINT REFERENCES orders(id), 
    product_id BIGINT REFERENCES products(id), 
    CONSTRAINT FK_order_id FOREIGN KEY (order_id) REFERENCES orders(id), 
    CONSTRAINT FK_product_id FOREIGN KEY (product_id) REFERENCES products(id)
    )

### Endpoints

Product:
- Index - GET /api/products
- Show - GET /api/products/:id (args: product_id)
- Create [token required] - POST /api/products (args: product {name, price, category})
- Top 5 most popular products - GET /api/products/popular
- Products by category - GET /api/products/category/:category (args: product_category)

User:
- Index [token required] - GET /api/users
- Show [token required] - GET /api/users/:id (args: user_id)
- Create [token required] - POST /api/users (args: user {user_name, first_name, last_name, password})

Order:
- Current Order by user [token required] - GET /api/orders/:id (args: user_id)
- Completed Orders by user [token required] - GET /api/orders/completed/:id (args: user_id and status as completed)
