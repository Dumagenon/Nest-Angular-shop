INSERT INTO brands (name) VALUES ('Brandix');
INSERT INTO brands (name) VALUES ('Hammer');
INSERT INTO brands (name) VALUES ('Bosch');

INSERT INTO products
VALUES (
    DEFAULT,
    'EX32SD41',
    'Bosch Coldless Reciprocation Saw CRS1808',
    1349,
    'assets/images/products/product-28.jpg',
    (SELECT id FROM brands WHERE name = 'Bosch'),
    2
);

INSERT INTO products
VALUES (
    DEFAULT,
    'EX32SD42',
    'Hand Kit LDS2344',
    421,
    'assets/images/products/product-11.jpg',
    (SELECT id FROM brands WHERE name = 'Hammer'),
    11
);

INSERT INTO products
VALUES (
    DEFAULT,
    'EX32SD43',
    'Air Compressor DELTAKX500 10kWt',
    2399,
    'assets/images/products/product-14.jpg',
    (SELECT id FROM brands WHERE name = 'Brandix'),
    2
);

INSERT INTO categories (name)
VALUES ('Power tools');

INSERT INTO product_categories (product_id, category_id)
values (1, 1);

INSERT INTO product_categories (product_id, category_id)
VALUES (2, 1);

INSERT INTO product_categories (product_id, category_id)
VALUES (3, 1);

INSERT INTO customers (login, email, phone)
VALUES ('dumagenon', 'v@mail.ru', '+380668085195');

BEGIN;
INSERT INTO order_info (amount, order_date)
VALUES (2537, now());
INSERT INTO order_details (order_info_id, product_id, quantity)
VALUES (1, NULL, 2); -- Error
INSERT INTO orders (customer_id, order_info_id)
VALUES (1, 1);
COMMIT;

BEGIN;
INSERT INTO order_info (amount, order_date)
VALUES (2537, now());
INSERT INTO order_details (order_info_id, product_id, quantity)
VALUES (2, 1, 2);
INSERT INTO orders (customer_id, order_info_id)
VALUES (1, 2);
COMMIT;

SELECT oi.*, c.phone, c.login
FROM orders o
    INNER JOIN order_info oi ON oi.id = o.order_info_id
    INNER JOIN customers c ON c.id=o.customer_id;
