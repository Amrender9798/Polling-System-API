import express from 'express';
import { addVote, deleteOption } from '../controllers/option.controller.js';


const router = express.Router();

// Create an option

// Delete an option
router.delete('/:id/delete', deleteOption);

// Add a vote to an option
router.get('/:id/add_vote', addVote);

export default router;
