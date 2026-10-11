-- Optional: Hibernate creates this table automatically (ddl-auto=update).
-- Run this manually only if you prefer to manage the schema yourself.

CREATE DATABASE IF NOT EXISTS notes_db;
USE notes_db;

CREATE TABLE IF NOT EXISTS notes (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(150) NOT NULL,
    content    TEXT         NOT NULL,
    created_at DATETIME(6)  NOT NULL,
    updated_at DATETIME(6)  NOT NULL
);

-- Sample data
INSERT INTO notes (title, content, created_at, updated_at) VALUES
('Welcome to Notes App', 'Create, view, edit and delete your notes here.', NOW(6), NOW(6)),
('Study Plan', 'Revise React hooks, Spring Boot REST APIs and MySQL joins.', NOW(6), NOW(6));
