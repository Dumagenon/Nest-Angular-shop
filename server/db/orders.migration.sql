CREATE TABLE IF NOT EXISTS order_info(
    id SERIAL PRIMARY KEY,
    amount INT NOT NULL,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS orders(
    order_info_id INT NOT NULL REFERENCES order_info(id),
    customer_id INT NOT NULL REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS order_details(
    id SERIAL PRIMARY KEY,
    order_info_id INT NOT NULL REFERENCES order_info(id),
    product_id INT NOT NULL REFERENCES products(id),
    quantity INT NOT NULL
);
