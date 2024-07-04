psql -U postgres -d store_test

DROP TABLE IF EXISTS migrations, order_products, orders, products, users CASCADE;
