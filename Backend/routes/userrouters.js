import express from 'express'
import { Login  , useregister} from '../controllers/userhandler.js';
const router = express.Router();
router.post('/Login' , Login)
router.post('/register' , useregister)

export default router;