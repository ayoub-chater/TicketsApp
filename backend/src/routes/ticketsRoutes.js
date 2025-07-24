import express from "express";
import {
  createTicket,
  deleteTicket,
  getAllTicketsByUser,
  getTicketById,
  updateTicket,
} from "../controllers/ticketsController.js";
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get("/", authorize, getAllTicketsByUser);
router.get("/:id", authorize, getTicketById);
router.post("/", authorize, createTicket);
router.put("/:id", authorize, updateTicket);
router.delete("/:id", authorize, deleteTicket);

export default router;
