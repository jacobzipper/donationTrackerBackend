CREATE TABLE accounts (username text, password text, salt text, locked bool, contact text);

CREATE TABLE admins () INHERITS(accounts);
CREATE TABLE users () INHERITS(accounts);
CREATE TABLE users () INHERITS(accounts);
CREATE TABLE managers () INHERITS(accounts);