import { Router } from 'express';
import {loginUser, registerUser} from './controllers/UserControllers'
import { authenticate } from './middleware/auth';
import { listUserTascs, registerTasc, removeTasc } from './controllers/TascControllers';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/tasc', authenticate, registerTasc);
router.delete('/tasc/:id', authenticate, removeTasc);
router.get('/tasc', authenticate, listUserTascs);

export default router;