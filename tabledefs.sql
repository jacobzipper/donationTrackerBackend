CREATE TABLE accounts (
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    salt text NOT NULL,
    locked bool NOT NULL DEFAULT false,
    contact text NULL,
    loginattempts int NOT NULL DEFAULT 0);

CREATE TABLE admins () INHERITS(accounts);
CREATE TABLE users () INHERITS(accounts);
CREATE TABLE users () INHERITS(accounts);
CREATE TABLE managers () INHERITS(accounts);