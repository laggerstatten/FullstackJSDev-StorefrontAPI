/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(10),
    user_id BIGINT NOT NULL,
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);