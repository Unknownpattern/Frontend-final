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
   item_price NUMERIC NOT NULL,
   item_quantity INTEGER NOT NULL,
   item_original_quantity INTEGER NOT NULL,
   item_description TEXT,
   item_image TEXT
);
