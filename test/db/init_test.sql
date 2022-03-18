PRAGMA foreign_keys = ON;

CREATE TABLE customer
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName  TEXT NOT NULL
);

CREATE TABLE pawn
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT    NOT NULL,
    loanDate    INT     NOT NULL,
    loanSum     INTEGER NOT NULL,
    expiryDate  INT     NOT NULL,
    loanedBy    INTEGER NOT NULL,
    FOREIGN KEY (loanedBy) REFERENCES customer (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

INSERT INTO customer(id, firstName, lastName)
VALUES (1, 'Slaven', 'Ivanov'),
       (2, 'Slav', 'Ivanovic'),
       (3, 'Slavyan', 'Ivanovyan');

INSERT INTO pawn(description, loanDate, loanSum, expiryDate, loanedBy)
VALUES ('iPhone 3GS', strftime('%s'), 75, strftime('%s'), 2),
       ('Honda Civic 2007', strftime('%s'), 125, strftime('%s'), 1),
       ('Samsung Washing Machine', strftime('%s'), 50, strftime('%s'), 1),
       ('Bob, Golden Retriever, likes treats', strftime('%s'), 200, strftime('%s'), 1);