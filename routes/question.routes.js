import express from 'express';
import { createQuestion, deleteQuestion, viewQuestion } from '../controllers/question.controller.js';
import { createOption } from '../controllers/option.controller.js';


const router = express.Router();

// Create a question
router.post('/create', createQuestion);

//Add option to a specific question
router.post('/:id/options/create',createOption);

// Delete a question
router.delete('/:id/delete', deleteQuestion);

// View a question with options
router.get('/:id', viewQuestion);

export default router;
