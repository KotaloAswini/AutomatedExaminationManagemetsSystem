CREATE DATABASE seating_db;
USE seating_db;

-- Student Table
CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usn VARCHAR(20) UNIQUE
);

-- Room Table
CREATE TABLE room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

-- Seating Table
CREATE TABLE seating (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usn VARCHAR(20),
    room_name VARCHAR(50),
    row_no INT,
    col_no INT,
    exam VARCHAR(50),
    FOREIGN KEY (usn) REFERENCES student(usn)
);

-- Indexes
CREATE INDEX idx_usn_exam ON seating(usn, exam);
CREATE INDEX idx_room_exam ON seating(room_name, exam);

-- Insert Students (3 batches)
INSERT INTO student (usn)
WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n <= 50
)
SELECT CONCAT('1NT23CS', LPAD(n, 3, '0')) FROM nums;

INSERT INTO student (usn)
WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n <= 50
)
SELECT CONCAT('1NT24CS', LPAD(n, 3, '0')) FROM nums;

INSERT INTO student (usn)
WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n <= 50
)
SELECT CONCAT('1NT25CS', LPAD(n, 3, '0')) FROM nums;

-- Seating Allocation (Mixed)
INSERT INTO seating (usn, room_name, row_no, col_no, exam)
SELECT 
    usn,
    CONCAT('Class ', CEIL(row_num / 48)),
    FLOOR((row_num - 1) % 48 / 6) + 1,
    ((row_num - 1) % 6) + 1,
    'MSE1'
FROM (
    WITH 
    s23 AS (SELECT usn, ROW_NUMBER() OVER (ORDER BY usn) rn FROM student WHERE usn LIKE '1NT23%'),
    s24 AS (SELECT usn, ROW_NUMBER() OVER (ORDER BY usn) rn FROM student WHERE usn LIKE '1NT24%'),
    s25 AS (SELECT usn, ROW_NUMBER() OVER (ORDER BY usn) rn FROM student WHERE usn LIKE '1NT25%'),
    mixed AS (
        SELECT s23.usn, s23.rn*3-2 AS new_order FROM s23
        UNION ALL
        SELECT s24.usn, s24.rn*3-1 FROM s24
        UNION ALL
        SELECT s25.usn, s25.rn*3 FROM s25
    )
    SELECT usn, ROW_NUMBER() OVER (ORDER BY new_order) AS row_num
    FROM mixed
) t
WHERE row_num <= 150;