import express, { Router, Request, Response } from 'express';
import { encodeUrl } from '../../controllers/encode'

const router: Router = express.Router()

router.get("/", encodeUrl)

export default router