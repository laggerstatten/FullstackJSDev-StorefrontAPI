1. Run `docker compose up` to set up the the used container to run the databases
2. While the container is running you need another terminal and run `docker exec -ti fullstackjsdev-storefrontapi-postgres-1 bash` to get into the container
3. Run `su postgres` to connect as postgres user
4. Run `psql --dbname=equipment_store_test --host=127.0.0.1 --username=test_user -W` and then when prompted type `password123` to connect to our main database
5. Now we need to create a new database to execute our tests; run `CREATE DATABASE storefront_test;`




docker exec -ti fullstackjsdev-storefrontapi-postgres-1 bash
psql -U equipment_user -d equipment_store_test
psql -U equipment_user -d equipment_store

su test_user

psql --dbname=equipment_store --host=127.0.0.1 --username=equipment_user -W
CREATE DATABASE equipment_store;

\c equipment_store









docker exec -ti fullstackjsdev-storefrontapi-postgres-1 bash
psql -U equipment_user -d equipment_store

CREATE ROLE test_user WITH LOGIN PASSWORD 'password123';

CREATE DATABASE equipment_store_test;

GRANT ALL PRIVILEGES ON DATABASE equipment_store_test TO test_user;

\q

psql -U test_user -d equipment_store_test





