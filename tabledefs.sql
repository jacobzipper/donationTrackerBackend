CREATE TABLE accounts (
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    salt text NOT NULL,
    locked bool NOT NULL DEFAULT false,
    contact text NULL,
    loginattempts int NOT NULL DEFAULT 0,
    firstname text NULL,
    lastname text NULL);

CREATE TABLE admins () INHERITS(accounts);
CREATE TABLE users () INHERITS(accounts);
CREATE TABLE employees () INHERITS(accounts);
CREATE TABLE managers () INHERITS(accounts);

CREATE TYPE locationtype AS ENUM ('Drop Off', 'Store', 'Warehouse');

CREATE TABLE locations (
    name text NOT NULL,
    type locationtype NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    address text NOT NULL,
    phone text NOT NULL);