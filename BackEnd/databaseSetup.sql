CREATE database final_project;
create extension if not exists "uuid-ossp";
CREATE TABLE users(
   user_id uuid PRIMARY KEY DEFAULT
   uuid_generate_v4(),
   user_name TEXT NOT NULL,
   user_email TEXT NOT NULL,
   user_password TEXT NOT NULL,
   is_admin BOOLEAN DEFAULT FALSE
);
CREATE TABLE items(
   item_id SERIAL PRIMARY KEY,
   item_name TEXT NOT NULL,
   item_price NUMERIC NOT NULL CHECK (item_price > 0),
   item_quantity INTEGER NOT NULL,
   item_original_quantity INTEGER NOT NULL,
   item_description TEXT,
   item_image TEXT,
   CHECK (item_original_quantity >= item_quantity)
);
CREATE TABLE cart(
   cart_id uuid PRIMARY KEY DEFAULT
   uuid_generate_v4(),
   item_id INTEGER REFERENCES items(item_id),
   cart_quantity INTEGER,
   user_id uuid REFERENCES users(user_id)
);