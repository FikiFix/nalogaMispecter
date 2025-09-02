"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTascs = exports.deleteTasc = exports.createTasc = void 0;
const db_1 = __importDefault(require("../db"));
const TascModel_1 = __importDefault(require("../models/TascModel"));
const createTasc = async (tasc) => {
    const { id, title, description, timestamp, userId } = tasc;
    try {
        const { rows } = await db_1.default.query(`INSERT INTO tascs (title, description, timestamp, userId)
             VALUES ($1, $2, $3, $4)
             RETURNING id, title, description, timestamp, userId`, [title, description, timestamp, userId]);
        if (rows.length === 0)
            return null;
        return new TascModel_1.default(rows[0].id, rows[0].title, rows[0].description, rows[0].timestamp, rows[0].userId);
    }
    catch (error) {
        console.error('Error creating task:', error);
        return null;
    }
};
exports.createTasc = createTasc;
const deleteTasc = async (id) => {
    try {
        const result = await db_1.default.query('DELETE FROM tascs WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
    catch (error) {
        console.error(`Error deleting task with id ${id}:`, error);
        return false;
    }
};
exports.deleteTasc = deleteTasc;
const getUserTascs = async (userId) => {
    try {
        const { rows } = await db_1.default.query(`SELECT id, title, description, timestamp, userId
             FROM tascs
             WHERE userId = $1
             ORDER BY timestamp DESC`, [userId]);
        return rows.map(row => new TascModel_1.default(row.id, row.title, row.description, row.timestamp, row.userId));
    }
    catch (error) {
        console.error(`Error fetching tasks for user ${userId}:`, error);
        return [];
    }
};
exports.getUserTascs = getUserTascs;
