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
