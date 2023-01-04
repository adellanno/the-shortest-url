import express, { Router } from "express";
import { decodeController } from "../../controllers/decode/decode";
import { rateLimiter } from "../../middleware/rateLimiter";

const router: Router = express.Router();

router.get("/", rateLimiter, decodeController);

export default router;
