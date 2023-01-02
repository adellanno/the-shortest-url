import express, { Router, Request, Response } from 'express';
import { decodeController } from '../../controllers/decode/decode'

const router: Router = express.Router()

router.get("/", decodeController)

export default router