import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketsRoutes from "./routes/ticketsRoutes.js";
import jwtAuthRoutes from "./routes/jwtAuthRoutes.js";
import pool from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); 

app.use("/api/tickets", ticketsRoutes);
app.use("/api/auth", jwtAuthRoutes);

pool.connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});