CREATE TABLE IF NOT EXISTS categories(
    id SERIAL PRIMARY KEY,
    name CHAR(20) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS product_categories(
    product_id INT REFERENCES products(id),
    category_id INT REFERENCES categories(id)
);
