"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const UserService_1 = require("../services/UserService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "";
const loginUser = async (req, res) => {
    const { name, password } = req.body;
    const user = await (0, UserService_1.getUserByName)(name);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jsonwebtoken_1.default.sign({ name: user.name, id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
};
exports.loginUser = loginUser;
const registerUser = async (req, res) => {
    const { name, password } = req.body;
    console.log("USER: ", name, password);
    if (typeof name !== 'string' || name.trim().length < 3 || name.trim().length > 50) {
        return res.status(400).json({ message: 'Invalid username length (3-50 chars)' });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
        return res.status(400).json({ message: 'Username can only contain letters, numbers, and underscores' });
    }
    if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    try {
        const existingUser = await (0, UserService_1.getUserByName)(name);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hash = await bcrypt_1.default.hash(password, 10);
        const user = await (0, UserService_1.createUser)(name, hash);
        if (!user) {
            return res.status(500).json({ message: 'Failed to create user' });
        }
        const token = jsonwebtoken_1.default.sign({ name: user.name, id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ token });
    }
    catch (error) {
        console.error('Register error:', error);
        if (error.code === '23505') {
            return res.status(409).json({ message: 'User already exists' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.registerUser = registerUser;
