"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserTascs = exports.removeTasc = exports.registerTasc = void 0;
const TascService_1 = require("../services/TascService");
const TascModel_1 = __importDefault(require("../models/TascModel"));
const registerTasc = async (req, res) => {
    const { title, description } = req.body;
    if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: 'Title is required' });
    }
    if (!description || description.trim().length === 0) {
        return res.status(400).json({ message: 'Description is required' });
    }
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const timestamp = new Date().toISOString();
    const userId = req.user.id;
    const tasc = new TascModel_1.default(0, title, description, timestamp, userId);
    const createdTasc = await (0, TascService_1.createTasc)(tasc);
    if (!createdTasc) {
        return res.status(500).json({ message: 'Failed to create task' });
    }
    return res.status(201).json(createdTasc);
};
exports.registerTasc = registerTasc;
const removeTasc = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid task id' });
    }
    const success = await (0, TascService_1.deleteTasc)(id);
    if (!success) {
        return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted' });
};
exports.removeTasc = removeTasc;
const listUserTascs = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id;
    try {
        const tascs = await (0, TascService_1.getUserTascs)(userId);
        return res.status(200).json(tascs);
    }
    catch (error) {
        console.error('Error fetching user tasks:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.listUserTascs = listUserTascs;
