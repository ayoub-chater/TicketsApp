import express from 'express';
import {
  register,
  login,
  verify,
  user,
} from "../controllers/jwtAuthController.js";
import validInfo from '../middleware/validInfo.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

// Register
router.post("/register", validInfo, register);

// Login
router.post("/login", validInfo, login);

// Verify
router.post("/verify", authorize, verify);

// User Info
router.get("/user", authorize, user);

export default router;
