CREATE TABLE book (
    ISBN VARCHAR(30) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(50),
    price DECIMAL(8,2) NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0321815736', 'Software Architecture in Practice', 'Bass, L.', 'seminal book on software architecture', 'non-fiction', 59.95, 106);
