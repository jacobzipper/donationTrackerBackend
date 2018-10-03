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
    id serial primary key,
    name text NOT NULL,
    type locationtype NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    address text NOT NULL,
    phone text NOT NULL);

CREATE TYPE donationtype as ENUM ('Clothing', 'Hat', 'Kitchen', 'Electronics', 'Household', 'Other');

CREATE TABLE donations (
    id serial primary key,
    locationid integer references locations (id) NOT NULL,
    tstamp timestamp NOT NULL,
    shortdescription text NOT NULL,
    description text NOT NULL,
    value money NOT NULL,
    type donationtype NOT NULL,
    comments text NULL,
    image bytea NULL);