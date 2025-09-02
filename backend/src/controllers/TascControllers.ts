import { Request, Response } from 'express';
import { createTasc, deleteTasc, getUserTascs } from '../services/TascService';
import Tasc from '../models/TascModel';

interface AuthRequest extends Request {
  user?: { name: string; id: string | number };
}

export const registerTasc = async (req: AuthRequest, res: Response) => {
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

  const tasc = new Tasc(0, title, description, timestamp, userId);

  const createdTasc = await createTasc(tasc);
  if (!createdTasc) {
    return res.status(500).json({ message: 'Failed to create task' });
  }

  return res.status(201).json(createdTasc);
};

export const removeTasc = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  const success = await deleteTasc(id);

  if (!success) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json({ message: 'Task deleted' });
};

export const listUserTascs = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id;

    try {
        const tascs = await getUserTascs(userId);
        return res.status(200).json(tascs);
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


