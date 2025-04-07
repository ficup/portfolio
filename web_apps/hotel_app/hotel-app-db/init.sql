CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR NOT NULL,
    user_email VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL,
    user_phone VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    hotel_name VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    room_number VARCHAR NOT NULL,
    price_per_day FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    checkin_date DATE NOT NULL,
    checkout_date DATE NOT NULL,
    user_id INT REFERENCES users(id),
    room_id INT REFERENCES rooms(id)
    
);

INSERT INTO users (user_name, user_email, user_password, user_phone)
VALUES ('admin', 'admin@email.net', 'admin_pass', '111111111');

INSERT INTO users (user_name, user_email, user_password, user_phone)
VALUES ('user', 'user@email.net', 'user_pass', '222222222');

INSERT INTO rooms (hotel_name, city, room_number, price_per_day)
VALUES ('Hotel Wygoda', 'Warszawa', '1B', 20.0);

