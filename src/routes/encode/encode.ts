import express, { Router } from 'express';
import { encodeController } from '../../controllers/encode/encode'

const router: Router = express.Router()

router.post("/", encodeController)

export default router;