import express from 'express'
import { Login  , useregister} from '../controllers/userhandler.js';
const router = express.Router();
router.post('/login' , Login)
router.post('/register' , useregister)

export default router;