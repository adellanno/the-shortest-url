import express, { Router, Request, Response } from 'express';
import { decodeUrl } from '../../controllers/decode/decode'

const router: Router = express.Router()

router.get("/", decodeUrl)

export default router