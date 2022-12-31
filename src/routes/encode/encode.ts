import express, { Router, Request, Response } from 'express';
import { encodeUrl } from '../../controllers/encode/encode'

const router: Router = express.Router()

router.post("/", encodeUrl)

export default router;