import { Router } from 'express';
import { getAll, newTodo, create, complete } from '../controllers/todos.js'

const router = Router();

router.get('/', getAll);

router.get('/create', newTodo);

router.post('/create', create);

router.post('/complete', complete);

export default router;