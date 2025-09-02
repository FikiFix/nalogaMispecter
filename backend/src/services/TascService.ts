import pool from '../db';
import Tasc from '../models/TascModel';

export const createTasc = async (tasc: Tasc): Promise<Tasc | null> => {
    const { id, title, description, timestamp, userId } = tasc;
    try {
        const { rows } = await pool.query(
            `INSERT INTO tascs (title, description, timestamp, userId)
             VALUES ($1, $2, $3, $4)
             RETURNING id, title, description, timestamp, userId`,
            [title, description, timestamp, userId]
        );

        if (rows.length === 0) return null;

        return new Tasc(rows[0].id, rows[0].title, rows[0].description, rows[0].timestamp, rows[0].userId);
    } catch (error) {
        console.error('Error creating task:', error);
        return null;
    }
};

export const deleteTasc = async (id: number): Promise<boolean> => {
    try {
        const result = await pool.query(
            'DELETE FROM tascs WHERE id = $1',
            [id]
        );
        return (result.rowCount ?? 0) > 0;

    } catch (error) {
        console.error(`Error deleting task with id ${id}:`, error);
        return false;
    }
};

export const getUserTascs = async (userId: string | number): Promise<Tasc[]> => {
    try {
        const { rows } = await pool.query(
            `SELECT id, title, description, timestamp, userId
             FROM tascs
             WHERE userId = $1
             ORDER BY timestamp DESC`,
            [userId]
        );

        return rows.map(row => new Tasc(row.id, row.title, row.description, row.timestamp, row.userId));
    } catch (error) {
        console.error(`Error fetching tasks for user ${userId}:`, error);
        return [];
    }
};