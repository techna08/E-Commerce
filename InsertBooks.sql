-- 1. Book with different ISBN but same author and title
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0321992789', 'Software Architecture in Practice', 'Bass, L.', 'updated edition of the seminal book on software architecture', 'non-fiction', 79.99, 50);

-- 2. Book with different title, author and genre
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0262033848', 'Design Patterns: Elements of Reusable Object-Oriented Software', 'Gamma, E.', 'seminal book on design patterns in object-oriented programming', 'computer science', 45.99, 75);

-- 3. Book with different price and quantity but same ISBN, title and author
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0321815730', 'Software Architecture in Practice', 'Bass, L.', 'seminal book on software architecture', 'non-fiction', 39.99, 150);

-- 4. Book with no description
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0131101630', 'Refactoring: Improving the Design of Existing Code', 'Fowler, M.', NULL, 'computer science', 29.99, 100);

-- 5. Book with zero quantity but same ISBN and title
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0321815737', 'Software Architecture in Practice', 'Bass, L.', 'seminal book on software architecture', 'non-fiction', 59.95, 0);

-- 6. Book with different author, genre and price but same title
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0132350884', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Martin, R. C.', 'guide to writing maintainable and readable code', 'computer science', 39.99, 80);

-- 7. Book with different title, author, description and genre
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-1449365035', 'Learning JavaScript Design Patterns', 'Osmani, A.', 'guide to writing modular and scalable JavaScript code using design patterns', 'computer science', 24.99, 120);

-- 8. Book with different price and quantity but same ISBN and title
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0321815738', 'Software Architecture in Practice', 'Bass, L.', 'seminal book on software architecture', 'non-fiction', 49.99, 200);

-- 9. Book with different ISBN, title, author and genre
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity)
VALUES ('978-0133594140', 'The Practice of System and Network Administration', 'Limoncelli, T. A.', 'guide to managing complex computer systems and networks', 'computer science', 59.99, 60);
