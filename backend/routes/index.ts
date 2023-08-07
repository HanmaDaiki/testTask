import express from 'express';

import { getQuestions } from '../controllers/questions';
import { analyzeResult } from '../controllers/answer';

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/result', analyzeResult);

export default router;