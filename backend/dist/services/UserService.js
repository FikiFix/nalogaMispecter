"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByName = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../db"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const getAllUsers = async () => {
    try {
        const { rows } = await db_1.default.query('SELECT * FROM users');
        return rows.map(row => new UserModel_1.default(row.id, row.name, row.passwordhash));
    }
    catch (error) {
        console.error('Error fetching all users:', error);
        return [];
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    try {
        const { rows } = await db_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
        if (rows.length === 0)
            return null;
        return new UserModel_1.default(rows[0].id, rows[0].name, rows[0].passwordhash);
    }
    catch (error) {
        console.error(`Error fetching user by id (${id}):`, error);
        return null;
    }
};
exports.getUserById = getUserById;
const getUserByName = async (name) => {
    try {
        const { rows } = await db_1.default.query('SELECT * FROM users WHERE name = $1', [name]);
        if (rows.length === 0)
            return null;
        return new UserModel_1.default(rows[0].id, rows[0].name, rows[0].passwordhash);
    }
    catch (error) {
        console.error(`Error fetching user by name (${name}):`, error);
        return null;
    }
};
exports.getUserByName = getUserByName;
const createUser = async (name, passwordHash) => {
    try {
        const { rows } = await db_1.default.query('INSERT INTO users (name, passwordhash) VALUES ($1, $2) RETURNING id, name, passwordhash', [name, passwordHash]);
        if (rows.length === 0)
            return null;
        return new UserModel_1.default(rows[0].id, rows[0].name, rows[0].passwordhash);
    }
    catch (error) {
        console.error(`Error creating user (${name}):`, error);
        return null;
    }
};
exports.createUser = createUser;
