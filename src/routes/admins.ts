import { Router } from 'express';
import { verifyToken, isAdmin } from '../middlewares/auth.js';
import * as adminCtrl from '../controllers/admin/admins.js';

const router = Router();

router.get('/', verifyToken, isAdmin, adminCtrl.getAllAdmins);
router.get('/:id', verifyToken, isAdmin, adminCtrl.getAdminById);
router.post('/', verifyToken, isAdmin, adminCtrl.createAdmin);
router.put('/:id', verifyToken, isAdmin, adminCtrl.updateAdmin);
router.delete('/:id', verifyToken, isAdmin, adminCtrl.deleteAdmin);

export default router;
