import pool from '../db';
import User from '../models/UserModel';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows.map(row => new User(row.id, row.name, row.passwordhash));
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (rows.length === 0) return null;
    return new User(rows[0].id, rows[0].name, rows[0].passwordhash);
  } catch (error) {
    console.error(`Error fetching user by id (${id}):`, error);
    return null;
  }
};

export const getUserByName = async (name: string): Promise<User | null> => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
    if (rows.length === 0) return null;
    return new User(rows[0].id, rows[0].name, rows[0].passwordhash);
  } catch (error) {
    console.error(`Error fetching user by name (${name}):`, error);
    return null;
  }
};

export const createUser = async (name: string, passwordHash: string): Promise<User | null> => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (name, passwordhash) VALUES ($1, $2) RETURNING id, name, passwordhash',
      [name, passwordHash]
    );
    if (rows.length === 0) return null;
    return new User(rows[0].id, rows[0].name, rows[0].passwordhash);
  } catch (error) {
    console.error(`Error creating user (${name}):`, error);
    return null;
  }
};
