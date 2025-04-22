DROP TABLE IF EXISTS stock_values;
DROP TABLE IF EXISTS stock_metadata;
DROP TABLE IF EXISTS stock_newsfeed;

CREATE TABLE IF NOT EXISTS stock_metadata (
    stock_name VARCHAR(30),
    last_update DATE,
    is_up_to_date BOOLEAN
);

CREATE TABLE IF NOT EXISTS stock_values (
    date DATE PRIMARY KEY,
    stock_price FLOAT,
    daily_relative_change FLOAT
);

CREATE TABLE IF NOT EXISTS stock_newsfeed (
    title VARCHAR(200) PRIMARY KEY,
    url VARCHAR(200),
    image_url VARCHAR(200),
    description VARCHAR(500)
);