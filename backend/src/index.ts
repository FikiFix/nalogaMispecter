import express, { Request, Response } from "express";
import pool from "./db";
import dotenv from "dotenv";
import routes from './routes';
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
