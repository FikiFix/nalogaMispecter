import { Request, Response } from 'express';
import {getUserByName, createUser} from '../services/UserService'
import User from '../models/UserModel'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET: string = process.env.JWT_SECRET || "";

export const loginUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    const user: User | null = await getUserByName(name);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
 
    const token = jwt.sign(
        {name: user.name, id: user.id },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  console.log("USER: ", name, password)

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
    const existingUser: User | null = await getUserByName(name);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);


    const user: User | null = await createUser(name, hash);
    if (!user) {
      return res.status(500).json({ message: 'Failed to create user' });
    }


    const token = jwt.sign(
      { name: user.name, id: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ token });

  } catch (error: any) {
    console.error('Register error:', error);

    if (error.code === '23505') {
      return res.status(409).json({ message: 'User already exists' });
    }

    return res.status(500).json({ message: 'Server error' });
  }
};