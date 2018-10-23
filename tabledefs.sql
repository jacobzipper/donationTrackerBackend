CREATE TABLE accounts (
    username text PRIMARY KEY,
    password text NOT NULL,
    salt text NOT NULL,
    locked bool NOT NULL DEFAULT false,
    contact text NULL,
    loginattempts int NOT NULL DEFAULT 0,
    firstname text NULL,
    lastname text NULL);

CREATE TABLE admins () INHERITS(accounts);
CREATE TABLE users () INHERITS(accounts);
CREATE TABLE employees (locationid integer references locations (id) NULL) INHERITS(accounts);
CREATE TABLE managers (locationid integer references locations (id) NULL) INHERITS(accounts);

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
    tstamp timestamp NOT NULL DEFAULT current_timestamp,
    shortdescription text NOT NULL,
    description text NOT NULL,
    value money NOT NULL,
    type donationtype NOT NULL,
    comments text NULL,
    image bytea NULL,
    addedbyadmin text references admins (username) NULL,
    addedbymanager text references managers (username) NULL,
    addedbyemployee text references employees (username) NULL,
    CHECK(addedbyadmin IS NOT NULL OR addedbymanager IS NOT NULL OR addedbyemployee IS NOT NULL));

# Generate a random donation
INSERT INTO donations (locationid, shortdescription, description, value, type, addedbyadmin)
VALUES (floor(random() * 5 + 1)::int, md5(random()::text), md5(random()::text),
floor(random() * 100 + 1)::int, (SELECT mycat FROM unnest(enum_range(NULL::donationtype)) mycat ORDER BY random() LIMIT 1),
(SELECT username FROM admins ORDER BY random() LIMIT 1));