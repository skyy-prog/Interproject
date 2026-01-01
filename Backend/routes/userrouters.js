import express from 'express'
import { fetchusersinfo, Login  , useregister} from '../controllers/userhandler.js';
import authMiddleware from '../middlerware.js/Auth.js';
import { getMe } from '../controllers/userhandler.js';
const router = express.Router();
router.post('/login' , Login);
router.post('/register' , useregister);
router.post('/infofuser' , fetchusersinfo);
router.get("/me", authMiddleware, getMe);

export default router;