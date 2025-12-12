import { Router } from "express";
import * as authCtrl from '../controllers/auth/auth.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const router = Router();

router.post("/register", authCtrl.Register);
router.post("/login", authCtrl.Login);
router.post("/adminLogin", authCtrl.adminLogin);

export default router;