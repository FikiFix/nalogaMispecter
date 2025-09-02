CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE,
    passwordHash VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS tascs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(250),
    timestamp VARCHAR(50),
    userId INT,
    CONSTRAINT fk_user
        FOREIGN KEY(userId) 
        REFERENCES users(id)
        ON DELETE CASCADE
);